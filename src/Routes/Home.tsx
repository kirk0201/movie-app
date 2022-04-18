import { useQuery } from "react-query";
import styled from "styled-components";
import { INowPlaying, movieFetch } from "../api";
import { getImagePath } from "../utils";

function Home() {
  const { data, isLoading } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    movieFetch
  );
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgImage={getImagePath(data?.results[0].backdrop_path!)}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Banner = styled.div<{ bgImage: string }>`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 60px;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImage});
`;
const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 10px;
`;
const Overview = styled.p`
  font-size: 20px;
  width: 40%;
`;
export default Home;
