import Task from "../models/Task.js";
import { StatusCodes } from "http-status-codes";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(StatusCodes.OK).json({ len: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const task = await Task.findById(id);
    const task = await Task.find({ _id: id });
    if (task) return res.status(200).json({ task });
    return res.status(404).json({ msg: `task not found with id : ${id}` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (task) return res.status(200).json({ task });
    res.status(404).json({ msg: `task not found with id : ${id}` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const task = await Task.findOneAndDelete({ _id: id });
    const task = await Task.findByIdAndDelete(id);
    if (task) return res.status(200).json({ msg: "task deleted", task });
    return res.status(404).json({ msg: `task not found with id : ${id}` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
