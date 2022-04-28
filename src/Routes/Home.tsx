import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetInfo, INowPlaying, movieFetch, getInfoFetch } from "../api";
import {
  movieNavState,
  nowPlayingIndexState,
  popularIndexState,
  slideDirectionBack,
} from "../atoms";
import LeftArrow from "../Components/Common/LeftArrow";
import RightArrow from "../Components/Common/RightArrow";
import Banner from "../Components/Home/Banner";
import MovieModal from "../Components/Home/MovieModal";
import Slider from "../Components/Home/Slider";
import { useFindBigInfoMatch } from "../HOC";

function Home() {
  // recoil
  const [popularIndex, setPopularIndex] = useRecoilState(popularIndexState);
  const [nowPlayingIndex, setNowPlayingIndex] =
    useRecoilState(nowPlayingIndexState);
  const [back, setBack] = useRecoilState(slideDirectionBack);
  const setMovieNav = useSetRecoilState(movieNavState);
  // react-router-dom
  const navigate = useNavigate();
  // const bigInfoMatch = useMatch("movies/:movieId");
  const overlayClickHandler = () => {
    navigate("/");
    setMovieNav("0");
  };

  // framer-motion
  const { scrollY } = useViewportScroll();

  // useQuery
  const { data: popular, isLoading: isPopular } = useQuery<INowPlaying>(
    ["movies", "popular"],
    () => movieFetch("popular")
  );
  const { data: nowPlaying, isLoading: isNow } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    () => movieFetch("now_playing")
  );

  const { bigInfoMatch: popularMatch, bigData: popularData } =
    useFindBigInfoMatch("popular", popular);
  console.log("popularUSE DATA", popularMatch, popularData);
  const { bigInfoMatch: nowMatch, bigData: nowData } = useFindBigInfoMatch(
    "nowplaying",
    nowPlaying
  );
  console.log("nowPlayingUSE DATA", nowMatch, nowData);

  // const bigInfoData =
  //   bigInfoMatch?.params.movieId &&
  //   popular?.results.find(
  //     (movie) => movie.id + "" === bigInfoMatch.params.movieId
  //   );
  // console.log("bigInfoMatch", bigInfoMatch);
  // console.log("test", test);

  // const { bigInfo } = useFindBigInfoMatch("popular");
  // console.log("big", bigInfo);

  // console.log(popularIndex, nowPlayingIndex);
  // console.log("bacK", back);
  // console.log("nowPlaying", nowPlaying);
  // console.log("popular", popular);
  const isLoading = isPopular || isNow;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner />

          <Slider
            id="popular"
            keyword="인기 컨텐츠"
            data={popular}
            top={0}
            back={back}
            setBack={setBack}
            index={popularIndex}
            setIndex={setPopularIndex}
          />
          <MovieModal
            id="popular"
            scrollY={scrollY}
            bigInfoData={popularData}
            overlayClickHandler={overlayClickHandler}
            bigInfoMatch={popularMatch}
          />
          <Slider
            id="nowplaying"
            keyword="지금 상영중"
            data={nowPlaying}
            top={400}
            back={back}
            setBack={setBack}
            index={nowPlayingIndex}
            setIndex={setNowPlayingIndex}
          />
          <MovieModal
            id="nowplaying"
            scrollY={scrollY}
            bigInfoData={nowData}
            overlayClickHandler={overlayClickHandler}
            bigInfoMatch={nowMatch}
          />
        </>
      )}
    </Wrapper>
  );
}

/* Motion-Variant */

/* Styled-Components */

const Wrapper = styled.div``;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Home;
