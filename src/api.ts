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

export interface IGetMovie {
  id: number;
  results: IGetMovieResult[];
}

export interface IGetMovieResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}
export interface IGenre {
  id: number;
  name: string;
}

export interface IGetInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}
export interface ICredit {
  cast: ICast[];
}
export interface ICast {
  name: string;
  character: string;
  profile_path: string;
  known_for_department: string;
  job: string;
}
const API_KEY = "25b03f239fa8301a3515814d1f51fe11";
const BASE_URL = "https://api.themoviedb.org/3/";
// Get Now playing => https://api.themoviedb.org/3/movie/now_playing?api_key=API_KEY&language=en-US&page=1
const GET_IMAGE = "https://image.tmdb.org/t/p/w500/ID";

// keyword: top_rated | now_playing | popular | latest | upcoming
// Fetch: 영화 정보
export function movieFetch(keyword: string) {
  const QUICK_URL = `${BASE_URL}movie/${keyword}?api_key=${API_KEY}&language=ko-kr`;
  return fetch(QUICK_URL).then((res) => res.json());
}
// Fetch: 영화 영상
export function getMovieFetch(movieId: string | number) {
  const QUICK_URL = `${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=ko-kr`;
  return fetch(QUICK_URL).then((res) => res.json());
}

// Fetch: 장르 정보
export function getGenreFetch() {
  const QUICK_URL = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=ko-kr`;
  return fetch(QUICK_URL)
    .then((res) => res.json())
    .then((res) => res.genres);
}

// Fetch: 상세 정보
// https://api.themoviedb.org/3/movie/634649?api_key=25b03f239fa8301a3515814d1f51fe11&language=ko-kr
export function getInfoFetch(movieId: string | number) {
  const QUICK_URL = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-kr`;
  return fetch(QUICK_URL).then((res) => res.json());
}

// Fetch: Credit 정보
export function getCreditFetch(movieId: string | number) {
  const QUICK_URL = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-kr`;
  return fetch(QUICK_URL).then((res) => res.json());
}
