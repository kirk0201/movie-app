import { useQuery } from "react-query";
import { RecoilState } from "recoil";
import {
  getCreditFetch,
  getGenreFetch,
  getInfoFetch,
  ICredit,
  IGenre,
  IGetInfo,
  INowPlaying,
  movieFetch,
} from "./api";

// slide에 표현할 영화 수
export const offset = 6;

export function getImagePath(id: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : "original"}${id}`;
}
export function useGetGenreColor(keyword: string) {
  switch (keyword) {
    case "스릴러":
      return "#ff6090";
    case "범죄":
      return "#b61827";
    case "애니메이션":
      return "#ffd54f";
    case "코미디":
      return "#dce775";
    case "범죄":
      return "#ff8a65";
    case "다큐멘터리":
      return "#ffb74d";
    case "드라마":
      return "#dce775";
    case "가족":
      return "#aed581";
    case "미스터리":
      return "#ba68c8";
    case "서부":
      return "#d7ccc8";
    case "액션":
      return "#82b1ff";
    case "모험":
      return "#4c8c4a";
    case "판타지":
      return "#9575cd";
    case "Kids":
      return "#ffeb3b";
    case "Reality":
      return "#b0bec5";
    case "News":
      return "#546e7a";
    case "Sci-Fi & Fantasy":
      return "#263238";
    case "Soap":
      return "#757575";
    case "Talk":
      return "#795548";
    case "War & Politics":
      return "#f4511e";
    default:
      return "white";
  }
}
export function useGetCredit(movieId: string) {
  const { data } = useQuery<ICredit | any>("credit", () =>
    getCreditFetch(movieId)
  );
  if (data) {
    console.log(
      "data",
      data?.cast.slice(0, 10).map((act: any) => act)
    );
    return data?.cast.slice(0, 10).map((act: any) => act);
  }
}
export function useGetInfo(id: string, keyword: string) {
  const { data: getInfo } = useQuery<IGetInfo | any>(
    ["movieInfo", "info"],
    () => getInfoFetch(`${id}`)
  );
  if (getInfo) {
    return getInfo[keyword];
  }
}

export function useGetGenreString(genreID: number[], keyword?: string) {
  const { data: genreData, isLoading: isGenre } = useQuery<IGenre[]>(
    "genre",
    getGenreFetch
  );
  const { data: movie, isLoading: isMovie } = useQuery<INowPlaying>(
    "movieinfo",
    () => movieFetch(keyword!)
  );
  const isLoading = !isGenre && !isMovie;
  const result: Array<string> = [];
  if (isLoading) {
    // const inMovieGenre = movie?.results[0].genre_ids;
    genreID?.map((id) =>
      genreData?.map((genre) =>
        genre.id === id ? result.push(genre.name) : null
      )
    );
  }
  return result;
}
