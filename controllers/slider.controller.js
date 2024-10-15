const Slider = require("../models/slider.model");
const { errorHandler } = require("../utils/error");

// Get All Sliders
const getAllSliders = async (req, res, next) => {
  try {
    const sliders = await Slider.find().populate("property");
    res.status(200).json(sliders);
  } catch (error) {
    next(error);
  }
};

// Create a Slider
const createSlider = async (req, res, next) => {
  const { property, isActive } = req.body;

  try {
    const newSlider = new Slider({ property, isActive });
    await newSlider.save();
    res.status(201).json("Slider Created Successfully!");
  } catch (error) {
    next(error);
  }
};

// Update a Slider (Toggle isActive)
const updateSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);

    if (!slider) {
      return next(errorHandler(404, "Slider not found!"));
    }

    // Toggle the isActive field
    slider.isActive = !slider.isActive;
    await slider.save();

    res.status(200).json("Slider updated successfully.");
  } catch (error) {
    next(error);
  }
};

// Delete a Slider
const deleteSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByIdAndDelete(id);

    if (!slider) {
      return next(errorHandler(404, "Slider not found!"));
    }

    res.status(200).json("Slider has been deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSliders,
  createSlider,
  updateSlider,
  deleteSlider,
};