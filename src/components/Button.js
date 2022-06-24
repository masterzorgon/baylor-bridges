import React from "react";
import { Link } from "react-router-dom";

import { classNames } from "./Utils";

const Button = ({ onClick, loading, disabled, children, className, arrow }) => {
    return (
        <button
            type="button"
            className={classNames("btn text-center w-full flex justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed relative", loading && "cursor-wait disabled:cursor-wait", className)}
            onClick={onClick}
            disabled={disabled}
        >
            <div className={classNames("absolute", loading ? "" : "opacity-0")}>
                <svg className="pointer-events-none animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fillOpacity="0"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>

            <div className={classNames("transition-all flex items-center", loading ? "opacity-0" : "")}>
                <span>{children}</span>
                {
                    arrow === true &&
                    <Arrow />
                }
            </div>

        </button>
    );
};

const HyperLink = ({ href, children, className, arrow }) => {
    return (
        <Link
            to={href}
            className={classNames("link text-center justify-center inline-flex items-center relative cursor-pointer", className)}
        >
            {children}
            {
                arrow === true &&
                <Arrow />
            }
        </Link>
    );
};

const Arrow = ({ size = 20 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="octicon arrow-symbol" width={size} height={size} viewBox="0 0 16 16" fill="none"><path fill="currentColor" d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"></path><path stroke="currentColor" d="M1.75 8H11" strokeWidth="1.5" strokeLinecap="round"></path></svg>
    );
};

export default Button;
export { HyperLink, Button, Arrow };