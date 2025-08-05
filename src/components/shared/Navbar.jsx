import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; 


import { LogOut, User2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/constant";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";



const Navbar = () => {
  //const user = false;}
   const {user}=useSelector((store) => store.auth); 
   const dispatch=useDispatch();
   const navigate=useNavigate();
  const logouthandler=async()=>{
      try {
        const res=await axios.get(`${USER_API_ENDPOINT}/logout`, {

          withCredentials: true, // Include cookies in the request
      
        });

        if(res.data.success) {
          dispatch(setUser(null)); // Clear user data in Redux store
          toast.success(res.data.message); // Show success message
          navigate("/"); // Redirect to home page
     
        }
      } catch (error) {
        console.log("Error in logout", error);
      }


  }

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center justify-between gap-12">
          <ul className="flex items-center font-medium gap-5 cursor-pointer">
            {/* <li><Link>Home</Link></li>
          <li><Link>Jobs</Link></li>
          <li><Link>Browse</Link></li> */}
          {
            user && user.role==='recruiter'?(
              <>
              <li >
            <Link to="/admin/companies">Companies</Link>
            </li>
            <li>
             < Link to="/admin/jobs">Jobs</Link>
             </li>
              </>
            ):(<>
             <li >
            <Link to="/">Home</Link>
            </li>
            <li>
             < Link to="/jobs">Jobs</Link>
             </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
            </>)
          }
           
          </ul>
          {!user ? (
            <div className="flex items-center gap-4 ">
              <Link to="/login"><Button variant="outline" className="cursor-pointer">
                Login
              </Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">
                Sign Up
              </Button></Link>
              
            </div>
          ) : (
            <Popover className="cursor-pointer">
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex items-center space-x-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 mt-4 text-grey-600">

           {user && user.role === 'student' && (
            <div className="flex items-center ">
            <User2 />
            <Button variant="link" className="cursor-pointer">

              <Link to="/profile">
              view profile
              </Link>
            </Button>
          </div>
           )}


                  <div className="flex items-center ">
                    <LogOut />
                    <Button variant="link" className="cursor-pointer" 
                    onClick={logouthandler}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
