import React, { useEffect, useState } from 'react'
import { doctors } from "../../assets/data/doctors"
import DoctorCard from '../../components/Doctors/DoctorCard'
import Testimonial from '../../components/Testimonial/Testimonial'
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
const Doctors = () => {
  const[query,setQuery]=useState('')
  
  const[debounceQuery,setDebounceQuery]=useState('')

  const handleSearch=e=>{
    setQuery(query.trim())
  }
  useEffect(()=>{
const timeout=setTimeout(()=>{
  setDebounceQuery(query)
},700)
return ()=>clearTimeout()
  },[])
  const{data:doctors,loading,error}=useFetchData(`${BASE_URL}/api/doctor?query=${debounceQuery}`)
  
  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className='container text-center'>
          <h2 className='heading '>Find a Doctor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input type='search'  value={query} onChange={e=>setQuery(e.target.value)} className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor ' placeholder='Search' />
            <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Search</button>

          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          {loading && !error && <Loading/>}
          {error && !loading && <Error errorMessage={error}/>}
          {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
              doctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))
            }

          </div>}
          
        </div>
      </section>
      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>What our patient say</h2>
            <p className='text_para text-center'>
              World class for every one.our health system offers unmatched,expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  )
}

export default Doctors
