import React from 'react';
import clsx from 'clsx';

function TitleWorkType({ ptw }) {
    const workType = ptw.section_one.workType;

    const baseClass = "py-3 px-4 relative inline-block select-none items-center whitespace-nowrap rounded-md py-1.5 px-3 font-sans text-2l font-bold uppercase mb-4";

    const color = workType === "Lifting" ? {
    'bg-orange-300': true,
    'text-orange-700': true,
    } : workType === "Confined Space" ? {
    'bg-blue-300': true,
    'text-blue-700': true,
    } : workType === "Hot Work" ? {
    'bg-red-300': true,
    'text-red-700': true,
    } : workType === "Welding & Burning" ? {
    'bg-violet-300': true,
    'text-red-700': true,
    } :workType === "High Voltage" ? {
    'bg-white': true,
    'text-black-700': true,
    } :workType === "Flammable Release" ? {
    'bg-yellow-300': true,
    'text-yellow-700': true,
    } :{
    'bg-lime-300': true,
    'text-lime-700': true,
    };

    const h1Class = clsx(baseClass, color);

    return (
    <h1 className={h1Class}>PTW {ptw.id} - {workType}</h1>
    );
}

export default TitleWorkType;