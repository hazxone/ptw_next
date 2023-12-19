import { useEffect, useState } from "react"
import supabase from '../config/supabaseClient'

const ApprovingButton = ({ radioFormSelection, status, textName, onStatusChange, id, jsonb, section, position, sectionName, updateParam}) => {

    function convertTime(timestampz) {
        if (timestampz == null || timestampz == ""){
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

    const constructSignObject = () => ({
        is_sign: false,
        sign_date: ""
    });
        
    const constructSection = (signs) => {
        const section = {};
        for (let sign of signs) {
            section[`${sign}_sign`] = constructSignObject();
        }
        return section;
    };

    const handleClick = async () => {
        // onStatusChange(!status);
        function updateSign(jsonb, key, value) {
            let finalState;
            if (section == "section_two" && position == "as_sign"){
                finalState = constructSection(['as'])
            } else if (section == "section_three" && position == "aar_sign"){
                finalState = constructSection(['aar'])
            } else if (section == "section_four"){
                if (position == "pa_sign"){
                    finalState = constructSection(['pa', 'aar'])
                }
                else {
                    finalState = { ...jsonb };
                }
            } else {
                finalState = { ...jsonb };
            }

            if (finalState.hasOwnProperty(key)) {
                finalState[key].is_sign = value;
                finalState[key].sign_date = ((new Date()).toISOString()).toLocaleString('ms');
            }
            return finalState;
        }

        let updatedJsonb = updateSign(jsonb, position, true);

        console.log(updatedJsonb)

        if (radioFormSelection){
            updatedJsonb.radioSelection = radioFormSelection;
        }
        
        const { data, error } = await supabase
            .from('ptw')
            .update({ [section]: updatedJsonb })
            .eq("id", id)
            .select()
        
        if (error) {
            console.log(error)
            // onStatusChange(status);
        }
        if (data) {
            console.log(data)
            updateParam(id+section+position)
        }
    };

    const buttonStyle = status
    ? 'bg-emerald-500 hover:bg-emerald-700 text-white'
    : 'bg-rose-500 hover:bg-rose-700 text-white';

    return (
        <button className={`font-bold py-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
            {textName}
            <br />
            <span className="text-xs font-normal">{convertTime(jsonb && jsonb[position].sign_date)}</span>
        </button>
    );
};

export default ApprovingButton;