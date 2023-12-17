import { useEffect, useState } from "react"
import supabase from '../config/supabaseClient'

const ApprovingButton = ({ status, textName, onStatusChange, id, jsonb, section, position}) => {

    const handleClick = async () => {
        onStatusChange(!status);
        function updateSign(jsonb, key, value) {
            let finalState = { ...jsonb };
            if (finalState.hasOwnProperty(key)) {
                finalState[key].is_sign = value;
                finalState[key].sign_date = ((new Date()).toISOString()).toLocaleString('ms');
            }
            return finalState;
        }

        let updatedJsonb = updateSign(jsonb, position, !status);

        console.log(section)
        
        const { data, error } = await supabase
            .from('ptw')
            .update({ [section]: updatedJsonb })
            .eq("id", id)
            .select()
        
        if (error) {
            console.log(error)
            onStatusChange(status);
        }
        if (data) {
            console.log(data)
        }

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