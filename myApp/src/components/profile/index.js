import React from "react";
import { useCallback } from "react";
import { toggleCheckBox } from "../store/profile/actions";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getProfile } from "../store/profile/selectors";

export const Profile = () => {

  const { profile } = useSelector(getProfile, shallowEqual);
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