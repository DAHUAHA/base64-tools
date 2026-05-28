/**
 * Conversion logs endpoint
 * POST /api/logs          — 新增一条转换记录
 * Body: { input_text, result, mode: "encode"|"decode" }
 *
 * 数据存储在 Upstash Redis 中。读取需在 Upstash 控制台操作，API 不暴露查询接口。
 */

const { rateLimit, gc } = require('./_rateLimit');
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const LOG_KEY = 'conversion_logs';
const MAX_LOGS = 100;  // 最多存 100 条，超出后自动裁剪旧记录

/** 通用：CORS 头 */
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/** 调用 Upstash REST API */
async function redisCommand(args) {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    throw new Error(`Redis error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/** 生成日志 ID */
function generateId() {
  return `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** 从请求中获取客户端 IP（前 3 段） */
function getShortIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  // 只保留前 3 段，保护隐私
  const parts = ip.split('.');
  if (parts.length === 4) {
    return parts.slice(0, 3).join('.') + '.xxx';
  }
  return ip;
}

/** 统一响应 */
function json(res, statusCode, data) {
  res.status(statusCode).json(data);
}

// ─── POST /api/logs ────────────────────────────────────────────
async function handlePost(req, res) {
  try {
    const { input_text, result, mode } = req.body || {};

    if (!input_text || typeof input_text !== 'string') {
      json(res, 400, { error: 'Missing or invalid field: input_text' });
      return;
    }
    if (!result || typeof result !== 'string') {
      json(res, 400, { error: 'Missing or invalid field: result' });
      return;
    }
    if (!['encode', 'decode'].includes(mode)) {
      json(res, 400, { error: 'mode must be "encode" or "decode"' });
      return;
    }

    const log = {
      id: generateId(),
      input_text: input_text.slice(0, 50),
      result: result.slice(0, 50),
      mode,
      ip: getShortIp(req),
      created_at: new Date().toISOString(),
    };

    // ZADD logs <timestamp_ms> <json_string>
    const score = Date.now();
    await redisCommand(['ZADD', LOG_KEY, score, JSON.stringify(log)]);
    // 裁剪旧记录，只保留最新的 MAX_LOGS 条
    await redisCommand(['ZREMRANGEBYRANK', LOG_KEY, 0, -(MAX_LOGS + 1)]);

    json(res, 201, {
      success: true,
      log,
    });
  } catch (err) {
    console.error('POST /api/logs error:', err);
    json(res, 500, { error: 'Failed to save log', details: err.message });
  }
}

// ─── Handler ───────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ── 速率限制 ──
  gc();
  if (!rateLimit(req, res)) return;

  if (req.method === 'POST') {
    await handlePost(req, res);
  } else {
    json(res, 405, { error: 'Method not allowed. Use POST.' });
  }
};