const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype.startsWith('image')) cb(null,true);
        else cb(new Error('Images only!'),false);
    }
});


moduel.exports = upload;