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
import { Film, Mail, Moon, Search } from "lucide-react";
import Link from "next/link";

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
  original_title: string;



}
export type Actor = {
  givenName: string,
  movieName: string,
}

export default function Home() {
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [upComing, setUpComingList] = useState<MovieType[]>([])
  const [Popular, setPopularList] = useState<MovieType[]>([])
  const [Rated, setRatedList] =
    useState<MovieType[]>([])

  const gettopRated = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }

    );
    setRatedList(movies.data.results)
  };
  useEffect(() => {
    gettopRated();

  }, []);


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

  };
  useEffect(() => {
    getMovies();
  }, []);

  const getUpComing = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );
    setUpComingList(movies.data.results)
  };
  useEffect(() => {
    getUpComing();
  }, [])

  const getPopular = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );
    setPopularList(movies.data.results)


  };
  useEffect(() => {
    getPopular();
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex p-2">
          <Film color="#4338CA" />
          <h1 className="text-indigo-700 "> Movie Z</h1>
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
                  <Link href={`${movie.original_title}`}>
                    <img className="" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                  </Link>
                </div>
                <div className=" ">
                  <div className="flex justify-between p-2">
                    <div> <p> Now Playing :</p>
                      <h1>{movie.title}</h1>
                    </div>
                    <p><span className="text-yellow-500">★</span>{movie.vote_average.toFixed(1)}/10</p>
                  </div>




                  <div className="p-2">
                    <p className="">{movie.overview}</p>
                    <Button> ▷ Watch Trailer</Button>

                  </div>

                </div>
              </CarouselItem>)


          })}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-10" />
        <CarouselNext className="absolute top-1/2 right-10" />
      </Carousel>


      <div>
        <div className="flex justify-between p-2 ">
          <h2>Upcoming</h2>
          <div> See more → </div>


        </div>
        <div>
          <div className="grid grid-cols-2 grid-rows-5 gap-3">
            {upComing.slice(0, 10).map((movie) => {
              return (
                <Link key={movie.id} href={`${movie.original_title
                  }`}>
                  <div>
                    <div className="bg-slate-200 rounded-sm">
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                      <div>
                        <p><span className="text-yellow-500">★</span>{movie.vote_average.toFixed(1)}/10</p>
                        <h1>{movie.title}</h1>

                      </div>
                    </div>

                  </div>
                </Link>
              )
            })}

          </div>
        </div>

      </div>
      <div>
        <div className="flex justify-between p-2 ">
          <h2>Popular</h2>
          <div> See more → </div>


        </div>
        <div className="grid grid-cols-2 grid-rows-5 gap-3 ">
          {Popular.slice(0, 10).map((movie) => {
            return (
              <Link key={movie.id} href={`${movie.original_title
                }`}>
                <div>
                  <div className="bg-slate-200 rounded-sm">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    <div>
                      <p><span className="text-yellow-500">★</span>{movie.vote_average.toFixed(1)}/10</p>
                      <h1>{movie.title}</h1>

                    </div>
                  </div>

                </div>
              </Link>



            )
          })}

        </div>





      </div>
      <div>
        <div className="flex justify-between p-2 ">
          <h2>Top Rated</h2>
          <div> See more → </div>


        </div>
        <div className="grid grid-cols-2 grid-rows-5 gap-3">
          {Rated.slice(0, 10).map((movie) => {
            return (
              <Link key={movie.id} href={`${movie.original_title
                }`}>
                <div>
                  <div className="bg-slate-200 rounded-sm">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    <div>
                      <p><span className="text-yellow-500">★</span>{movie.vote_average.toFixed(1)}/10</p>
                      <h1>{movie.title}</h1>

                    </div>
                  </div>

                </div>
              </Link>



            )
          })}

        </div>
      </div>
      <div className="bg-indigo-700 w-screen h-[375px] text-white ">
        <h1 className="flex">
          <Film></Film>
          Movie Z
        </h1>
        <p> © 2024 Movie Z. All Rights Reserved.</p>
        <div>
          <div>
            <h1>
              Contact Information
            </h1>
            <div className="flex">
              <Mail />
              <h1>
                Email:
                <p>
                  support@movieZ.com
                </p>
              </h1>
            </div>

          </div>
          <div>

          </div>
        </div>

      </div>



    </div>
  );
}
