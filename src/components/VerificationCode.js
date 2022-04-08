import { React, useEffect, useState } from "react";

const VerificationCode = ({ value, onChange }) => {
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode(value);
    }, [value]);

    const setCodeTrigger = (e) => {
        let code_uncheck = e.target.value;
        console.log(code_uncheck[code_uncheck.length - 1]);

        if (/^\d{0,6}$/.test(code_uncheck)) {
            setCode(code_uncheck);

            if (onChange) {
                onChange(code_uncheck, code_uncheck.length >= 6);
            }
        }



    };
    return (
        <>
            <div className="mt-1 grid">
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="caret-white shadow-sm focus:ring-emerald-800 focus:border-emerald-800 block w-full sm:w-2/3 justify-self-center sm:text-lg font-semibold tracking-[1em] text-center text-slate-600 border-gray-300 px-4 rounded-full"
                    placeholder="******"
                    value={code}
                    onChange={setCodeTrigger}
                />
            </div>
        </>
    );

};
export default VerificationCode;