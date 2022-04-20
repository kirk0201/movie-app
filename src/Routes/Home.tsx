import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { INowPlaying, movieFetch } from "../api";
import { motionLeave, slideDirectionBack, sliderIndexState } from "../atoms";
import LeftArrow from "../Components/Common/LeftArrow";
import RightArrow from "../Components/Common/RightArrow";
import Banner from "../Components/Home/Banner";
import MovieModal from "../Components/Home/MovieModal";
import Slider from "../Components/Home/Slider";
import { getImagePath, offset } from "../utils";

function Home() {
  // recoil

  // react-router-dom
  const navigate = useNavigate();
  const bigInfoMatch = useMatch("movies/:movieId");
  const overlayClickHandler = () => {
    navigate("/");
  };

  // framer-motion
  const { scrollY } = useViewportScroll();

  // useQuery
  const { data, isLoading } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    movieFetch
  );
  const bigInfoData =
    bigInfoMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigInfoMatch.params.movieId
    );

  console.log(data);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner />
          <Slider data={data} />
          <MovieModal
            scrollY={scrollY}
            bigInfoData={bigInfoData}
            overlayClickHandler={overlayClickHandler}
            bigInfoMatch={bigInfoMatch}
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
