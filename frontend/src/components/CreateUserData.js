import React, {useState} from "react";
import axios from 'axios';
import { successToast } from "../Toaster";

const CreateUserData = () => {

    const [userData, setuserData] =useState({
        username: "",
    });

    const updateUserData = (value, key) => {
        setuserData((prevState) => ({ ...prevState, [key]: value }));
    };
    const submitHandler = () => {
        const user = {
            username: userData.username,
        };
        axios.post('http://localhost:3001/user/add', user)
        .then(response => console.log(response.data));
        setuserData({
            username : '',
        })
        successToast("User Added Succesfully");
    };
  return (
    <>
      <h3 className="Header-style">Create New User</h3>
      <div className="FormInputs">
        <form>
          <div className="form-group">
            <label style={{ marginRight: "20px" }}>Username: </label>
            <input
              type="text"
              required
              maxLength={20}
              placeholder={"Enter Username"}
              className="form-control"
              value={userData.username}
              onChange={(e) => updateUserData(e.target.value, "username")}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={userData.username === ''}
              value="Create User"
              className="btn btn-primary"
              onClick={submitHandler}
              style={{ marginLeft: "106px" }}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUserData;
