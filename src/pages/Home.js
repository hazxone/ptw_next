import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [ptws, setPtws] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setPtws(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('ptw')
        .select()
        .order(orderBy, {ascending: false})
      
        console.log(data);
        
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setPtws(null)
      }
      if (data) {
        setPtws(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()

  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {ptws && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('status')}>Title</button>
            <button onClick={() => setOrderBy('id')}>Rating</button>
          </div>
          <div className="flex h-screen">
            {ptws.map(ptw => (
              <SmoothieCard key={ptw.id} ptw={ptw} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
