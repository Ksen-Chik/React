import React from "react";
import { useCallback } from "react";
import { store } from "../store/index";
import { toggleCheckBox } from "../store/profile/actions";
import { useSelector, useDispatch } from 'react-redux';


export const Profile = () => {

  const { profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setCheckbox = useCallback(() => {
    dispatch(toggleCheckBox);
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