const cloudinary = require('cloudinary');

const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(config);

exports.saveImage = (file) => {
    cloudinary
        .uploader
        .upload(file, function(error, result) {
            console.log(result);
        })
}

exports.createUrl = (public_id) => {
    return cloudinary
        .url(public_id);
}
