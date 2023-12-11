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
                    <a href="#" className="block py-2.5 px-4 hover:bg-gray-200">Dashboard</a>
                    <a href="#" className="block py-2.5 px-4 hover:bg-gray-200">Analysis</a>
                </nav>
            </div>
            {ptw && (
            <div className="flex-1 p-8">
                <Link to="/dashboard"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Dashboard</button></Link>
                <h1 className="text-3xl font-bold mb-4">Gumusut</h1>

                {/* <div class="container mx-auto p-6"> */}
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
                            <ApprovingButton status={aarSign} textName={"Approving Authority (AA)"} onStatusChange={setAarSign}/>
                            <ApprovingButton status={raSign} textName={"Receiving Authority (RA)"} onStatusChange={setRaSign}/>
                        </div>
                    </div>

                    {/* <!-- Section 2 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 2</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Gas Test Required?</label>
                            <div className="flex items-center mb-4 justify-start flex-row">
                                <RadioButton selectedOption={gasTestOption} setSelectedOption={setGasTestOption} name="gasTest" />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Open Gas Test</button>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Standby Person</label>
                            <div className="flex items-center mb-4">
                                <RadioButton selectedOption={standbyPersonOption} setSelectedOption={setStandbyPersonOption} name="standbyPerson" />
                            </div>
                            <ApprovingButton status={asSign} textName={"Authorized Supervisor (AS)"} onStatusChange={setAsSign}/>
                        </div>
                    </div>

                    {/* <!-- Section 3 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 3</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Does this equipment</label>
                            <div className="flex items-center mb-4">
                            {/* <input id="equipmentYes" name="equipment" type="radio" className="form-radio h-5 w-5 text-gray-600"><label for="equipmentYes" className="ml-2 text-gray-700">Yes</label></input>
                            <input id="equipmentNo" name="equipment" type="radio" className="form-radio h-5 w-5 text-gray-600 ml-6"><label for="equipmentNo" className="ml-2 text-gray-700">No</label></input> */}
                            </div>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">AAR</button>
                        </div>
                    </div>

                    {/* <!-- Section 4 --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Section 4</h2>
                        <div className="flex space-x-4 mb-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">PA</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">AAR</button>
                        </div>
                    </div>

                    {/* <!-- Daily Approval --> */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-semibold mb-4">Daily Approval</h2>
                        <div className="mb-4">
                            {/* <!-- Daily Approval for 1 Jan 2024 --> */}
                            <div className="bg-slate-100 drop-shadow-lg flex flex-col space-y-2 mb-6 p-4">
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
                            <div className="bg-emerald-100 drop-shadow-lg flex flex-col space-y-2 mb-6 p-4">
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
