import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import RadioButton from "../components/RadioSelection"
import ApprovingButton from "../components/ApprovingButton"

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
                <h1 className="text-2xl font-bold mb-4">PTW {ptw.id}</h1>

                {/* <div className="container mx-auto p-6"> */}
                    {/* <!-- Section 1 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 1</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Applicant</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.staff_id}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.workType}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Date Created</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.date}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">{ptw.section_one.location}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <p className="border rounded w-full py-2 px-3 text-gray-700">Lorem Ipsum</p>
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <ApprovingButton status={aarSign} textName={"Approving Authority (AAR)"} onStatusChange={setAarSign}/>
                            <ApprovingButton status={raSign} textName={"Receiving Authority (RA)"} onStatusChange={setRaSign}/>
                        </div>
                    </div>

                    {/* <!-- Section 2 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 2</h2>
                        <div className="lg:grid lg:grid-cols-4 gap-4 w-full">
                            <div className="w-full flex-1 shadow p-6 m-4 rounded bg-neutral-100">
                                <RadioButton selectedOption={gasTestOption} setSelectedOption={setGasTestOption} name="gasTest" title="Gas Test Required?" />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Open Gas Test</button>
                            </div>
                            
                            <div className="w-full flex-1 shadow p-6 m-4 rounded bg-neutral-100">
                                <RadioButton selectedOption={standbyPersonOption} setSelectedOption={setStandbyPersonOption} name="standbyPerson" title="Standby Person"/>
                            </div>
                        </div>
                        <div className="mb-4">
                            <ApprovingButton status={asSign} textName={"Authorized Supervisor (AS)"} onStatusChange={setAsSign}/>
                        </div>
                    </div>

                    {/* <!-- Section 3 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 3</h2>
                        <div className="flex items-center mb-4 justify-start flex-row">
                            <div className="w-1/4 shadow p-6 m-4 rounded bg-neutral-100">
                                <RadioButton selectedOption={doNotOperateBoard} setSelectedOption={setdoNotOperateBoard} name="doNotOperateBoard" title="Does Equipment" />
                            </div>
                            <div className="w-1/4 shadow p-6 m-4 rounded bg-neutral-100">
                                <RadioButton selectedOption={requireIsolation} setSelectedOption={setrequireIsolation} name="requireIsolation" title="Require Isolation"/>
                            </div>
                            <div className="w-1/4 shadow p-6 m-4 rounded bg-neutral-100">
                                <RadioButton selectedOption={safetyDeviceRelease} setSelectedOption={setsafetyDeviceRelease} name="safetyDeviceRelease" title="Protection Safety"/>
                            </div>
                            <div className="w-1/4 shadow p-6 m-4 rounded bg-neutral-100">
                                <RadioButton selectedOption={isolated} setSelectedOption={setisolated} name="isolated" title="Equipment Isolated"/>
                            </div>
                        </div>
                        <div className="mb-4">
                            <ApprovingButton status={aarSigns3} textName={"Approving Authority (AAR)"} onStatusChange={setAarSigns3}/>
                        </div>
                    </div>

                    {/* <!-- Section 4 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 4</h2>
                        <div className="flex space-x-4 mb-4">
                            <ApprovingButton status={paSigns4} textName={"Permit Applicant (PA)"} onStatusChange={setPaSigns4}/>
                            <ApprovingButton status={aarSigns4} textName={"Approving Authority (AAR)"} onStatusChange={setAarSigns4}/>
                        </div>
                    </div>

                    {/* <!-- Daily Approval --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-semibold mb-4">Daily Approval</h2>
                        <div className="mb-4">
                            {/* <!-- Daily Approval for 1 Jan 2024 --> */}
                            <div className="bg-slate-100 drop-shadow flex flex-col space-y-2 mb-6 p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">1 Jan 2024</span>
                                <div className="space-x-2">
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">RA</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AS</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AA</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">PTWC</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700"></span>
                                <div className="space-x-2">
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">PA</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AS</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AA</button>
                                </div>
                            </div>
                            </div>
                            {/* <!-- Daily Approval for 2 Jan 2024 --> */}
                            <div className="bg-emerald-100 drop-shadow flex flex-col space-y-2 mb-6 p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">2 Jan 2024</span>
                                <div className="space-x-2">
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">RA</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AS</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AA</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">PTWC</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700"></span>
                                <div className="space-x-2">
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">PA</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AS</button>
                                <button className="btn-toggle bg-green-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">AA</button>
                            </div>
                        </div>
                    </div>
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
