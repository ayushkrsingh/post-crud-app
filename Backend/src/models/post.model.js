const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    image: String,
    caption: String,
  },
  { timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);


module.exports = postModel;

// post{
//      image: "path/to/image.jpg",
//      caption: "This is a sample caption"
// }