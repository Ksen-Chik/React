import React from "react";
import Animal from "../animal";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addAnimals } from "../store/animals/actions";
import { getAnimals } from "../store/animals/selectors";

function Animals() {

  const dispatch = useDispatch();

  const animalsCount = 3;

  const animals = useSelector(getAnimals, shallowEqual);

  if (animals.length < animalsCount) {
    dispatch(addAnimals(animalsCount - animals.length));
  }

  return (
    <div>
      <h4>Animals</h4>
      {[...Array(animalsCount)].map((x, i) => <Animal index={i} key={i} />)}
    </div>
  );
};

export default Animals;