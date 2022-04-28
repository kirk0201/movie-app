import ReactPlayer from "react-player";
import styled from "styled-components";
import { IMovie } from "../../api";
import { useGetMovie } from "../../HOC";
import GenreBox from "./GenreBox";
interface IMovieProps {
  id: string;
  data: IMovie;
  long: boolean;
  movieId: string | undefined;
}
function MovieDetail({ data, long, movieId }: IMovieProps) {
  const movie = useGetMovie(movieId + "");

  return (
    <>
      <Row>
        <GenreBox genreId={data.genre_ids} />
        <BigOverview isLongTitle={long}>{data.overview}</BigOverview>
        <Video>예고편</Video>
        <Box>
          <ReactPlayer
            url={movie}
            width="100%"
            height="50vh"
            style={{
              position: "relative",
              zIndex: 10,
            }}
            playing={true}
            muted={true}
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 1,
                },
              },
            }}
          />
        </Box>
      </Row>
    </>
  );
}
export default MovieDetail;
const Row = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  top: -50px;
  overflow-y: scroll;
`;
const BigOverview = styled.div<{ isLongTitle: boolean }>`
  /* top: ${(props) => (props.isLongTitle ? "-80px" : "-50px")}; */
  padding: 0 20px;
`;

const Video = styled.div`
  margin-top: 30px;
  font-size: 40px;
  font-weight: 700;
  padding: 20px 20px;
  border-top-width: 1px;
  border-color: white;
  border-style: solid;
`;
const Box = styled.div`
  height: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;
