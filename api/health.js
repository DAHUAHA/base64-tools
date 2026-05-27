/**
 * Health check endpoint
 * GET /api/health
 * Returns: { status: "ok", timestamp, version, siteName }
 */
module.exports = function handler(req, res) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0",
    siteName: process.env.SITE_NAME || "Base64 Tools"
  });
};
