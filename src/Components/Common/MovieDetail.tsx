import styled from "styled-components";
import { IMovie } from "../../api";
import GenreBox from "./GenreBox";
interface IMovieProps {
  id: string;
  data: IMovie;
  long: boolean;
}
function MovieDetail({ data, long }: IMovieProps) {
  return (
    <BigOverview isLongTitle={long}>
      <GenreBox genreId={data.genre_ids} />
      {data.overview}
    </BigOverview>
  );
}
export default MovieDetail;

const BigOverview = styled.div<{ isLongTitle: boolean }>`
  position: relative;
  top: ${(props) => (props.isLongTitle ? "-80px" : "-50px")};
  padding: 0 20px;
`;
