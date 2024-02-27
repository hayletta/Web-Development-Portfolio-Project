import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});


const Exercise = mongoose.model("Exercise", exerciseSchema);


const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save();
};

const findExercise = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
    .select(projection)
    .limit(limit)
    return query.exec();
};


const findExerciseById  = async(filter) => {
    const query = Exercise.find(filter)
    return query.exec()
};


const updateExercise = async(id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({_id: id}, {name: name, reps: reps, weight: weight, unit: unit, date:date});
    return result.modifiedCount
};

const deleteExercise = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount
}


export {createExercise, findExercise, findExerciseById,updateExercise, deleteExercise}
