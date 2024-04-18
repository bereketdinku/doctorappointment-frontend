import React from 'react'
import DoctorCard from './DoctorCard'
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../Loader/Loading'
import Error from '../Error/Error'
const DoctorsList = () => {
  const{data:doctors,loading,error}=useFetchData(`${BASE_URL}/api/doctor`)
  console.log(doctors)
  return (
    <>
    {loading && !error && <Loading/>}
    {error && !loading && <Error/>}
    {!loading && !error &&  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {doctors.map((doctor,index)=><DoctorCard doctor={doctor} key={index}/>)}
      
    </div> }
   
    </>
  )
}

export default DoctorsList
