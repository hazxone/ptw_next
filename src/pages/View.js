import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import RadioButton from "../components/RadioSelection"
import ApprovingButton from "../components/ApprovingButton"
import TitleWorkType from "../components/TitleWorkType"

const View = () => {
    const { id } = useParams()
    console.log(id)
    const [ptw, setPtw] = useState(null)
    const navigate = useNavigate()

    // Section One
    const [aarSign, setAarSign] = useState(false);
    const [raSign, setRaSign] = useState(false);

    // Section Two
    const [asSign, setAsSign] = useState(false);

    const [gasTestOption, setGasTestOption] = useState("");
    const [standbyPersonOption, setStandbyPersonOption] = useState("");

    // Section Three
    const [aarSigns3, setAarSigns3] = useState(false);

    const [doNotOperateBoard, setdoNotOperateBoard] = useState(false);
    const [requireIsolation, setrequireIsolation] = useState(false);
    const [safetyDeviceRelease, setsafetyDeviceRelease] = useState(false);
    const [isolated, setisolated] = useState(false);

    // Section Four
    const [paSigns4, setPaSigns4] = useState(false);
    const [aarSigns4, setAarSigns4] = useState(false);

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
                setAarSign(data.section_one.aar_sign.is_sign)
                setRaSign(data.section_one.ra_sign.is_sign)
            }
        }

        fetchPtw()
    }, [id, navigate])

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
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.staff_id}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Date Created</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.date}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Zone</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.zone}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.location}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.description}</p>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <ApprovingButton status={aarSign} textName={"Approving Authority (AAR)"} onStatusChange={setAarSign} id ={ptw.id} jsonb={ptw.section_one} section={'section_one'} position={'aar_sign'}/>
                            <ApprovingButton status={raSign} textName={"Receiving Authority (RA)"} onStatusChange={setRaSign} id ={ptw.id} jsonb={ptw.section_one} section={'section_one'} position={'ra_sign'}/>
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
                                <ApprovingButton status={asSign} textName={"Authorized Supervisor (AS)"} onStatusChange={setAsSign} id ={ptw.id} section={ptw.section_one}/>
                            </div>
                    </div>

                    {/* <!-- Section 3 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 3</h2>
                        <div className="container mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
                            </div>
                            <h2 className="mt-4 text-sm font-medium text-orange-600 mb-4">If YES to any of the above question, equipment preparation copy must be attached at the back of the Control Room Permit Copy</h2>
                        </div>
                        <div className="mb-4">
                            <ApprovingButton status={aarSigns3} textName={"Approving Authority (AAR)"} onStatusChange={setAarSigns3}/>
                        </div>
                    </div>

                    {/* <!-- Section 4 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 4</h2>
                        <h2 className="text-sm font-medium text-orange-600 mb-4">We have completed Work Site Inspection as required and in out judgement the work site is safely prepared and may proceed</h2>
                        <div className="flex space-x-4 mb-4">
                            <ApprovingButton status={paSigns4} textName={"Permit Applicant (PA)"} onStatusChange={setPaSigns4} id ={ptw.id} section={ptw.section_one}/>
                            <ApprovingButton status={aarSigns4} textName={"Approving Authority (AAR)"} onStatusChange={setAarSigns4} id ={ptw.id} section={ptw.section_one}/>
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
                                                    <ApprovingButton textName={"Receiving Authority (AAR)"} />
                                                    <ApprovingButton textName={"Authorized Supervisor (AS)"} />
                                                    <ApprovingButton textName={"Approving Authority (AA)"} />
                                                    <ApprovingButton textName={"PTW Coordinator"} />
                                                </div>
                                            </fieldset>
                                            <fieldset className="border border-red-400 p-4 rounded">
                                                <legend className="text-sm font-bold">Section 6 - Permit Extension</legend>
                                                <div class="flex space-x-2">
                                                    <ApprovingButton textName={"Permit Applicant (PA)"} />
                                                    <ApprovingButton textName={"Authorized Supervisor (AS)"} />
                                                    <ApprovingButton textName={"Approving Authority (AA)"} />
                                                </div>
                                            </fieldset>
                                            <fieldset className="border border-emerald-400 p-4 rounded">
                                                <legend className="text-sm font-bold">Section 7 - Daily Handback & Suspension</legend>
                                                <div class="flex space-x-2">
                                                    <ApprovingButton textName={"Permit Applicant (PA)"} />
                                                    <ApprovingButton textName={"Authorized Supervisor (AS)"} />
                                                    <ApprovingButton textName={"Approving Authority (AA)"} />
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
