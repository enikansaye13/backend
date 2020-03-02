var cloudinary = require('cloudinary').v2;
// var crypto = require('crypto');
// var multipart = require('connect-multiparty');
var schema = require('../config/schema');

var Photo = schema.models.Photo;

// var multipartMiddleware = multipart();

function index(req, res) {
  Photo.all().then(function (photos) {
    res.render('photos/index', { photos: photos });
  });


var photo = new Photo(req.body);
  // Get temp file path
  var imageFile = req.files.image.path;
  // Upload file to Cloudinary
  cloudinary.uploader.upload(imageFile, { tags: 'express_sample' })
    .then(function (image) {
      console.log('** file uploaded to Cloudinary service');
      console.dir(image);
      photo.image = image;
      // Save photo with image metadata
      return photo.save();
    })
    .then(function () {
      console.log('** photo saved');
    })
    .finally(function () {
      res.render('photos/create_through_server', { photo: photo, upload: photo.image });
    });

}

router.get('/', index);
router.get('/photos', index);

module.exports = router;