import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import{ useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();


  return (
    <div className="App">
      <Router>
        <header>
          <h1>Workout With Me</h1>
          <p>Come on and workout with this app that tracks all of your moves</p>
        </header>
        <Navigation />
        <div className="App-header">
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/add-exercise" element={<AddExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />} />
		  </Routes>
          </div>
          <footer>
            &copy; {new Date().getFullYear()} Andrew Haylett
          </footer>
      </Router>
    </div>
  );
}

export default App;