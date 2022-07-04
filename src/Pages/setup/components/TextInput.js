import React from "react";

const TextInput = ({ field, inputFieldLabel }) => (
    <div key={field.title} className="relative border border-gray-300 rounded-md my-2 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-colors">
        {inputFieldLabel(field.required, field.title)}
        <input
            type="text"
            name={field.title}
            id={field.key}
            className="block w-full border-0 px-0 py-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder={field.placeholder}
            autoComplete="off"
            onChange={event => field.change(event)}
            value={
                field.value !== null
                    ? field.value
                    : ""
            }
        />
    </div>
);

export default TextInput;