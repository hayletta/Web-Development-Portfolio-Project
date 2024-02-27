import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise.
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
        res.status(201).json(exercise)
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request failted' });
    })
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById({_id: exerciseId})
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found'})
            }
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({ Error: 'Request failed'})
    })
});

/**
 * Retrieve exercises. 
 */
app.get('/exercises', (req, res) => {
    let filter = {}
    if(req.query._id !== undefined) {
        filter._id = req.query._id
    }
    if(req.query.name !== undefined) {
        filter.name = req.query.name;
    }
    if (req.query.age !== undefined) {
        filter.age = req.query.age;
    }
    if(req.query.email !== undefined) {
        filter.email = req.query.email;
    }
    if(req.query.phoneNumber !== undefined) {
        filter.phoneNumber = req.query.phoneNumber
    }
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.json(exercises)
        })
        .catch(error => {
            console.error
            res.status(400).json({ Error: 'Request failed'})
        })

    })

app.put('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.updateExercise(exerciseId, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({_id: exerciseId, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(404).json({ Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.error
            res.status(400).json({ Error: 'Request failed'})
        })

});


app.delete('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.deleteExercise({_id: exerciseId})
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error
            res.status(400).json({ Error: 'Request failed'})
        })
});

app.listen(PORT, () => {
    console.log("Now listening on PORT 3000")
})