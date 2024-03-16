import { DataService } from "./data.service.js";
import { createPath } from "../utils.js";
import { Trainer } from "./trainer.model.js";

const TRAINER_PATH = createPath(["data", "trainers.json"]);

const saveTrainers = async trainers => {
    await DataService.saveJSONFile(TRAINER_PATH, trainers);
};

// Get All Trainers
export const getAllTrainers = async () => {
    const trainers = await DataService.readJSONFile(TRAINER_PATH);

    return trainers
};

// Get Trainers By ID
export const getTrainerById = async trainerId => {
    const trainers = await getAllTrainers();

    const foundTrainer = trainers.find(trainer => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Trainer not found!");

    return foundTrainer;
};

// Update Trainer
export const updateTrainer = async (trainerId, updateData) => {
    const trainers = await getAllTrainers();

    if (!trainers.some(trainer => trainer.id === trainerId))
       throw new Error("Can't update trainer! Trainer not found!");

    const updatedTrainer = trainers.map(trainer => {
        if (trainer.id === trainerId) {
            return { ...trainer, ...updateData };
        } else {
            return trainer;
        }
    });

    await saveTrainers(updatedTrainer);
};

// Add Trainer
export const addTrainer = async (firstName, lastName, email, isCurrentlyTeaching, timeEmplyed, coursesFinished) => {
    const trainers = await getAllTrainers();

    const newTrainer = new Trainer(firstName, lastName, email, isCurrentlyTeaching, timeEmplyed, coursesFinished);

    const updatedTrainer = [...trainers, newTrainer];

    await saveTrainers(updatedTrainer);

    return newTrainer;
};

// Delete Trainer
export const deleteTrainer = async trainerId => {
    const trainers = await getAllTrainers();

    const updatedTrainer = trainers.filter(trainer => trainer.id !== trainerId);

    if (updatedTrainer.length === trainers.length)
       throw new Error("Can't delete trainer! Trainer not found!");

    await saveTrainers(updatedTrainer);
}

// Delete All Trainers
export const deleteAllTrainers = async () => {
    await saveTrainers([]);
};