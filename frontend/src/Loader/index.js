import React from 'react';
import {Rings} from 'react-loader-spinner';
import './style.css';

const CustomLoader = (props) => {
    const {ApiLoader, loaderHeight, loaderWidth } = props;
  return (
    <div>
      {ApiLoader ? (
        <div
          className="align-center-loader"
          style={{ height: `${loaderHeight}`, width: `${loaderWidth}` }}
        >
            <Rings color="#7369F0" height={70} width={70} />
        </div>
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
}

export default CustomLoader;