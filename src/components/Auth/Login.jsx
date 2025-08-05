import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
// import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import { setloading } from "@/redux/authSlice";
import { setUser } from "@/redux/authSlice";



function Login() {
  const [input,setinput]=useState({
    email:"",
    password: "",
    role: ""

});
const navigate=useNavigate();
const dispatch=useDispatch();
const {loading,user}=useSelector(store=>store.auth);


const changeEventhandler=(e)=>{

  setinput({...input,[e.target.name]:e.target.value});
}

const submithandler=async(e)=>{
  e.preventDefault();
  //console.log(input);

  try {
    
    dispatch(setloading(true));
    const res=await axios.post(`${USER_API_ENDPOINT}/login`,input, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include cookies in the request
  
    });
    if(res.data.success)
      { dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
  } catch (error) {
    console.log("Error in signup", error);
    alert("Error in Login, please try again later.");
  }
  finally {
    dispatch(setloading(false));
  }
  
  }
useEffect(() => {
if (user) {
  navigate("/");
}
}, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submithandler}
          className="w-1/2 border border-gray-300 rounded-md p-4 my-10 "
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2 mt-5">
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>

            <Input type="email"
            value={input.email}
            name="email"
            onChange={changeEventhandler}
            placeholder="abc@gmail.com"
            ></Input>
          </div>
          <div className="my-2 mt-5">
            <Label className="mb-2">Password</Label>

            <Input type="password"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
            placeholder="Password"></Input>
          </div>
          <div className="mt-5 flex items-center justify-between gap-6 flex-wrap">
            {/* Radio Buttons */}
            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setinput((prev) => ({ ...prev, role: value }))
              }
              className="flex items-center gap-5"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
     
          {
  loading 
    ? (
        <Button disabled className="my-2 w-full cursor-wait">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </Button>
      )
    : (
        <Button type="submit" className="my-2 w-full cursor-grab">
          Login
        </Button>
      )
}

        
         <span className="text-sm">Don't have an account? <Link to="/signup" className="text-sm text-blue-600 underline ">Sign up</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login;

// 4:01:31
