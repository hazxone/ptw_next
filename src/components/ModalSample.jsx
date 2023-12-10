

const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this?</h2>
        <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onConfirm}>Yes</button>
        <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>No</button>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          padding: 50px;
        }
        .modal button {
            margin: 10px;
        }
        .modal > div {
          background: white;
          padding: 20px;
        }
      `}</style>
      </div>
    </div>
  );
}

export default Modal;