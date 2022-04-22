import { useQuery } from "react-query";
import { RecoilState } from "recoil";
import { getGenre, IGenre, INowPlaying, movieFetch } from "./api";

// slide에 표현할 영화 수
export const offset = 6;

export function getImagePath(id: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : "original"}/${id}`;
}

export function useGetGenreString(keyword: string) {
  const { data: genreData, isLoading: isGenre } = useQuery<IGenre[]>(
    "genre",
    getGenre
  );
  const { data: movie, isLoading: isMovie } = useQuery<INowPlaying>(
    "movieinfo",
    () => movieFetch(keyword)
  );
  console.log(genreData, movie);
  const isLoading = !isGenre && !isMovie;
  const result: Array<string> = [];
  if (isLoading) {
    const inMovieGenre = movie?.results[0].genre_ids;
    inMovieGenre?.map((id) =>
      genreData?.map((genre) =>
        genre.id === id ? result.push(genre.name) : null
      )
    );
  }
  return result;
}
