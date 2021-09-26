import "./index.css";
import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAnimals } from "../store/animals/selectors";
import { getAnimalAsync, STATE_ERROR, STATE_OK, STATE_LOADING } from "../store/animals/actions";

function Animal(props) {

  const index = props.index;
  const dispatch = useDispatch();

  const animals = useSelector(getAnimals, shallowEqual);
  let animal = animals[index];

  if (animal.state !== STATE_ERROR &&
    animal.state !== STATE_OK &&
    animal.state !== STATE_LOADING) {
    dispatch(getAnimalAsync(index));
  }

  const imageElement = (animal.url ?? "").endsWith(".mp4") ? (<video src={animal.url} />) : <img src={animal.url} alt="empty" />

  const reload = () => {
    dispatch(getAnimalAsync(index))
  };

  const errorElement = (
    <div className='error-element'>
      <div className='error-text'>Error: {animal.error}</div>
      <button onClick={reload}>Reload</button>
    </div>
  );

  const loadingElement = (<div className='loading-element'>Loading...</div>)

  const content = () => {
    switch (animal.state) {
      case STATE_OK:
        return imageElement;
      case STATE_ERROR:
        return errorElement;
      default:
        return loadingElement;
    }
  }

  return (
    <div className='animal'>
      {content()}
    </div>
  );
};

export default Animal;