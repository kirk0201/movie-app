import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { INowPlaying, movieFetch } from "../api";
import { getImagePath } from "../utils";

function Home() {
  const offset = 6;
  const navigate = useNavigate();
  const bigInfoMatch = useMatch("movies/:movieId");
  const { scrollY } = useViewportScroll();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hiddenContent, setContent] = useState(false);
  const [back, setBack] = useState(false);
  const { data, isLoading } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    movieFetch
  );
  const bigInfoData =
    bigInfoMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigInfoMatch.params.movieId
    );
  const overlayClickHandler = () => {
    navigate("/");
  };
  const movieClickHandler = (movieId: string) => {
    navigate(`/movies/${movieId}`);
    console.log("match", bigInfoMatch);
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const sliderNextHandler = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const sliderPrevHandler = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const splitOverVIewHandler = () => {
    const overView = data?.results[0].overview.replace("...", ".");
    const newOverView = overView?.split(".");
    const showView = newOverView?.slice(0, 2);
    const hidden = newOverView?.slice(2);
    if (data) {
      return (
        <Overview>
          {showView?.map((str) => (
            <ShowContent key={str}>{str}.</ShowContent>
          ))}
          {hiddenContent
            ? hidden?.map((str) => <ShowContent key={str}>{str}.</ShowContent>)
            : null}
          <HiddenBtn
            variants={hiddenBtnVariant}
            initial="normal"
            animate="action"
            hiddenprop={Boolean(hiddenContent) + ""}
            onClick={() => setContent((prev) => !prev)}
          ></HiddenBtn>
        </Overview>
      );
    }
  };
  console.log(data);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgImage={getImagePath(data?.results[0].backdrop_path!)}>
            <Title>{data?.results[0].title}</Title>
            {splitOverVIewHandler()}
          </Banner>
          <Slider>
            <RightArrow
              variants={sliderBtnVariant}
              initial="right"
              whileHover="rightAction"
              onClick={sliderNextHandler}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M213.5444,109.87882l-78.72966,-78.7301c-10.42866,-10.42866 -27.3076,-10.42646 -37.7345,0c-10.40306,10.4035 -10.40306,27.33099 0,37.7345l17.43422,17.43422h-76.66962c-14.71251,0 -26.68212,11.96961 -26.68212,26.68213c0,14.71251 11.96961,26.68213 26.68213,26.68213h76.66918l-17.43422,17.43422c-10.40306,10.4035 -10.40306,27.33099 0,37.7345c10.42911,10.42866 27.30671,10.42778 37.7345,0l78.72966,-78.72966c1.72457,-1.72325 1.72457,-4.51823 0.00044,-6.24193zM128.57193,188.60848c-3.37234,3.37234 -7.85571,5.22978 -12.62466,5.22978c-9.8694,0 -17.85444,-7.98813 -17.85444,-17.854c0,-4.76939 1.85744,-9.25276 5.22934,-12.6251l24.96947,-24.96947c1.26198,-1.26242 1.63982,-3.16091 0.95697,-4.81045c-0.6833,-1.64909 -2.29266,-2.7248 -4.07815,-2.7248h-87.32561c-9.84468,0 -17.854,-8.00932 -17.854,-17.854c0,-9.84468 8.00932,-17.854 17.854,-17.854h87.32605c1.78549,0 3.39486,-1.07571 4.07815,-2.7248c0.68286,-1.64954 0.30501,-3.54802 -0.95697,-4.81045l-24.96947,-24.96947c-6.97775,-6.97775 -6.97819,-18.27113 0,-25.24932c6.97819,-6.97819 18.27245,-6.97731 25.24932,0l75.60848,75.60759z"></path>
                </g>
              </g>
            </RightArrow>
            <LeftArrow
              onClick={sliderPrevHandler}
              variants={sliderBtnVariant}
              initial="left"
              whileHover="leftAction"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M188.15515,86.31788h-76.67006l17.43466,-17.43422c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345c-10.42866,-10.42866 -27.3076,-10.4269 -37.7345,0l-78.72966,78.72966c-1.72369,1.72369 -1.72369,4.51868 0,6.24281l78.72966,78.72966c10.42911,10.42866 27.30671,10.42778 37.7345,0c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345l-17.43466,-17.43422h76.66962c14.71251,0 26.68212,-11.96961 26.68212,-26.68212c0,-14.71251 -11.96917,-26.68257 -26.68168,-26.68257zM188.15515,130.854h-87.32649c-1.78549,0 -3.39486,1.07571 -4.07815,2.7248c-0.6833,1.64954 -0.30545,3.54802 0.95697,4.81045l24.96947,24.96947c3.37234,3.37234 5.22978,7.85571 5.22978,12.6251c0,9.86852 -7.98813,17.854 -17.85444,17.854c-4.76895,0 -9.25276,-1.85744 -12.62466,-5.22978l-75.60848,-75.60804l75.60892,-75.60848c6.97819,-6.97863 18.27245,-6.97687 25.24932,0c6.97819,6.97819 6.97863,18.27113 0,25.24932l-24.96947,24.96947c-1.26242,1.26242 -1.64027,3.16091 -0.95697,4.81045c0.6833,1.64909 2.29266,2.7248 4.07815,2.7248h87.32605c9.84468,0 17.854,8.00932 17.854,17.854c0,9.84468 -8.00976,17.85444 -17.854,17.85444z"></path>
                </g>
              </g>
            </LeftArrow>
            <AnimatePresence onExitComplete={toggleLeaving} custom={back}>
              <Row
                custom={back}
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
                        layoutId={movie.id + ""}
                        onClick={() => movieClickHandler(movie.id + "")}
                        key={movie.id}
                        variants={movieVariant}
                        initial="initial"
                        whileHover="hover"
                        bgimage={getImagePath(movie.poster_path, "w300")}
                        transition={{ type: "tween" }}
                      >
                        <Info variants={infoVariant}>
                          {movie.title.indexOf(":") !== -1 ? (
                            <h4>{movie.title.split(":")[0]}</h4>
                          ) : (
                            <h4>{movie.title}</h4>
                          )}
                        </Info>
                      </Movie>
                    );
                  })}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigInfoMatch ? (
              <>
                <Overlay
                  variants={overlayVariant}
                  animate="action"
                  exit="exit"
                  onClick={overlayClickHandler}
                />
                <BigInfo
                  scroll={scrollY.get()}
                  layoutId={bigInfoMatch.params.movieId}
                >
                  {bigInfoData && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(20deg, rgba(0,0,0,1),rgba(0,0,0,.7),transparent),url(${getImagePath(
                            bigInfoData.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      {bigInfoData.title.indexOf(":") !== -1 ? (
                        <>
                          <BigTitle style={{ top: "-100px" }}>
                            {bigInfoData.title.split(":")[0]}
                          </BigTitle>
                          <SmallTitle>
                            {bigInfoData.title.split(":")[1]}
                          </SmallTitle>
                        </>
                      ) : (
                        <BigTitle>{bigInfoData.title}</BigTitle>
                      )}
                      <BigOverview>{bigInfoData.overview}</BigOverview>
                    </>
                  )}
                </BigInfo>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

/* Motion-Variant */
const sliderVariant = {
  normal: (back: boolean) => {
    return {
      x: back ? -window.innerWidth - 10 : window.innerWidth + 10,
    };
  },
  action: {
    x: 0,
  },
  exit: (back: boolean) => {
    return {
      x: back ? +window.innerWidth + 10 : -window.innerWidth - 10,
    };
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
const infoVariant = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.3,
    },
  },
};
const overlayVariant = {
  action: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
const hiddenBtnVariant = {
  normal: {
    y: 0,
  },
  action: {
    y: 10,
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};
const sliderBtnVariant = {
  left: {
    x: 10,
  },
  leftAction: {
    x: 0,
    transition: {
      duration: 0.7,
      repeat: Infinity,
    },
  },
  right: {
    x: -10,
  },
  rightAction: {
    x: 0,
    transition: {
      duration: 0.7,
      repeat: Infinity,
    },
  },
};
/* Styled-Components */
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
  font-weight: 600;
  margin-bottom: 10px;
`;
const Overview = styled.div``;
const ShowContent = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  width: 40%;
`;
const HiddenBtn = styled(motion.button)<{ hiddenprop: boolean | string }>`
  border-radius: 5px;
  border: none;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.hiddenprop === "true"
      ? `url("https://img.icons8.com/material-outlined/24/000000/collapse-arrow.png")`
      : `url("https://img.icons8.com/material-two-tone/24/000000/expand-arrow--v1.png")`};
  background-position: center;
  width: 40%;
  color: ${(props) => props.theme.black.darker};
  background-color: transparent;
  cursor: pointer;
  padding: 15px 10px;
`;
const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
`;
const RightArrow = styled(motion.svg)`
  position: absolute;
  width: 5vw;
  height: 5vh;
  top: 130px;
  right: 0;
  z-index: 100;
`;
const LeftArrow = styled(RightArrow)`
  left: 0;
`;
const Row = styled(motion.span)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0 50px;
`;
const Movie = styled(motion.div)<{ bgimage: string }>`
  background-image: url(${(props) => props.bgimage});
  /* background-size: 100% 100%; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 300px;
  /* &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  } */
`;
const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  overflow: hidden;
  /* background-color: ${(props) => props.theme.black.lighter}; */
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }
`;

const BigInfo = styled(motion.div)<{ scroll: number }>`
  position: absolute;
  width: 40vw;
  height: 70vh;
  background-color: ${(props) => props.theme.black.lighter};
  top: ${(props) => props.scroll + 80 + "px"};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;
const BigCover = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;
  position: relative;
`;
const BigTitle = styled.h3`
  position: relative;
  top: -60px;
  font-size: 48px;
  font-weight: 700;
  left: 20px;
`;

const SmallTitle = styled(BigTitle)`
  font-size: 24px;
  top: -100px;
`;
const BigOverview = styled.p`
  position: relative;
  top: -40px;
  padding: 0 20px;
`;

export default Home;
