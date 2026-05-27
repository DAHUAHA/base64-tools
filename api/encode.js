/**
 * Base64 encode endpoint
 * POST /api/encode
 * Body: { text: "string to encode" }
 * Returns: { result: "<base64>", inputLength: N, outputLength: N }
 */
const { rateLimit, gc } = require('./_rateLimit');

module.exports = function handler(req, res) {
  // ── 速率限制 ──
  gc();
  if (!rateLimit(req, res)) return;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const { text } = req.body || {};

  // Input validation
  if (!text) {
    res.status(400).json({ error: 'Missing required field: text' });
    return;
  }

  if (typeof text !== 'string') {
    res.status(400).json({ error: 'text must be a string' });
    return;
  }

  if (text.length > 1_000_000) {
    res.status(400).json({ error: 'text too long (max 1,000,000 characters)' });
    return;
  }

  const result = Buffer.from(text, 'utf-8').toString('base64');

  res.status(200).json({
    result,
    inputLength: text.length,
    outputLength: result.length
  });
};
