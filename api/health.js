/**
 * Health check endpoint
 * GET /api/health
 * Returns: { status: "ok", timestamp: "<ISO datetime>", version: "1.0" }
 */
module.exports = function handler(req, res) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0"
  });
};
