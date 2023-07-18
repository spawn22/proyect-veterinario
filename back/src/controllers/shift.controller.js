import Shift from "../models/shifts.model.js";

export const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({
      user: req.user.id,
    });
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postShifts = async (req, res) => {
  const { description, date, start_time, end_time } = req.body;
  const newShift = new Shift({
    description,
    date,
    start_time,
    end_time,
    user: req.user.id,
  });
  try {
    await newShift.save();
    res.status(200).json(newShift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editShifts = async (req, res) => {
  try {
    const editShift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!editShift) return res.status(404).json({ message: "Shift not found" });
    res.status(200).json(editShift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShifts = async (req, res) => {
  try {
    const deleteShift = await Shift.findByIdAndDelete(req.params.id);
    if (!deleteShift)
      return res.status(404).json({ message: "Shift not found" });
    res.status(200).json({
      message: "Shift deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
