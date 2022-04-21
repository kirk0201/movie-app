import { useMatch } from "react-router-dom";
import { INowPlaying } from "./api";

export function useFindBigInfoMatch(keyword: string, data?: INowPlaying) {
  const bigInfo = useMatch(`movies/:${keyword}/:movieId`);

  const bigData =
    bigInfo?.params.movieId &&
    data?.results.find((movie) => movie.id + "" === bigInfo.params.movieId);
  return { bigInfo };
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
