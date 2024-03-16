import { Router } from "express";
import {
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    addTrainer,
    deleteTrainer,
    deleteAllTrainers,
} from "./trainer.js"

export const trainerRouter = Router()

// Get All Tasks
trainerRouter.get("/", async (req, res) => {
    try {
      const filters = req.query;
      const trainers = await getAllTrainers();

      console.log(filters);
  
      return res.json(trainers);
    } catch (error) {
      //.status sets the status code of the response
      return res.status(500).json({ msg: error.message });
    }
});

// Get Tasks By ID
// Dynamic path parameters are marked with ":" in the url
trainerRouter.get("/:id", async (req, res) => {
    try {
      //req.params contains all dynamic path parameters
      const trainerId = req.params.id;
  
      const foundTrainer = await getTrainerById(trainerId);
  
      return res.json(foundTrainer);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
});

// Update Trainer
trainerRouter.patch("/:id", async (req, res) => {
    try {
      const trainerId = req.params.id;
      const updateData = req.body;
  
      if (updateData.id) throw new Error("Invalid Data");
  
      await updateTrainer(trainerId, updateData);
  
      return res.sendStatus(204);
    } catch (error) {
      //400 is bad request
      return res.status(400).json({ msg: error.message });
    }
  });

// Add Trainer
trainerRouter.post("/", async (req, res) => {
    try {
      const requiredFields = [ firstName, lastName, email, isCurrentlyTeaching, timeEmplyed, coursesFinished ];
  
      const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field] === "");
      if (missingFields.length) {
         throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
  
      const newTrainer = await addTrainer(firstName, lastName, email, isCurrentlyTeaching, timeEmplyed, coursesFinished);
  
      //201 is status that means something new was created in the backend
      return res.status(201).json(newTrainer);
    } catch (error) {
      console.log(error);
      //400 is bad request
      return res.status(400).json({ msg: error.message });
    }
});

//5. Delete Trainer
trainerRouter.delete("/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    await deleteTrainer(trainerId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

// Delete All Trainers 
trainerRouter.delete("/", async (req, res) => {
  try {
    await deleteAllTrainers();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});