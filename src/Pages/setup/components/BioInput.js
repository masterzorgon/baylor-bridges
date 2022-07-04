import React from "react";

const BioInput = ({ field, inputFieldLabel, handleFilteredInput }) => (
    <div className="relative border border-gray-300 rounded-md my-2 rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
        {inputFieldLabel(field.required, field.title)}
        <textarea
            type="text"
            name="bio"
            id="bio"
            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            style={{ "height": "10rem" }}
            placeholder={field.placeholder}
            onChange={
                field.filtered
                    ? event => handleFilteredInput(event)
                    : event => field.change(event)
            }
            value={
                field.value !== null
                    ? field.value
                    : ""
            }
        />
    </div>
);

export default BioInput;