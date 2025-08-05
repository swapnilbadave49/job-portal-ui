import React from 'react'
import JobCard from './JobCard'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const hasJobs = Array.isArray(allJobs) && allJobs.length > 0;

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top </span>Job Openings
      </h1>

      <div className='grid grid-cols-3 gap-4 my-5'>
        {!hasJobs ? (
          <span>No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
