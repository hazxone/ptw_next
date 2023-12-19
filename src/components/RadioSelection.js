import { useEffect, useState } from "react"
import {useId} from 'react';

function RadioButton({ selectedOption, setSelectedOption, name, title, status, radioId, jsonb}) {
    let idCounter = useId();
    const [id] = useState(() => {
        return `radio-button-${idCounter}`; // unique id
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    console.log(status+ name)
    // console.log(selectedOption);
    // https://preline.co/docs/radio.html
    return (
        <div>
        {!status ? (
        <form>
            <div className="block text-gray-700 text-sm font-bold mb-2">{title}</div>
            <label 
                for={`${id}-yes`} 
                className={`flex p-3 ${selectedOption === "Yes" ? 'bg-emerald-100' : ''} 
                rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
            >
                <input
                    id={`${id}-yes`} 
                    type="radio" 
                    value="Yes" 
                    checked={selectedOption === "Yes"} 
                    onChange={handleOptionChange} 
                    name={name} 
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
                />
                <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Yes</span>
            </label>
            <label
                for={`${id}-no`} 
                className={`flex p-3 ${selectedOption === "No" ? 'bg-rose-100' : ''} 
                rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
            >
                <input 
                    id={`${id}-no`} 
                    type="radio" 
                    value="No" 
                    checked={selectedOption === "No"} 
                    onChange={handleOptionChange} 
                    name={name} 
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
                />
                <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">No</span>
            </label>
        </form>
        ):
            <div className="block text-gray-700 text-sm font-bold mb-2">
                {title}
                <br />
                {jsonb[name]}
            </div>
        }
        </div>
    );
}

export default RadioButton;
