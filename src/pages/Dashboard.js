import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import Modal from '../components/ModalSample'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [orderBy, setOrderBy] = useState('created_at')
    const [fetchError, setFetchError] = useState(null)
    const [ptws, setPtws] = useState(null)
    const [rowToDelete, setRowToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletePtwId, setDeletePtwId] = useState(null);
    const [filterWorkType, setFilterWorkType] = useState('Lifting');

    const handleDelete = async () => {
        console.log('Deleted' , deletePtwId);

        const { error } = await supabase
            .from('ptw')
            .delete()
            .eq('id', deletePtwId)

        if (error) {
            setFetchError('Could not delete')
        }

        setPtws(ptws.filter(ptw => ptw.id !== deletePtwId));
        setDeletePtwId(null);
        setIsModalOpen(false);
    };

    function CreatePTWButton() {
        return <Link to="/create"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create New PTW</button></Link>;
    }

    function convertTimestampz(timestampz) {
        // Convert it to a Date object
        let dateObject = new Date(timestampz);

        // Extract date, month, and year
        let date = dateObject.getDate(); // day of the month
        let month = dateObject.getMonth() + 1; // month (getMonth is zero-based, so +1 is necessary)
        let year = dateObject.getFullYear();
        console.log(month);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let formattedMonth = months[month-1]; // get month name

        // Format it to 'DD-MMM-YYYY'
        let formattedDate = `${date < 10 ? '0' + date : date}-${formattedMonth}-${year}`;

        return formattedDate
    }

    useEffect(() => {
        const fetchPtws = async () => {
            const { data, error } = await supabase
                .from('ptw')
                .select()
                .order(orderBy, {ascending: false})
            
            console.log(data);
            
            if (error) {
                console.log(error)
                setFetchError('Could not fetch the smoothies')
                setPtws(null)
            }
            if (data) {
                setPtws(data)
                setFetchError(null)
            }
        }
        fetchPtws()
    }, [orderBy, filterWorkType])

    return (
    <div className="flex h-screen">
        <div class="w-64 bg-white shadow-md">
            <div class="p-4 border-b">
                <span class="text-lg font-semibold">Project Name</span>
            </div>
            <nav class="text-gray-700">
                <a href="#" class="block py-2.5 px-4 hover:bg-gray-200">Dashboard</a>
                <a href="#" class="block py-2.5 px-4 hover:bg-gray-200">Analysis</a>
            </nav>
        </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onConfirm={handleDelete}>
                </Modal>
            )}
        {ptws && (
        <div className="flex-1 p-8">
            {fetchError && (<p>{fetchError}</p>)}

            <div className="flex justify-between items-center mb-6">
                <input type="text" placeholder="Search PTW" className="border p-2 rounded w-1/3"/>
                <CreatePTWButton />
            </div>
            <div className="flex mb-2">
                <input type="date" className="filter-input border p-2 rounded mr-2" placeholder="Filter by date"/>
                <select className="filter-input border p-2 rounded mr-2">
                    <option value="">Filter by status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
                <select className="filter-input border p-2 rounded">
                    <option value="">Filter by type</option>
                    <option value="Hot Work">Hot Work</option>
                    <option value="Cold Work">Cold Work</option>
                    <option value="Lifting">Lifting</option>
                </select>
                <button onClick={() => {setFilterWorkType('Cold Work')}}>test</button>
            </div>

            <div className="bg-white shadow-md rounded p-6">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">PTW ID</th>
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Close</th>
                            <th className="text-left py-3 px-4">Applicant</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ptws.map(ptw => (
                            <tr key={ptw.id}>
                                <td className="py-3 px-4">{ptw.id}</td>
                                <td className="py-3 px-4">{ptw.section_one.workType}</td>
                                <td className="py-3 px-4">{convertTimestampz(ptw.created_at)}</td>
                                <td>{ptw.status === 'open' ? <div className="py-3 px-4 relative inline-block select-none items-center whitespace-nowrap rounded-lg bg-emerald-100 py-1.5 px-3 font-sans text-xs font-bold uppercase text-emerald-700"><span class="">{ptw.status}</span></div> : <div class="py-3 px-4 relative inline-block select-none items-center whitespace-nowrap rounded-lg bg-rose-100 py-1.5 px-3 font-sans text-xs font-bold uppercase text-rose-700"><span class="">{ptw.status}</span></div>}</td>
                                {/* <td className={`py-3 px-4 ${ptw.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>{ptw.status}</td> */}
                                <td className="py-3 px-4">{ptw.close}</td>
                                <td className="py-3 px-4">{ptw.staff_id}</td>
                                <td className="py-3 px-4">
                                    <Link to={"/" + ptw.id}>
                                        <button className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 mr-2">View</button>
                                    </Link>
                                    <button className="bg-rose-500 text-white font-bold py-2 px-4 rounded hover:bg-rose-700" onClick={() => {setIsModalOpen(true); setDeletePtwId(ptw.id);}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <nav aria-label="Page navigation">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <a href="#" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">3</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        )}
    </div>
    )
}

export default Dashboard
