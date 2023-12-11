import { useEffect, useState } from "react"

const ApprovingButton = ({ status, textName, onStatusChange}) => {

    const handleClick = () => {
        onStatusChange(!status);
        console.log(status);
    };

    const buttonStyle = status
    ? 'bg-emerald-500 hover:bg-emerald-700 text-white'
    : 'bg-rose-500 hover:bg-rose-700 text-white';

    return (
    <button className={`font-bold py-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
        {textName}
    </button>
    );
};

export default ApprovingButton;