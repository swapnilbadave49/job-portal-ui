import React, { use } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobslice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
  "Mobile Developer",
  "DevOps Engineer",
];

function Category() {
  

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }
  return (
    <div className="w-full max-w-6xl mx-auto my-20">
      <h2 className="text-2xl font-bold mb-5 text-center">Browse by Category</h2>
      
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-2"
            >
              <Button onClick={()=>searchJobHandler(cat)}variant="outline" className="w-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Category;
