import React, { useContext, useRef } from 'react'
import {BiMenu} from "react-icons/bi"
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Tabs = ({tab,setTab}) => {
  const menuRef=useRef(null)
    const { dispatch } = useContext(authContext)
    const navigate=useNavigate()
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/')
    }
    const toggleMenu=()=>menuRef.current.classList.toggle('show_menu')
  return (
    <div>
        <span className='lg:hidden' onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer'/>
        </span>
      <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
        <button onClick={()=>setTab('overview')} className={`${tab==='overview'?'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md `}>
            Overview
        </button>
        <button onClick={()=>setTab('appointments')} className={`${tab==='appointments'?'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md `}>
            Appointments
        </button>
        <button onClick={()=>setTab('profile')} className={`${tab==='profile'?'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md `}>
            Profile
        </button>
        <div className='mt-[50px] md:mt-[100px]'>
                            <button className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white' onClick={handleLogout}>Logout</button>
                            <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete account</button>
                        </div>
      </div>
    </div>
  )
}

export default Tabs
