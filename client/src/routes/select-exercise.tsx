import { useEffect, useState } from "react";
import axios from "axios";


export default function SelectExercise() {

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // fetch exercises
    (
      async () => {
        const response = await axios.get('http://localhost:5000/exercises');

        console.log('res', response.data);
        setExercises(response.data);
      }
    )();

  });


  return (
    <>
      <h1>Select Exercise</h1>
      <p>Choose an exercise to add to your workout.</p>
    </>
  );
}