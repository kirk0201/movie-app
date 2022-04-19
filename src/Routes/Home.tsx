import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { INowPlaying, movieFetch } from "../api";
import { getImagePath } from "../utils";

function Home() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { data, isLoading } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    movieFetch
  );

  const offset = 6;
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const sliderDataHandler = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={sliderDataHandler}
            bgImage={getImagePath(data?.results[0].backdrop_path!)}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence onExitComplete={toggleLeaving}>
              <Row
                variants={sliderVariant}
                initial="normal"
                animate="action"
                exit="exit"
                key={sliderIndex}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * sliderIndex, offset * sliderIndex + offset)
                  .map((movie) => {
                    return (
                      <Movie
                        key={movie.id}
                        variants={movieVariant}
                        initial="initial"
                        whileHover="hover"
                        bgimage={getImagePath(movie.backdrop_path)}
                        transition={{ type: "tween" }}
                      />
                    );
                  })}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
const sliderVariant = {
  normal: {
    x: window.innerWidth + 10,
  },
  action: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 10,
  },
};
const movieVariant = {
  initial: {
    scale: 1,
  },
  hover: {
    y: -80,
    scale: 1.3,
    transition: {
      type: "tween",
      delay: 0.3,
    },
  },
};
const Wrapper = styled.div`
  overflow-x: hidden;
`;
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
const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0 50px;
`;
const Movie = styled(motion.div)<{ bgimage: string }>`
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center;
  height: 300px;
  &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  }
`;
export default Home;
