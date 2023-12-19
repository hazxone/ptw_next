import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import RadioButton from "../components/RadioSelection"
import ApprovingButton from "../components/ApprovingButton"
import TitleWorkType from "../components/TitleWorkType"
import DailyApprovingButton from "../components/DailyApprovingButton"
import RadioTitles from './RadioTitles.json'

const View = () => {
    const { id } = useParams()
    console.log(id)
    const titleIds = [1,2,3,4]
    const [ptw, setPtw] = useState(null)
    const navigate = useNavigate()

    // Section One
    const [aarSign, setAarSign] = useState(false);
    const [raSign, setRaSign] = useState(false);

    // Section Two
    const [asSign2, setasSign2] = useState(false);

    const [gasTestOption, setGasTestOption] = useState("");
    const [standbyPersonOption, setStandbyPersonOption] = useState("");
    const [radioSubmitteds2, setRadioSubmitteds2] = useState(false);

    // Section Three
    const [aarSigns3, setAarSigns3] = useState(false);

    const [radioStates, setRadioStates] = useState({
        doNotOperateBoard: false,
        requireIsolation: false,
        safetyDeviceRelease: false,
        isolated: false,
    });

    const relevantStates = RadioTitles
    .filter(titleObj => titleIds.includes(titleObj.id))
    .reduce((acc, titleObj) => {
        acc[titleObj.state] = radioStates[titleObj.state];
        return acc;
    }, {});

    const [radioSubmitteds3, setRadioSubmitteds3] = useState(false);

    const [doNotOperateBoard, setdoNotOperateBoard] = useState(false);
    const [requireIsolation, setrequireIsolation] = useState(false);
    const [safetyDeviceRelease, setsafetyDeviceRelease] = useState(false);
    const [isolated, setisolated] = useState(false);

    // Section Four
    const [paSigns4, setPaSigns4] = useState(false);
    const [aarSigns4, setAarSigns4] = useState(false);

    //Section Daily
    const [dailyJsonb, setDailyJsonb] = useState('initial');

    useEffect(() => {
        const fetchPtw = async () => {
            const { data, error } = await supabase
                .from('ptw')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                console.log(error)
                navigate('/', { replace: true })
            }
            if (data) {
                console.log(data)
                setPtw(data)
                if (data.section_one){
                    setAarSign(data.section_one.aar_sign.is_sign)
                    setRaSign(data.section_one.ra_sign.is_sign)
                }
                if (data.section_two)
                {
                    setasSign2(true)
                    setRadioSubmitteds2(true)
                }
                if (data.section_three){
                    setAarSigns3(data.section_three.aar_sign.is_sign)
                    setRadioSubmitteds3(true)
                    console.log(data.section_three)
                }
                if (data.section_four){
                    setPaSigns4(data.section_four.pa_sign.is_sign)
                    setAarSigns4(data.section_four.aar_sign.is_sign)
                }
            }
        }

        fetchPtw()
    }, [id, navigate, dailyJsonb])

    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-white shadow-md min-h-screen">
                <div className="p-4 border-b">
                    <span className="text-lg font-semibold">Project Name</span>
                </div>
                <nav className="text-gray-700">
                    <Link to="/dashboard" className="block py-2.5 px-4 hover:bg-gray-200">Dashboard</Link>
                </nav>
            </div>
            {ptw && (
            <div className="flex-1 p-8">
                <TitleWorkType ptw={ptw} />
                {/* <div className="container mx-auto p-6"> */}
                    {/* <!-- Section 1 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 1</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Applicant</label>
                            <p className="bg-slate-100 rounded w-full py-2 px-3 text-gray-700">{ptw.staff_id}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Date Created</label>
                            <p className="bg-slate-100 rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.date}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Zone</label>
                            <p className="bg-slate-100 rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.zone}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                            <p className="bg-slate-100 rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.location}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <p className="bg-slate-100 rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.description}</p>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <ApprovingButton status={aarSign} textName={"Approving Authority (AAR)"} onStatusChange={setAarSign} id ={ptw.id} jsonb={ptw.section_one} section={'section_one'} position={'aar_sign'} updateParam={setDailyJsonb}/>
                            <ApprovingButton status={raSign} textName={"Receiving Authority (RA)"} onStatusChange={setRaSign} id ={ptw.id} jsonb={ptw.section_one} section={'section_one'} position={'ra_sign'} updateParam={setDailyJsonb}/>
                        </div>
                    </div>

                    {/* <!-- Section 2 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 2</h2>
                            <div className="container mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                    <div className="flex-1 shadow p-6 rounded bg-neutral-100">
                                        <RadioButton selectedOption={gasTestOption} setSelectedOption={setGasTestOption} name="gasTest" title="Gas Test Required?" />
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Open Gas Test</button>
                                    </div>
                                    
                                    <div className="flex-1 shadow p-6 rounded bg-neutral-100">
                                        <RadioButton selectedOption={standbyPersonOption} setSelectedOption={setStandbyPersonOption} name="standbyPerson" title="Standby Person"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                            <ApprovingButton radioFormSelection={null} status={asSign2} textName={"Authorized Supervisor (AS)"} onStatusChange={setasSign2} id ={ptw.id} jsonb={ptw.section_two} section={'section_two'} position={'as_sign'} updateParam={setDailyJsonb}/>
                            </div>
                    </div>

                    {/* <!-- Section 3 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 3</h2>
                        <div className="container mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                {RadioTitles.map((titleObj) =>
                                    titleIds.includes(titleObj.id) &&
                                        <div key={titleObj.id} className="flex-1 shadow p-6 rounded bg-neutral-100">
                                            <RadioButton 
                                                selectedOption={radioStates[titleObj.state]} 
                                                setSelectedOption={(newState) => setRadioStates({
                                                    ...radioStates, 
                                                    [titleObj.state]: newState
                                                })} 
                                                name={titleObj.state} 
                                                title={titleObj.title}
                                                status={radioSubmitteds3}
                                                radioId={titleObj.id}
                                                jsonb={ptw.section_three ? ptw.section_three.radioSelection : null}
                                            />
                                            
                                        </div>
                                )}
                            </div>
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                <div className="flex-1 shadow p-6 rounded bg-neutral-100">
                                    <RadioButton selectedOption={doNotOperateBoard} setSelectedOption={setdoNotOperateBoard} name="doNotOperateBoard" title="Does Equipment need to be listed on the 'Do Not Operate Board'?" />
                                </div>
                                <div className="flex-1 shadow p-6 rounded bg-neutral-100">
                                    <RadioButton selectedOption={requireIsolation} setSelectedOption={setrequireIsolation} name="requireIsolation" title="Does this work require equipment isolation?"/>
                                </div>
                                <div className="flex-1 shadow p-6 rounded bg-neutral-100">
                                    <RadioButton selectedOption={safetyDeviceRelease} setSelectedOption={setsafetyDeviceRelease} name="safetyDeviceRelease" title="Is equipment Protection Safety device to be Temporary Release?"/>
                                </div>
                                <div className="flex-1 shadow p-6 rounded bg-neutral-100">
                                    <RadioButton selectedOption={isolated} setSelectedOption={setisolated} name="isolated" title="Equipment isolated and/or depressurized?"/>
                                </div>
                            </div> */}
                            <h2 className="mt-4 text-sm font-medium text-orange-600 mb-4">If YES to any of the above question, equipment preparation copy must be attached at the back of the Control Room Permit Copy</h2>
                        </div>
                        <div className="mb-4">
                            <ApprovingButton radioFormSelection={relevantStates} status={aarSigns3} textName={"Approving Authority (AAR)"} onStatusChange={setAarSigns3} id ={ptw.id} jsonb={ptw.section_three} section={'section_three'} position={'aar_sign'} updateParam={setDailyJsonb}/>
                        </div>
                    </div>

                    {/* <!-- Section 4 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 4</h2>
                        <h2 className="text-sm font-medium text-orange-600 mb-4">We have completed Work Site Inspection as required and in out judgement the work site is safely prepared and may proceed</h2>
                        <div className="flex space-x-4 mb-4">
                            <ApprovingButton status={ptw.section_four ? ptw.section_four.pa_sign.is_sign: false} textName={"Permit Applicant (PA)"} id ={ptw.id} jsonb={ptw.section_four} section={'section_four'} position={'pa_sign'} updateParam={setDailyJsonb}/>
                            <ApprovingButton status={ptw.section_four ? ptw.section_four.aar_sign.is_sign: false} textName={"Approving Authority (AAR)"} id ={ptw.id} jsonb={ptw.section_four} section={'section_four'} position={'aar_sign'} updateParam={setDailyJsonb}/>
                        </div>
                    </div>

                    {/* <!-- Daily Approval --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-semibold mb-4">Daily Approval</h2>
                        <div className="mb-4">
                                {ptw && ptw.daily_approval && ptw.daily_approval.map(daily =>
                                <div key={daily.date} class="bg-slate-100 drop-shadow-lg flex mb-6 p-4">
                                    <div class="w-1/4">
                                        <p class="font-semibold py-2">{daily.date}</p>
                                    </div>
                                    <div class="w-3/4">
                                        <div class="flex flex-col space-y-6 p-2">
                                            <fieldset className="border border-zinc-400 p-4 rounded">
                                                <legend className="text-sm font-bold">Section 5 - Daily Permit Approval and Release</legend>
                                                <div class="flex space-x-2">
                                                    <DailyApprovingButton status={daily.daily_approval_section_five.aar_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_five"} position={"aar_sign"} textName={"Receiving Authority (AAR)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_five.as_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_five"} position={"as_sign"} textName={"Authorized Supervisor (AS)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_five.aa_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_five"} position={"aa_sign"} textName={"Approving Authority (AA)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_five.ptwc_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_five"} position={"ptwc_sign"} textName={"PTW Coordinator"} updateParam={setDailyJsonb}/>
                                                </div>
                                            </fieldset>
                                            <fieldset className="border border-red-400 p-4 rounded">
                                                <legend className="text-sm font-bold">Section 6 - Permit Extension</legend>
                                                <div class="flex space-x-2">
                                                    <DailyApprovingButton status={daily.daily_approval_section_six.pa_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_six"} position={"pa_sign"} textName={"Permit Applicant (PA)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_six.as_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_six"} position={"as_sign"} textName={"Authorized Supervisor (AS)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_six.aa_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_six"} position={"aa_sign"} textName={"Approving Authority (AA)"} updateParam={setDailyJsonb}/>
                                                </div>
                                            </fieldset>
                                            <fieldset className="border border-emerald-400 p-4 rounded">
                                                <legend className="text-sm font-bold">Section 7 - Daily Handback & Suspension</legend>
                                                <div class="flex space-x-2">
                                                    <DailyApprovingButton status={daily.daily_approval_section_seven.pa_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_seven"} position={"pa_sign"} textName={"Permit Applicant (PA)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_seven.as_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_seven"} position={"as_sign"} textName={"Authorized Supervisor (AS)"} updateParam={setDailyJsonb}/>
                                                    <DailyApprovingButton status={daily.daily_approval_section_seven.aa_sign.is_sign} id={ptw.id} jsonb={ptw.daily_approval} daily={daily}
                                                        date={daily.date} section={"daily_approval_section_seven"} position={"aa_sign"} textName={"Approving Authority (AA)"} updateParam={setDailyJsonb}/>
                                                </div>
                                            </fieldset>                                   
                                        </div>
                                    </div>
                                </div>
                                )}
                            
                    </div>
                    <div className="flex items-center mb-4">
                        {/* <input id="jobCompleted" type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"><label for="jobCompleted" className="ml-2 text-gray-700">This job was completed</label></input> */}
                    </div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close PTW</button>
                </div>
                {/* </div> */}
            </div>
            )}
        </div>
        )
    }

    export default View
