import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { failureToast, successToast } from "../Toaster";
import CustomLoader from "../Loader";

const EditExerciseData = () => {
  const [exerciseData, setExerciseData] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date(),
    users1: [],
  });
  const [users, setUsers] = useState([]);
  const {id} = useParams();
  const [ApiLoader, setApiLoader] = useState(true);

  useEffect(() =>{
      axios
        .get("https://exercise-tracker-pro-app.vercel.app/exercise/" + id)
        .then((res) => {
          setExerciseData({
            username: {
              value: res.data.username,
              label: res.data.username,
            },
            description: res.data.description,
            duration: res.data.duration,
            date: new Date(res.data.date),
          });
          setApiLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setApiLoader(false);
        });

      axios.get('https://exercise-tracker-pro-app.vercel.app/user')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        axios.post('https://exercise-tracker-pro-app.vercel.app/exercise/update/'+id, exercise)
            .then(response => console.log(response.data));
            setTimeout(() =>{
              window.location = "/";
            },600)
        successToast('Edited Successfully');
      }
    }catch(err){
      console.log("Error",err);
    }
  };

  return ApiLoader ? (
    <CustomLoader ApiLoader={ApiLoader} loaderHeight={'200px'} loaderWidth={'100% '}/>
  ) : (
    <>
      <h3 className="Header-style">Edit Excercise Log</h3>
      <div className="FormInputs">
        <form>
          <div className="form-group">
            <label style={{ marginRight: "20px" }}>Username: </label>
            <Select
              name="username"
              placeholder={"Select Username"}
            //   isDisabled={exerciseData.username !== ''}
              value={exerciseData.username}
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
              value={exerciseData.duration}
              placeholder="Duration"
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
              disabled={(exerciseData.username === '' && exerciseData.description === '')}
              type="button"
              value="Create Exercise Log"
              className="btn btn-primary custom-button"
              onClick={submitHandler}
            >
              Edit Exercise Log
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditExerciseData;
