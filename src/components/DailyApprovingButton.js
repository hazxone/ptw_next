import { useEffect, useState } from "react"
import supabase from '../config/supabaseClient'

const DailyApprovingButton = ({ status, textName, date, id, jsonb, section, position, updateParam, daily}) => {

    function convertTime(timestampz) {
        if (timestampz == ""){
            return ""
        }
        const date = new Date(timestampz);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-UK', options);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        return formattedDate + " " + formattedTime
    }

    const handleClick = async () => {
        function updateSign(jsonb, section, position) {
            let finalState = Object.values(jsonb);
            console.log(finalState.length);
            for(let i=0; i<finalState.length; i++){
                if(finalState[i].date === date){
                    console.log(finalState[i][section]);
                    finalState[i][section][position].is_sign = true;
                    finalState[i][section][position].sign_date = ((new Date()).toISOString()).toLocaleString('ms');
                    // if (finalState.hasOwnProperty(key)) {
                    //     console.log(finalState[key]);
                    //     if (finalState[key].hasOwnProperty(subkey)) {
                    //         finalState[key][subkey].is_sign = true;
                    //         finalState[key][subkey].sign_date = "2023-12-20";
                    //     }
                    // }
                }
            }
            return finalState;
        }

        if (status){
            return
        }

        let updatedJsonb = updateSign(jsonb, section, position);

        console.log(updatedJsonb);
        
        const { data, error } = await supabase
            .from('ptw')
            .update({ 'daily_approval': updatedJsonb })
            .eq("id", id)
            .select()
        
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            updateParam(id+date+section+position)
        }

    };

    const buttonStyle = status
    ? 'bg-emerald-500 text-white disabled cursor-not-allowed opacity-80'
    : 'bg-rose-500 hover:bg-rose-700 text-white';

    return (
        <button className={`font-bold py-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
            {textName}
            <br />
            <span className="text-xs font-normal">{convertTime(daily[section][position].sign_date)}</span>
        </button>
    );
};

export default DailyApprovingButton;