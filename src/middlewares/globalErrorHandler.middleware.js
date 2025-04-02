const globalErrorHandler = (err, req, res, next) => {
       err.statusCode = err.statusCode || 500;
       err.message = err.message || "Internal Server Error";

       res.status(statusCode).json({
              success: false,
              message: err.message,
              errorStack: config.nodeEnv == "development" ?  err.stack:"" 
       })
}

export default globalErrorHandler;