import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Table, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import CustomLoader from "../Loader";

const getSerialNumber = (index, pagination) => {
  return (pagination?.currentPage - 1) * 10 + (index + 1);
};

const ExerciseListRow = (props) => {
  const { index, pagination } = props;
  return (
    <tr>
      <td className="text-center">{getSerialNumber(index, pagination)}</td>
      <td className="text-center">{props.exerciseList.username}</td>
      <td className="text-center">{props.exerciseList.description}</td>
      <td className="text-center">{props.exerciseList.duration}</td>
      <td className="text-center">
        {props.exerciseList.date.substring(0, 10)}
      </td>
      <td className="text-center">
        <Link to={"/edit/" + props.exerciseList._id}>
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <button
          style={{ marginLeft: "9px" }}
          className={"delete-button"}
          onClick={() => props.deleteHandler(props.exerciseList._id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

const ExerciseData = () => {
  const [exercise, setExercise] = useState([]);
  const [allExerciseData, setAllExerciseData] = useState([]);
  const [ApiLoader, setApiLoader] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPage: null,
  });
  const pageSize = 10;

  const UpdatePagination = (data) => {
    let n = pagination;
    if (data.length > pageSize) {
      n["nextPage"] = n.currentPage + 1;
    }
    if (n.currentPage > 1) {
      n.previousPage = n.currentPage - 1;
    }
    n["totalPage"] = Math.floor(data.length / pageSize);
    if (data.length % pageSize !== 0) {
      n["totalPage"] += 1;
    }
    setPagination(n);
    setExercise(
      data.slice(
        pagination.currentPage * pageSize - pageSize,
        pagination.currentPage * pageSize
      ) || []
    );
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure want to delete this row!")) {
      axios
        .delete("http://localhost:3001/exercise/" + id)
        .then((res) => console.log(res.data));
      let tempArray = exercise.filter((item) => item._id !== id);

      setExercise([...tempArray]);
    } 
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/exercise")
      .then((res) => {
        setAllExerciseData([...res.data]);
        // setExercise(res.data);
        UpdatePagination([...res.data]);
        setApiLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setApiLoader(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MapExerciseList = () => {
    return exercise.map((item, index) => {
      return (
        <ExerciseListRow
          exerciseList={item}
          deleteHandler={deleteHandler}
          key={item._id}
          index={index}
          pagination={pagination}
        />
      );
    });
  };

  return ApiLoader ? (
    <CustomLoader ApiLoader={ApiLoader} loaderHeight={'200px'} loaderWidth={'100% '}/>
  ) : (
    <div>
      <h3 style={{ marginBottom: "2.5rem", fontWeight: "bold" }}>
        List of Exercises
      </h3>
      <Table striped style={{ marginBottom: 0 }}>
        <thead>
          <tr className="text-center">
            <th>S.No</th>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{MapExerciseList()}</tbody>
      </Table>
      <Row style={{ margin: "0", padding: "0" }}>
        <Col md="12" style={{ padding: 0 }}>
          {pagination.totalPage > 1 ? ( //stateTotalData
            <Pagination
              setAnyDataInPagination={setExercise}
              pagination={pagination}
              setPagination={setPagination}
              pageSize={pageSize}
              stateTotalData={allExerciseData}
            />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default ExerciseData;
