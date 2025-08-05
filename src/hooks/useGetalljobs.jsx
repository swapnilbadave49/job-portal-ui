import axios from "axios";
import { use, useEffect, useState } from "react";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobslice";
import { useSelector } from "react-redux";

const useGetAllJobs = () => {

  const dispatch=useDispatch();
  const {searchedQuery} = useSelector((store) => store.job);
     useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,{withCredentials: true});
                if(res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();}, []);
}

export default useGetAllJobs;