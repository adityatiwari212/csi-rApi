const mongoose = require('mongoose');


const ResourceType = {
  BLOG: 'blog',
  VIDEO: 'video',
};
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v); 
      },
      message: props => `${props.value} is not a valid URL!`,
    },
  },
  type: {
    type: String,
    enum: [ResourceType.BLOG, ResourceType.VIDEO],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'], 
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});


const Resources = mongoose.model('Resource', resourceSchema);


module.exports = Resources;
