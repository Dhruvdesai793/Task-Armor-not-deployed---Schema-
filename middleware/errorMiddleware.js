module.exports = (er, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    //Give different details for development vs production
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
    
}