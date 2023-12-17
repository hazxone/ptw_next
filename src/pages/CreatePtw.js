import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import supabase from "../config/supabaseClient"

const CreatePtw = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const workTypes = ['Hot Work', 'Cold Work', 'Flammable Release', 'High Voltage', 'Welding & Burning', 'Lifting', 'Confined Space'];
  const workZones = [0,1,2]

  const fieldsets = [
    {
      name: 'mandatory',
      legend: 'Mandatory',
      items: ['helmet', 'glass', 'shoe', 'coverall']
    },
    {
      name: 'respiratory',
      legend: 'Respiratory',
      items: ['half_mask', 'full_face', 'airlines', 'SCBA', 'hood', 'dust_mask']
    },
    {
      name: 'eye_and_face',
      legend: 'Eye_and_Face',
      items: ['goggles', 'face_shield', 'welding']
    },
    {
      name: 'hearing',
      legend: 'Hearing',
      items: ['ear_plug', 'ear_muff']
    },
    {
      name: 'fall',
      legend: 'Fall',
      items: ['full_body_harness', 'full_arrest']
    },
    {
      name: 'body',
      legend: 'Body',
      items: ['chemical_suit', 'chemical_boot']
    },
    {
      name: 'hand_gloves',
      legend: 'Hand_Gloves',
      items: ['cotton', 'leather']
    },
    {
      name: 'personal_equipment',
      legend: 'Personal_Equipment',
      items: ['H2S', 'O2']
    },
    {
      name: 'others',
      legend: 'Others',
      items: ['life_jacket', 'life_vest']
    },
    // Add more fieldsets here as needed
];

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)
  const [workType, setworkType] = useState('');
  const [zoneType, setzoneType] = useState('');
  const [date, setDate] = useState(getDate());
  const [location, setLocation] = useState('WHP')
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setLocation('WHP');
    setDescription('');
    setDate(getDate());
    setzoneType('');
    setworkType('');
    setCheckedItems({
      mandatory: {},
      respiratory: {},
      eye_and_face: {},
      hearing: {},
      fall: {},
      body: {},
      hand_gloves: {},
      personal_equipment: {},
      others: {}
    });
  };

  function CancelButton() {
    return <Link to="/dashboard"><button className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button></Link>;
  }

  function getDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
  
    return yyyy + '-' + mm + '-' + dd;
  }

  const handleTypeButtonClick = (type) => {
    setworkType(type);
  };

  const handleZoneButtonClick = (type) => {
    setzoneType(type);
  };

  const [checkedItems, setCheckedItems] = useState({
    mandatory: {},
    respiratory: {},
    eye_and_face: {},
    hearing: {},
    fall: {},
    body: {},
    hand_gloves: {},
    personal_equipment: {},
    others: {}
  });

  const handleCheckboxChange = (event, fieldsetName) => {
      const item = event.target.value;
      const isChecked = event.target.checked;
      setCheckedItems(prevState => ({
        ...prevState,
        [fieldsetName]: { ...prevState[fieldsetName], [item]: isChecked }
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!workType) {
      console.log("no worktype")
      setFormError('Please fill in all the fields correctly.')
      return
    }

    // create an empty JSON object for 'section_one'
    let section_one = {};

    // Set form data 
    section_one.workType = workType;
    section_one.zone = zoneType;
    section_one.date = date;
    section_one.location = location;
    section_one.description = description;

    let aar_sign = {}
    aar_sign.is_sign = false;
    aar_sign.sign_date = "";

    let ra_sign = {}
    ra_sign.is_sign = false;
    ra_sign.sign_date = "";

    section_one.aar_sign = aar_sign;
    section_one.ra_sign = ra_sign;

    let finalState = { ...checkedItems };
    finalState = Object.entries(finalState)
      .filter(([key, value]) => Object.keys(value).length !== 0)
      .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

    section_one.ppe = finalState;

    console.log(section_one)

    const getDateInFuture = (days) => {
      let date = new Date();
      date.setDate(date.getDate() + days);
      return date.toISOString().split('T')[0];  // returns date in 'yyyy-mm-dd' format
    };

    let dateArray = [getDateInFuture(0), getDateInFuture(1), getDateInFuture(2)];

    const constructSignObject = () => ({
      is_sign: false,
      sign_date: ""
    });
    
    const constructSection = (signs) => {
      const section = {};
      for (let sign of signs) {
        section[`${sign}_sign`] = constructSignObject();
      }
      return section;
    };
    
    let daily_approval_items = dateArray.map(date => {
      return {
        date: date,
        daily_approval_section_five: constructSection(['aar', 'as', 'aa', 'ptwc']),
        daily_approval_section_six: constructSection(['aar', 'as', 'aa']),
        daily_approval_section_seven: constructSection(['aar', 'as', 'aa', 'ptwc']),
      }
    });

    const { data, error } = await supabase
      .from('ptw')
      .insert([
          { 
              staff_id: '1000',  // It's already login user details
              section_one: section_one,
              project_name: 'Gumusut',
              status: 'open',
              daily_approval: daily_approval_items
          },
      ])

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }

    if (data) {
      setFormError(null)
      navigate('/dashboard')
    }
  }

  // useEffect(() => {
  //   const fetchSmoothie = async () => {
  //     const { data, error } = await supabase
  //       .from('ptw')
  //       .select()
  //       .eq('id', id)
  //       .single()

  //     if (error) {
  //       navigate('/', { replace: true })
  //     }
  //     if (data) {
  //       setTitle(data.id)
  //       setMethod(data.status)
  //       setRating(data.staff_id)
  //     }
  //   }

  //   fetchSmoothie()
  // }, [id, navigate])

  return (
      <div className="flex h-screen">
          <div class="w-64 bg-white shadow-md">
              <div class="p-4 border-b">
                  <span class="text-lg font-semibold">Project Name</span>
              </div>
              <nav class="text-gray-700">
                <Link to="/dashboard" className="block py-2.5 px-4 hover:bg-gray-200">Dashboard</Link>
              </nav>
          </div>
          <div className="flex-1 p-8">
              <h1 className="font-bold text-2xl mb-6">Create New PTW</h1>
              <form onSubmit={handleSubmit} id="ptwForm" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  {formError && <p className="error">{formError}</p>}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Staff ID
                    </label>
                    <input className="specific-date-width shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="applicant" type="text" value="" readOnly />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Type
                    </label>

                    <div className="radio-group flex space-x-2 mb-4">
                      {workTypes.map((type, index) => (
                          <button 
                              key={index}
                              type="button" 
                              name="typeInput" 
                              className={`px-4 py-2 rounded border focus:outline-none ${workType === type ? 'active' : ''}`} 
                              onClick={() => handleTypeButtonClick(type)}
                          >
                              {type}
                          </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">

                      {fieldsets.map((fieldset, fieldsetIndex) => (
                        <fieldset key={fieldsetIndex} className="border p-2">
                            <legend className="text-sm font-bold">{fieldset.legend}</legend>
                            <div className="flex flex-col">
                                {fieldset.items.map((item, itemIndex) => (
                                    <label key={itemIndex}>
                                        <input
                                            type="checkbox"
                                            name={fieldset.name}
                                            value={item}
                                            checked={!!checkedItems[fieldset.name][item]}
                                            onChange={(event) => handleCheckboxChange(event, fieldset.name)}
                                        />
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                      ))}
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                          Date
                      </label>
                      <input className="specific-date-width shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date" 
                        type="date" 
                        value={date}
                        onChange={e => setDate(e.target.value)}
                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                          Zone
                      </label>
                      <div className="radio-group flex space-x-2 mb-4">
                          {workZones.map((type, index) => (
                              <button 
                                  key={index}
                                  type="button" 
                                  name="typeInput" 
                                  className={`px-4 py-2 rounded border focus:outline-none ${zoneType === type ? 'active' : ''}`} 
                                  onClick={() => handleZoneButtonClick(type)}
                              >
                                  {type}
                              </button>
                          ))}
                      </div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                          Location
                      </label>
                      <select className="specific-date-width shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="location"
                        value={location}
                        onChange= {e => setLocation(e.target.value)}>
                          <option value="WHP">WHP</option>
                          <option value="Engine Room">Engine Room</option>
                          <option value="Topsides">Topsides</option>
                          <option value="Pump Room">Pump Room</option>
                          <option value="Main Deck">Main Deck</option>
                          <option value="Accomodation Room">Accomodation Room</option>
                      </select>
                  </div>
                  <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                          Description
                      </label>
                      <textarea className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="description" rows="3"
                        value={description}
                        onChange= {e => setDescription(e.target.value)}
                        >
                      </textarea>
                  </div>
                  <div className="flex items-center justify-start">
                      <input type="hidden" id="typeButton" name="type" />
                      <input type="hidden" id="zoneButton" name="zone" />
                      <button className="mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                          Create
                      </button>
                      <CancelButton />
                      {/* <button onClick={() => router.push('/')} className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                          Cancel
                      </button> */}
                      <button className="mr-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={resetForm}>
                          Reset
                      </button>
                  </div>
              </form>
          </div>
      </div>









    /* <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div> */
  )
}

export default CreatePtw