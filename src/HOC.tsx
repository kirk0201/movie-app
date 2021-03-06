import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { PathMatch, useMatch } from "react-router-dom";
import {
  getInfoFetch,
  getMovieFetch,
  IGetInfo,
  IGetMovie,
  INowPlaying,
} from "./api";

export function useFindBigInfoMatch(
  // infoMatch: PathMatch<"keyword" | "movieId"> | null,
  keyword: string,
  queryData?: INowPlaying
) {
  const bigInfoMatch = useMatch(`movies/${keyword}/:movieId`);

  const bigData =
    bigInfoMatch?.params.movieId &&
    queryData?.results.find(
      (movie) => movie.id + "" === bigInfoMatch.params.movieId
    );
  return { bigInfoMatch, bigData };
}
export function useGetInfo(id: string, keyword: string) {
  const { data: getInfo, isLoading: loading } = useQuery<IGetInfo | any>(
    [`${id}`, `${keyword}`],
    () => getInfoFetch(`${id}`)
  );
  if (!loading) {
    console.log("fetchgetInfo", getInfo);
    return getInfo[keyword];
  }
}

export function useGetMovie(id: string) {
  const { data: movieData, isLoading: loading } = useQuery<IGetMovie>(
    [`video${id}`],
    () => getMovieFetch(id)
  );
  if (!loading) {
    const movieArray: string[] = [];
    const BASE_URL = "https://www.youtube.com/watch/";

    movieData?.results.map((n) => movieArray.push(`${BASE_URL}${n.key}`));
    return movieArray;
  }
}
// import { useQuery } from "react-query";
// import { RecoilState, SetterOrUpdater, useRecoilState } from "recoil";
// import { INowPlaying, movieFetch } from "./api";
// import { motionLeave, popularIndexState, slideDirectionBack } from "./atoms";
// import { offset } from "./utils";

// export interface ISlideReturn {
//   index: number;
//   setIndex: SetterOrUpdater<number>;
//   leaving: boolean;
//   setLeaving: SetterOrUpdater<boolean>;
//   toggleLeaving: () => void;
//   back: boolean;
//   setBack: SetterOrUpdater<boolean>;
//   datas: INowPlaying | undefined;
// }
// export interface ISlideProps {
//   keyword: RecoilState<number>;
//   api_key: string;
//   key?: string;
// }
// export const useSliderState = (
//   slideprop: ISlideProps
// ): ISlideReturn | undefined => {
//   const [index, setIndex] = useRecoilState(slideprop.keyword);
//   const [leaving, setLeaving] = useRecoilState(motionLeave);
//   const toggleLeaving = () => setLeaving((prev) => !prev);
//   const [back, setBack] = useRecoilState(slideDirectionBack);

//   const { data: datas, isLoading } = useQuery<INowPlaying>(
//     ["movie", slideprop.api_key],
//     () => movieFetch(slideprop.api_key)
//   );
//   if (slideprop.key === "prev") {
//     if (leaving) return;
//     toggleLeaving();
//     setBack(true);
//     const totalMovies = datas?.results.length! - 1;
//     const maxIndex = Math.ceil(totalMovies / offset) - 1;

//     setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
//   } else if (slideprop.key === "next") {
//     if (leaving) return;
//     toggleLeaving();
//     setBack(false);
//     const totalMovies = datas?.results.length! - 1;
//     const maxIndex = Math.ceil(totalMovies / offset) - 1;
//     setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//   }
//   return {
//     index,
//     setIndex,
//     leaving,
//     setLeaving,
//     toggleLeaving,
//     back,
//     setBack,
//     datas,
//   };
// };
