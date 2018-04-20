const cloudinary = require('cloudinary');

const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(config);

exports.createCloudStream = (cb) => {
    return stream = cloudinary
        .uploader
        .upload_stream(cb);
}
