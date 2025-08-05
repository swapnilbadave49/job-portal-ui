import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

function SignUp() {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phonenumber: "", 
    password: "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();
  const {loading,user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFilehandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", String(input.phonenumber)); 
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setloading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error in signup", error);
      alert("Error in signup, please try again later.");
    } finally {
      dispatch(setloading(false));
    }
  };
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2 mt-2">
            <Label className="mb-2">Fullname</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventhandler}
              placeholder="username"
            />
          </div>
          <div className="my-2 mt-5">
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="my-2 mt-5">
            <Label className="mb-2">Phone Number</Label>
            <Input
              type="tel"
              value={input.phonenumber} // ✅ Fixed here
              name="phonenumber"         // ✅ Fixed here
              onChange={changeEventhandler}
              placeholder="+91"
            />
          </div>
          <div className="my-2 mt-5">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
              placeholder="Password"
            />
          </div>
          <div className="mt-5 flex items-center justify-between gap-6 flex-wrap">
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

            <div className="flex items-center gap-2">
              <Label htmlFor="profile">Profile</Label>
              <Input
                id="profile"
                type="file"
                accept="image/*"
                onChange={changeFilehandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className="my-2 w-full cursor-wait">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="my-2 w-full cursor-grab">
              SignUp
            </Button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-sm text-blue-600 underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
