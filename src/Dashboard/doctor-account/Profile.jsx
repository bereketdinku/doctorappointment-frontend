import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai"
import uploadImageToCloudinary from '../../utils/uploadCloudinary'
import { BASE_URL, token } from '../../config'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
const Profile = ({doctorData}) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        phone: '',
        bio: '',
        gender: '',
        photo: '',
        about: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [{ startingDate: '', endingDate: '', degree: '', university: '' }],
        experiences: [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
        timeSlots: [{ day: '', endingDate: '', startingTime: '', endingTime: '' }]
    })
    useEffect(()=>{
setFormData({
    name: doctorData?.name,
    email: doctorData?.email,
    password:'',
    phone: doctorData?.phone,
    bio: doctorData?.bio,
    gender: doctorData?.gender,
    photo: doctorData?.photo,
    about: doctorData?.about,
    specialization: doctorData?.specialization,
    ticketPrice:doctorData?.name,
    qualifications: doctorData?.qualifications,
    experiences:doctorData?.experiences,
    timeSlots: doctorData?.timeSlots
})
    },[doctorData])
    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0]
        const data = await uploadImageToCloudinary(file)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({ ...formData, photo: data.url })
    }
    const updateProfileHandler =async e => {
e.preventDefault()
setLoading(true)
try {
    const res=await fetch(`${BASE_URL}/api/doctor/${doctorData._id}`,{
        method:'put',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(formData)
    })
    const result=await res.json()
    if(!res.ok){
        throw new Error()
    }
    setLoading(false)
    toast.success(result.message)
   
} catch (error) {
    toast.error(error.message)
}
    }
    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }
    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: prevFormData[key].filter((_, i) => i !== index) }))
    }
    const addQualification = e => {
        e.preventDefault()
        addItem("qualifications", {
            startingDate: '',
            endingDate: '',
            degree: "",
            university: ""
        })
    }
    const deleteQualificationChange = (e, index) => {
        e.preventDefault()
        deleteItem('qualifications', index)
    }
    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]
            updateItems[index][name] = value
            return {
                ...prevFormData,
                [key]: updateItems
            }
        })
    }
    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc('qualifications', index, event)
    }
    const addExperience = e => {
        e.preventDefault()
        addItem("experiences", {
            startingDate: '',
            endingDate: '',
            position: "",
            hospital: ""
        })
    }
    const deleteExperienceChange = (e, index) => {
        e.preventDefault()
        deleteItem('experiences', index)
    }
    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc('experiences', index, event)
    }
    const addTimeSlot = e => {
        e.preventDefault()
        addItem("timeSlots", {
            day: '',
            startingTime: '',
            endingTime:''

        })
    }
    const deleteTimeSlotChange = (e, index) => {
        e.preventDefault()
        deleteItem('timeSlots', index)
    }
    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChangeFunc('timeSlots', index, event)
    }
    return (
        <div>
            <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
                Profile Information
            </h2>
            <form action=''>
                <div className='mb-5'>
                    <p className='form_label'>Name</p>
                    <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Full Name' className='form_input' />
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Email</p>
                    <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Email' className='form_input' aria-readonly readOnly disabled="true" />
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Phone</p>
                    <input type='number' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone number' className='form_input' />
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Bio</p>
                    <input type='text' name='bio' value={formData.bio} onChange={handleInputChange} placeholder='Bio' className='form_input' maxLength={100} />
                </div>
                <div className='mb-5'>
                    <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                        <div>
                            <p className='form_label'>Gender</p>
                            <select className='form_input' name='gender' value={formData.gender} onChange={handleInputChange}>
                                <option value={''}>Select</option>
                                <option value={'male'}>Male</option>
                                <option value={'female'}>Female</option>

                            </select>
                        </div>
                        <div>
                            <p className='form_label'>Specialization</p>
                            <select className='form_input' name='specialization' value={formData.specialization} onChange={handleInputChange}>
                                <option value={''}>Select</option>
                                <option value={'surgeon'}>Surgeon</option>
                                <option value={'neurologist'}>Neurologist</option>
                                <option value={'dermatologist'}>Dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className='form_label'>Ticket Price</p>
                            <input type='number' placeholder='100' onChange={handleInputChange} name='ticketPrice' value={formData.ticketPrice} className='form_input' />
                        </div>

                    </div>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Qualifications</p>
                    {formData.qualifications.map((item, index) => <div key={index}>
                        <div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form_label'>Starting Date</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type='date' name='startingDate' className='form_input' value={formData.startingDate} />
                                </div>

                                <div>
                                    <p className='form_label'>Ending Date</p>
                                    <input type='date' onChange={e => handleQualificationChange(e, index)} name='endingDate' className='form_input' value={formData.endingDate} />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form_label'>Degree</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type='text' name='degree' value={item.degree} className='form_input' />
                                </div>
                                <div>
                                    <p className='form_label'>University</p>
                                    <input onChange={e => handleQualificationChange(e, index)} type='text' name='university' value={item.university} className='form_input' />

                                </div>
                            </div>
                            <button onClick={e => deleteQualificationChange(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                                <AiOutlineDelete /></button>
                        </div>
                    </div>)}
                    <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add Qualification
                    </button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Experience</p>
                    {formData.experiences.map((item, index) => <div key={index}>
                        <div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form_label'>Starting Date</p>
                                    <input onChange={e => handleExperienceChange(e, index)} type='date' name='startingDate' className='form_input' value={formData.startingDate} />
                                </div>

                                <div>
                                    <p className='form_label'>Ending Date</p>
                                    <input onChange={e => handleExperienceChange(e, index)} type='date' name='endingDate' className='form_input' value={formData.endingDate} />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form_label'>Position</p>
                                    <input onChange={e => handleExperienceChange(e, index)} type='text' name='position' value={item.position} className='form_input' />
                                </div>
                                <div>
                                    <p className='form_label'>Hospital</p>
                                    <input onChange={e => handleExperienceChange(e, index)} type='text' name='hospital' value={item.hospital} className='form_input' />

                                </div>
                            </div>
                            <button onClick={e => deleteExperienceChange(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                                <AiOutlineDelete /></button>
                        </div>
                    </div>)}
                    <button onClick={addExperience} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add Experience
                    </button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Time Slots</p>
                    {formData.timeSlots.map((item, index) => <div key={index}>
                        <div>
                            <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                                <div>
                                    <p className='form_label'>Day</p>
                                    <select onChange={e=>handleTimeSlotChange(e,index)} name='day' value={item.day} className='form_input py-3.5'>
                                        <option value={''}>Select</option>
                                        <option value={'saturday'}>Saturday</option>
                                        <option value={'sunday'}>Sunday</option>
                                        <option value={'monday'}>Monday</option>
                                        <option value={'tuesday'}>Tuesday</option>
                                        <option value={'wednesday'}>Wednesday</option>
                                        <option value={'thursday'}>Thursday</option>
                                        <option value={'friday'}>Friday</option>
                                    </select>
                                </div>

                                <div>
                                    <p className='form_label'>Staring Time </p>
                                    <input type='time' name='startingTime' className='form_input' value={item.startingTime} onChange={e=>handleTimeSlotChange(e,index)} />
                                </div>
                                <div>
                                    <p className='form_label'>Ending Time</p>
                                    <input type='time' name='endingTime' className='form_input' value={item.endingTime}  onChange={e=>handleTimeSlotChange(e,index)}/>
                                </div>
                                <div className='flex items-center'>
                                    <button onClick={e => deleteTimeSlotChange(e,index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer'>
                                        <AiOutlineDelete /></button></div>
                            </div>

                        </div>
                    </div>)}
                    <button onClick={addTimeSlot} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                        Add TimeSlot
                    </button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>About</p>
                    <textarea name='about' rows={5} value={formData.about} placeholder='write about you' onChange={handleInputChange} className='form_input'></textarea>
                </div>
                <div className='mb-5 flex items-center gap-3'>
                    {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                        <img src={formData.photo} alt='' className='w-full rounded-full' />
                    </figure>}
                    <div className='relative w-[130px] h-[50px]'>
                        <input type='file' name='photo' onChange={handleFileInputChange} id='customFile' accept='.jpg,.png' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />

                        <label htmlFor='customFile' className='absolute top-0 left-0 w-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo</label>
                    </div>
                </div>
                <div className='mt-7'>
                    <button type='submit' className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg' onClick={updateProfileHandler}>{loading?<HashLoader/>:"Update Profile"}</button>
                </div>
            </form>
        </div>
    )
}

export default Profile
