/**
 * 速率限制中间件
 * 基于滑动窗口：同一 IP 每 60 秒最多 30 次 API 请求
 *
 * 使用内存 Map（适用于单实例 Vercel Serverless — 每次函数调用可能换实例，
 * 故限制为「单次调用内」计数，作为轻量防护；完整分布式限流需 Upstash Rate Limit）
 */

// 窗口大小（秒）
const WINDOW_SEC = 60;
// 单窗口最大请求数
const MAX_REQUESTS = 30;

// 存储格式: Map<ip, { count, resetAt }>
const rateLimitMap = new Map();

/**
 * 获取客户端 IP
 */
function getIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

/**
 * 速率限制检查
 * @returns { object } { allowed: bool, remaining: number, resetIn: number }
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // 新窗口
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_SEC * 1000 });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_SEC };
  }

  if (entry.count >= MAX_REQUESTS) {
    const resetIn = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  entry.count++;
  const resetIn = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, resetIn };
}

/**
 * 应用速率限制到 API handler
 * 在 handler 开头调用，失败时直接返回 429
 */
function rateLimit(req, res) {
  const ip = getIp(req);
  const { allowed, remaining, resetIn } = checkRateLimit(ip);

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset', resetIn);

  if (!allowed) {
    res.status(429).json({
      error: 'Too many requests. Please wait a moment.',
      retryAfter: resetIn,
    });
    return false;
  }
  return true;
}

/** 清理过期条目（每 100 次调用做一次轻量 GC）*/
let callCount = 0;
function gc() {
  callCount++;
  if (callCount % 100 !== 0) return;
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

module.exports = { rateLimit, gc };