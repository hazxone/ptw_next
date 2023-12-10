import supabase from "../config/supabaseClient"

const DeleteModal = ({ onConfirm, onCancel }) => {

    return (
        <div id="deleteModal" className="modal">
            <div className="modal-content">
                <p className="text-center text-lg font-semibold mb-4">Are you sure?</p>
                <div className="flex justify-center">
                    <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mr-2 confirm-delete" onClick={onConfirm}>Yes</button>
                    <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    )

}

export default DeleteModal