const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../../../../config/config.js');

const storage = multer.diskStorage({
    destination: `./${config.appPath.appUploadImage}/`,
    filename: function (req, file, cb) {
        // Mimetype stores the file type, set extensions according to filetype
        // let ext;
        // switch (file.mimetype) {
        //     case 'image/jpg':
        //         ext = '.jpeg';
        //         break;
        //     case 'image/jpg':
        //         ext = '.jpg';
        //         break;
        //     case 'image/png':
        //         ext = '.png';
        //         break;
        //     case 'image/gif':
        //         ext = '.gif';
        //         break;
        // }

        if (req.body.newFilename) {
            cb(null, req.body.newFilename + req.body.ext);
        } else {
            cb(null, file.originalname);

        }
        // cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
    }
});
const upload = multer({storage: storage});

router.post('/upload', upload.single('file'), function (req, res, next) {
    if (req.file && req.file.originalname) {
        if (req.body.newFilename) {
            console.log(`Received file ${req.body.newFilename + req.body.ext}`);
        } else {
            console.log(`Received file ${req.file.originalname}`);
        }
    }

    res.send({responseText: req.file.path}); // You can send any response to the user here
});

module.exports = router;
