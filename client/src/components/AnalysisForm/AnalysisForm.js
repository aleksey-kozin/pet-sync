import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function AnalysisForm() {
  const petState = useSelector((state) => state.petsReducer.pet);
  const { id } = useParams();
  console.log(petState);
  console.log(id);

  const pet = petState.find((el) => el._id === id);
  const click = (ev) => {
    console.log(ev.target);
  }
  return (
    <div className='container'>
      <input type="radio" onClick={click} name="radio" id="flexRadioDefault1" />
      <label for="flexRadioDefault1">Биохимическое исследование крови</label>
      <input type="radio" name="radio" id="flexRadioDefault2" />
      <label for="flexRadioDefault2">
        Клиническое и биохимическое исследование мочи
      </label>
      <input type="radio" name="radio" id="flexRadioDefault3" />
      <label for="flexRadioDefault3">Гормональные исследования</label>
    </div>
  );
}

export default AnalysisForm;
