import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Filtercard from './Filtercard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'



function Jobs() {
  const { allJobs,searchedQuery} = useSelector((store) => store.job);

  const hasJobs = Array.isArray(allJobs) && allJobs.length > 0;
 []
 const [filteredJobs, setFilteredJobs] = useState(allJobs);

 useEffect(() => {
  if (searchedQuery) {
    const filtered = allJobs.filter((job) => 
      job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchedQuery.toLowerCase())
    );
    
    setFilteredJobs(filtered);
     }
     else
     {
       setFilteredJobs(allJobs);
     }
  
  
 },[ allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-20">
        <div className="flex gap-5">
          <div className=" sm:w-[25%] md:block md:w-[40%] lg:w-[20%] overflow-y-auto">
            <Filtercard />
          </div>

          {!hasJobs ? (
            <h1 className="text-2xl font-bold">No Jobs Found</h1>
          ) : (
            <div className="flex-1 min-h-screen w-full md:w-[70%] lg:w-[80%] overflow-y-auto">
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredJobs.map((job) => (
                   <motion.div 
                   initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                   key={job?._id}>
                          <Job  job={job}/>
                   </motion.div>
               
                ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs