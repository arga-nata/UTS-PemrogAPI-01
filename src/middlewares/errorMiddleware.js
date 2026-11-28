const { AppError } = require("../controllers/produkController");

function errorMiddleware(err, req, res, next) {
  let statusCode = 500;
  let status = "error";
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }
  
   if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      message: "JSON tidak valid",
    });
  }

  res.status(statusCode).json({
    status,
    message,
  });
}

module.exports = errorMiddleware;