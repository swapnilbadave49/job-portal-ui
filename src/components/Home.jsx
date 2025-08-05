import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Category from './Category'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetalljobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const {user}=useSelector((store) => store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user?.role==='recruiter'){
      // window.location.href='/admin/companies';
      navigate('/admin/companies');
    }
  },[])
  return (
    <div>
      <Navbar/> 
      <HeroSection/>
      <Category/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home