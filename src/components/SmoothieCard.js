import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'

const SmoothieCard = ({ ptw, onDelete }) => {

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('ptw')
      .delete()
      .eq('id', ptw.id)
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      onDelete(ptw.id)
    }
  }

  return (
    <div className="smoothie-card">
      <h3>PTW Id : {ptw.id}</h3>
      <p>Applicant : {ptw.staff_id}</p>
      <div className="rating">{ptw.status}</div>
      <div className="buttons">
        <Link to={"/" + ptw.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default SmoothieCard
