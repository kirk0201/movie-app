export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface INowPlaying {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const API_KEY = "25b03f239fa8301a3515814d1f51fe11";
const BASE_URL = "https://api.themoviedb.org/3/";
// Get Now playing => https://api.themoviedb.org/3/movie/now_playing?api_key=API_KEY&language=en-US&page=1
const GET_IMAGE = "https://image.tmdb.org/t/p/w500/ID";

// keyword: top_rated | now_playing | popular | latest | upcoming
export function movieFetch(keyword: string) {
  const QUICK_URL = `${BASE_URL}movie/${keyword}?api_key=${API_KEY}&language=ko-kr`;
  return fetch(QUICK_URL).then((res) => res.json());
}
