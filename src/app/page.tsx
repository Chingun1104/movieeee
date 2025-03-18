'use client'


import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "./constants";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Film, Moon, Search } from "lucide-react";

export type MovieType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  detail: {
    desciption: string;

  }
  genre_ids_gen: Array<number>,



}
export type Actor = {
  givenName: string,
  movieName: string,
}

export default function Home() {
  const [movieList, setMovieList] = useState<MovieType[]>([]);

  const getMovies = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setMovieList(movies.data.results)
    // console.log(movies.data.results, 'here')
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex">
          <Film color="#4338CA" />
          <h1 className="text-indigo-700"> Movie Z</h1>
        </div>
        <div className="flex">
          <div className="border w-[36px] h-[36px] flex justify-center items-center rounded-sm p-2">
            <Search />
          </div>
          <div className="border w-[36px] h-[36px] flex justify-center items-center rounded-sm p-2">
            <Moon />
          </div>
        </div>
      </div>
      <Carousel className="">
        <CarouselContent>
          {movieList.slice(0, 3).map((movie) => {
            return (
              <CarouselItem key={movie.id} className="">

                
                <div className="">
                  <img className="" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                </div>
                <div className=" ">
                <h1>{movie.title}</h1>
                  <p>{movie.vote_average.toFixed(1)}/10</p>
                  

                  <p>{movie.overview}</p>

                </div>
              </CarouselItem>)


          })}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-10"/>
        <CarouselNext className="absolute top-1/2 right-10" />
      </Carousel>
      <Button>Watch Trailer</Button>

      <div>
        <h1>Upcoming</h1>

      </div>








    </div>
  );
}
