import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAnimals } from "../store/animals/selectors";
import { getAnimalAsync, STATE_ERROR, STATE_OK } from "../store/animals/actions";

function Animal(props) {

  const index = props.index;
  const dispatch = useDispatch();

  const animals = useSelector(getAnimals, shallowEqual);
  const animal = animals[index];

  if (animal.state !== STATE_ERROR && animal.state !== STATE_OK) {
    dispatch(getAnimalAsync(index));
  }

  const imageElement = (animal.url ?? "").endsWith(".mp4") ? (<video src={animal.url} />) : <img src={animal.url} alt="empty" />

  return (
    <div>
      {imageElement}
    </div>
  );
};

export default Animal;