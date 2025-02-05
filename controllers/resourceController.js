const Resource = require('../models/Resources');

const createResource = async (req, res) => {
  try {
    const { title, link, type, difficulty, subject, rating } = req.body;
    const newResource = new Resource({
      title,
      link,
      type,
      difficulty,
      subject,
      rating
    });

    const savedResource = await newResource.save();
    res.status(201).json({ message: 'Resource created successfully', resource: savedResource });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ message: 'Error creating resource', error: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;

    const deletedResource = await Resource.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource deleted successfully', resource: deletedResource });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ message: 'Error deleting resource', error: error.message });
  }
};

const updateResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const updates = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(resourceId, updates, { new: true });

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource updated successfully', resource: updatedResource });
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
};
const updateAvgRating = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const newRating = req.body.rating;

    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const avgRating = ((resource.rating + newRating) / 2).toFixed(1);

    resource.rating = avgRating;

    await resource.save();

    res.status(200).json({ message: 'Resource rating updated', resource });
  } catch (error) {
    res.status(500).json({ message: 'Error updating rating', error: error.message });
  }
};
const getResourceByCriteria = async (req, res) => {
    try {
      const { title, type, subject } = req.body;
      const query = {};
      if (title) query.title = { $regex: title, $options: 'i' };
      if (type) query.type = type;
      if (subject) query.subject = subject;
  
      const resources = await Resource.find(query);
      res.status(200).json({ message: 'Resources fetched successfully', resources });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resources', error: error.message });
    }
  };
  

module.exports = {
  createResource,
  deleteResource,
  updateResource,updateAvgRating,getResourceByCriteria
};
