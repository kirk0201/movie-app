import {
  AnimatePresence,
  motion,
  MotionValue,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { PathMatch, useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IMovie } from "../../api";
import { movieNavState } from "../../atoms";
import { useGetMovie } from "../../HOC";
import { getImagePath } from "../../utils";
import Adult from "../Common/Adult";
import Credit from "../Common/Credit";
import GenreBox from "../Common/GenreBox";
import MovieDetail from "../Common/MovieDetail";
import RuntimeBox from "../Common/RuntimeBox";
import VoteAverage from "../Common/VoteAverage";
interface IMovieModalProp {
  id: string;
  scrollY: MotionValue<number>;
  bigInfoData: IMovie | "" | undefined;
  overlayClickHandler: () => void;
  bigInfoMatch: PathMatch<"movieId"> | null;
}

function MovieModal({
  scrollY,
  bigInfoData,
  overlayClickHandler,
  bigInfoMatch,
  id,
}: IMovieModalProp) {
  const [movieNav, setMovieNav] = useRecoilState(movieNavState);

  const movieId = bigInfoMatch?.params.movieId;

  let long = false;
  return bigInfoData ? (
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
            layoutId={bigInfoMatch.params.movieId + id}
          >
            {bigInfoData && (
              <Wrapper>
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
                    {(long = true)}
                    <Vote long={long}>
                      <VoteAverage
                        id={bigInfoData.id + ""}
                        adult={bigInfoData.adult}
                        display="absolute"
                        long={long}
                      />
                    </Vote>
                    <BigTitle style={{ top: "-100px" }}>
                      <Adult id={bigInfoData.id + ""} />
                      {bigInfoData.title.split(":")[0]}
                    </BigTitle>
                    <SmallTitle>
                      {bigInfoData.title.split(":")[1]}
                      <RuntimeBox id={bigInfoData.id + ""} />
                    </SmallTitle>
                  </>
                ) : (
                  <BigTitle>
                    <Vote>
                      <VoteAverage
                        id={bigInfoData.id + ""}
                        adult={bigInfoData.adult}
                        display="absolute"
                        long={long}
                      />
                    </Vote>
                    {(long = false)}
                    <Adult id={id + ""} />
                    {bigInfoData.title}
                    <RuntimeBox id={bigInfoData.id + ""} />
                  </BigTitle>
                )}
                <NavInfo long={long}>
                  <InfoMenu onClick={() => setMovieNav("0")}>상세정보</InfoMenu>

                  <InfoMenu onClick={() => setMovieNav("1")}>등장인물</InfoMenu>
                  <InfoMenu onClick={() => setMovieNav("2")}>
                    비슷한 컨텐츠
                  </InfoMenu>
                </NavInfo>
                <NavContent>
                  {movieNav === "0" && (
                    <MovieDetail
                      id={bigInfoData.id + ""}
                      long={long}
                      data={bigInfoData}
                      movieId={movieId}
                    />
                  )}
                  {movieNav === "1" && <Credit id={bigInfoData.id + ""} />}
                </NavContent>
              </Wrapper>
            )}
          </BigInfo>
        </>
      ) : null}
    </AnimatePresence>
  ) : null;
}
const overlayVariant = {
  action: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 10;
`;
const BigInfo = styled(motion.div)<{ scroll: number }>`
  position: absolute;
  width: 40vw;
  background-color: ${(props) => props.theme.black.lighter};
  top: ${(props) => props.scroll + 80 + "px"};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  z-index: 10;
  overflow: hidden;
  transform-origin: translateY(top);
`;

const BigCover = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;

  position: relative;
`;
const Vote = styled.div<{ long?: boolean }>`
  position: relative;
  top: -30px;
  left: ${(props) => (props.long ? "20px" : "")};
`;
const BigTitle = styled.h3`
  /* display: flex; */
  position: relative;
  top: -60px;
  font-size: 48px;
  font-weight: 700;
  left: 20px;
`;

const SmallTitle = styled(BigTitle)`
  display: flex;
  font-size: 24px;
  top: -100px;
`;

const NavInfo = styled.nav<{ long: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: relative;
  padding: 0 10px;

  top: ${(props) => (props.long ? "-80px" : "-50px")};
`;
const InfoMenu = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: center;
  background-color: tranparent;
  padding: 10px 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const NavContent = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  position: relative;
`;
export default MovieModal;
