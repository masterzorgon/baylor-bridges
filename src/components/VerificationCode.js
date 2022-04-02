import { React } from "react";

const VerificationCode = ({ value, onchange }) => {
    // const [code, setCode] = useState([]);
    // const [codeCheck, setCodeCheck] = useState(false);
    return (
        <>
            <div className="mt-1 grid">
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-emerald-800 focus:border-emerald-800 block w-full sm:w-2/3 justify-self-center sm:text-lg font-semibold tracking-[1em] text-center text-slate-600 border-gray-300 px-4 rounded-full"
                    placeholder="******"
                />
            </div>
        </>
    );

};
export default VerificationCode;