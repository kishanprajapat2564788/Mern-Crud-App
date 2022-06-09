import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from 'axios';
import { failureToast, successToast } from "../Toaster";
import CustomLoader from "../Loader";

const CreateExerciseData = () => {
  const [exerciseData, setExerciseData] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date(),
    users: [],
  });
  const [users, setUsers] = useState([]);
  const [ApiLoader, setApiLoader] = useState(true);

  useEffect(() =>{
      axios.get('http://localhost:3001/user')
      .then((res) =>{
        let users = [];
          if(res.data.length > 0){
              res.data.map(user => (
                  users.push({
                      value: user.username,
                      label: user.username
                  })
              ))
          }
          setUsers([...users]);
          setApiLoader(false);
      })
      .catch((err) => {
          console.log(err);
          setApiLoader(false);
      })
  },[])

  const onChangeInputData = (value, key) => {
    if (key === "date") {
      setExerciseData((prevState) => ({ ...prevState, [key]: value }));
    } else if (key === "username") {
      setExerciseData((prevState) => ({ ...prevState, [key]: value }));
    } else {
      setExerciseData((prevState) => ({ ...prevState, [key]: value }));
    }
  };
  const submitHandler = () => {
    try{
      if(exerciseData.description === ''){
        failureToast('Please Provide Description');
      }else if(exerciseData.duration === ''){
        failureToast('Please Provide Duration');
      }
      else{
        const exercise = {
          username: exerciseData.username.value,
          description: exerciseData.description,
          duration: exerciseData.duration,
          date: exerciseData.date,
        };
        axios.post('http://localhost:3001/exercise/add', exercise)
            .then(response => console.log(response.data));
            setTimeout(() =>{
              window.location = "/";
            },600)
        successToast('Create Exercise Successfully');
      }
    }catch(err){
      console.log("Error",err);
    }   
  };
  return ApiLoader ? (
    <CustomLoader ApiLoader={ApiLoader} loaderHeight={'200px'} loaderWidth={'100% '}/>
  ) : (<>
      <h3 className="Header-style">Create New Excercise</h3>
      <div className="FormInputs">
        <form>
          <div className="form-group">
            <label style={{ marginRight: "20px" }}>Username: </label>
            <Select
              name="username"
              placeholder={"Select Username"}
              defaultValue={exerciseData.users}
              options={users}
              onChange={(value) => onChangeInputData(value, "username")}
            />
          </div>
          <div className="form-group">
            <label style={{ marginRight: "12px" }}>Description: </label>
            <input
              type="text"
              required
              maxLength={200}
              placeholder={"Description"}
              className="form-control"
              value={exerciseData.description}
              onChange={(e) => onChangeInputData(e.target.value, "description")}
            />
          </div>
          <div className="form-group">
            <label style={{ marginRight: "-13px" }}>
              Duration (in minutes) :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Duration"
              value={exerciseData.duration}
              maxLength={2}
              onChange={(e) => onChangeInputData(e.target.value, "duration")}
            />
          </div>
          <div className="form-group">
            <label style={{ marginRight: "65px" }}>Date: </label>
            <div>
              <DatePicker
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                showMonthDropdown
                dropdownMode="select"
                selected={exerciseData.date}
                onChange={(date) => onChangeInputData(date, "date")}
              />
            </div>
          </div>

          <div className="form-group">
            <button
              disabled={( exerciseData.username === '')}
              type="button"
              value="Create Exercise Log"
              className="btn btn-primary custom-button"
              onClick={submitHandler}
            >
              Create Exercise Log
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateExerciseData;
