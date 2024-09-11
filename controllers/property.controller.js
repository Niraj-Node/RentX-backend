const Property = require("../models/property.model.js");
const { errorHandler } = require("../utils/error.js");

// Test Route
const test = (req, res) => {
  res.json({
    message: "Hello, this is from Property router",
  });
};

// Create Property
const createProperty = async (req, res, next) => {
  const {
    title,
    description,
    category,
    price,
    facilities,
    images,
    address,
    city,
    state,
    country,
  } = req.body;
  const userRef = req.user.id;

  try {
    const newProperty = new Property({
      title,
      description,
      category,
      price,
      facilities,
      images,
      address,
      city,
      state,
      country,
      userRef,
    });
    await newProperty.save();
    res.status(201).json("Property Created Successfully!");
  } catch (error) {
    next(error);
  }
};

// Get Property by ID
const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("category")
      .populate("facilities");
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

// Get All Properties
const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .populate("category")
      .populate("facilities");
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Update Property
const updateProperty = async (req, res, next) => {
  // Ensure the user is updating their own property
  const property = await Property.findById(req.params.id);
  if (!property) return next(errorHandler(404, "Property not found!"));
  if (req.user.id !== property.userRef.toString()) {
    return next(errorHandler(401, "You can only update your own property!"));
  }

  try {
    // Filter out only the fields that are present in req.body
    const updates = {};
    const allowedFields = [
      "title",
      "description",
      "category",
      "price",
      "facilities",
      "images",
      "address",
      "city",
      "state",
      "country",
    ];

    // Dynamically add only the fields that exist in req.body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    )
      .populate("category")
      .populate("facilities");

    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
};

// Delete Property
const deleteProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  if (!property) return next(errorHandler(404, "Property not found!"));
  if (req.user.id !== property.userRef.toString() && !req.user.isAdmin) {
    return next(errorHandler(401, "You can only delete your own property!"));
  }

  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  createProperty,
  getProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
};
