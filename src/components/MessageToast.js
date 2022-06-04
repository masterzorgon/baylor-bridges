import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyToast = (status) => {

    const ErrorMessage = () => (
        <div>
            <h5 className="text-md">Something went wrong!</h5>
            <p className="text-sm">Network issues - please try again</p>
        </div>
    );

    const SuccessMessage = () => (
        <div>
            <h5 className="text-md">Submission successful!</h5>
            <p className="text-sm">Your request processed successfully</p>
        </div>
    );

    status
        ? toast.error(<ErrorMessage />, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        : toast.success(<SuccessMessage />, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
};

export const MessageToast = () => (
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
);
