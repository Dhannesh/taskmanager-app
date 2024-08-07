import asyncWrapper from "../middleware/asyncWrapper.js";
import Task from "../models/Task.js";


import { StatusCodes } from "http-status-codes";

export const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find();
    res.status(StatusCodes.OK).json({ len: tasks.length, tasks });
}
)

export const createTask = asyncWrapper(  async (req, res) => {
  
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
  }
)

export const getTask = asyncWrapper ( async (req, res) => {
  
    const { id } = req.params;
    const task = await Task.findById(id);
    // const task = await Task.find({ _id: id });
    // const task = await Task.findOne({ _id: id });
    if (task) return res.status(200).json({ task });
    return res.status(404).json({ msg: `task not found with id : ${id}` });
  
    
  }
)


export const updateTask = asyncWrapper (async (req, res) => {
  
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (task) return res.status(200).json({ task });
    res.status(404).json({ msg: `task not found with id : ${id}` });
  
   
  }
)


export const editTask = asyncWrapper ( async (req, res) => {
  
    const { id } = req.params;
    const task = await Task.findOneAndReplace({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (task) return res.status(200).json({ task });
    res.status(404).json({ msg: `task not found with id : ${id}` });
  
   
  }
)

export const deleteTask = asyncWrapper( async (req, res) => {
  
    const { id } = req.params;
    // const task = await Task.findOneAndDelete({ _id: id });
    const task = await Task.findByIdAndDelete(id);
    if (task) return res.status(200).json({ msg: "task deleted", task });
    return res.status(404).json({ msg: `task not found with id : ${id}` });
  
   
  }
)


