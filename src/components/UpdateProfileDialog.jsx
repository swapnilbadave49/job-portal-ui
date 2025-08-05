import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label'

import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser, setloading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'


function UpdateProfileDialog({open,setOpen}) {

 const {user}=useSelector(store=>store.auth);
  const loading=useSelector(store=>store.auth.loading);


const [input, setInput] = useState({
  fullname: user?.fullname,
  email: user?.email,
  phonenumber: user?.phonenumber,
  bio: user?.profile?.bio || "",
  skills: user?.profile?.skills?.map(skill => skill) || [],
  file: null, // ✅ only new file, not previous resume object
});

const dispatch = useDispatch();

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === "skills") {
    setInput({ ...input, skills: value.split(',').map(skill => skill.trim()) });
  } else {
    setInput({ ...input, [name]: value });
  }
};

const changeFilehandler=(e)=>{
  setInput({...input,file:e.target.files?.[0]});
}

const sumbitHandler =async(e) => { 

  e.preventDefault();
  const formdata=new FormData();
  formdata.append("fullname", input.fullname);
  formdata.append("email", input.email);
  formdata.append("phonenumber", input.phonenumber);
  formdata.append("bio", input.bio);
  formdata.append("skills", input.skills.join(', '));
  if (input.file) {
    formdata.append("file", input.file);
  }
  for (let [key, value] of formdata.entries()) {
    console.log(key, value);
  }
  
  try {
    dispatch(setloading(true));
    const res=await axios.post(`${USER_API_ENDPOINT}/profile/update`,formdata,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.token}`,
        
      },
      withCredentials: true,
    })
    if(res.data.success)
      {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully!");
      }
  } catch (error) {
    console.log("Error updating profile:", error);
    toast.error("Failed to update profile. Please try again.");

  }finally{
    dispatch(setloading(false));
  }
  setOpen(false);
  console.log(input);
 }
 

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px] w-full p-6"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={sumbitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right col-span-1 font-medium text-sm"
                >
                  Name
                </Label>
                <input
                  type="text"
                  id="name"
                  name='fullname'
                  onChange={handleInputChange}
                  value={input.fullname}
                  placeholder="Enter your name"
                  className="col-span-3 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right col-span-1 font-medium text-sm"
                >
                  Email
                </Label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  onChange={handleInputChange}
                  value={input.email}
                  placeholder="Enter your email"
                  className="col-span-3 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="number"
                  className="text-right col-span-1 font-medium text-sm"
                >
                  Phone Number
                </Label>
                <input
                  type="text"
                  id="number"
                  name='phonenumber'
                  onChange={handleInputChange}
                  value={input.phonenumber}
                  placeholder="Enter your phone number" 
                  className="col-span-3 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="bio"
                  className="text-right col-span-1 font-medium text-sm"
                >
                  Bio
                </Label>
                <input
                  type="text"
                  id="bio"
                  name='bio'
                  onChange={handleInputChange}
                  value={input.bio}
                  placeholder="Enter your Bio"
                  className="col-span-3 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="skills"
                  className="text-right col-span-1 font-medium text-sm"
                >
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  name='skills'
                  onChange={handleInputChange}
                  value={input.skills.join(', ')}
                  placeholder="Enter your skills comma separated"
                  className="col-span-3 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="file"
                  className="text-right col-span-1 font-medium text-sm"
                >
                  Resume
                </Label>
                <input
                  type="file"
                  id="file"
                  name='file'
                  accept="application/pdf"
                  onChange={changeFilehandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <DialogFooter>
              {loading ? (
              <Button disabled className="my-2 w-full cursor-wait">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
              ) : (
              <Button type="submit" className="my-2 w-full cursor-grab">
               Update
              </Button>
              )
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog