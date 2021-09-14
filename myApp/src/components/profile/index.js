import React from "react";
import { useCallback, useState } from "react";
import { store } from "../store/index";
import { toggleCheckBox } from "../store/profile/actions";


export const Profile = () => {

  const [dummy, setDummy] = useState();

  console.log(JSON.stringify(store.getState()));

  //const { checkbox, name } = store.getState().profile;

  const profile = store.getState().profile;
  const dispatch = store.dispatch;

  const setCheckbox = useCallback(() => {
    dispatch(toggleCheckBox);
    console.log(JSON.stringify(profile));
    setDummy({});
  }, [dispatch]);

  return (
    <div>
      <h4>Profile</h4>
      <input
        type="checkbox"
        checked={profile.checkbox}
        value={profile.checkbox}
        onChange={setCheckbox}
      />
      <span>Show Name</span>
      {profile.checkbox && <div>{profile.name}</div>}
    </div>
  );
};