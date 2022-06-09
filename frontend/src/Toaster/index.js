import React from 'react';
import { toast } from 'react-toastify';
import './index.css';

const SuccessMessage = ({ message }) => {
	return (
	<div>
		<i className="fas fa-thumbs-up" />
		<span className="success_toast_msg">{message}</span>
	</div>
	)
};

const FailureMessage = ({ message }) => {
	return (
    <div>
      <i className="fas fa-exclamation" />
      <span className="warn_toast_msg">{message}</span>
    </div>
  );
};

const successToast = (msg) => {
	toast.info(<SuccessMessage message={msg} />, {
		className: 'success_toast',
		autoClose: 4500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

const failureToast = (msg) => {
	toast.dismiss();
	toast.warn(<FailureMessage message={msg} />, {
		className: 'warn_toast',
		autoClose: 4500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export { failureToast, successToast };
