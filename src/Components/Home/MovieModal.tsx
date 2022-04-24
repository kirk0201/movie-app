import {
  AnimatePresence,
  motion,
  MotionValue,
  useViewportScroll,
} from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../../api";
import { getImagePath } from "../../utils";
import Adult from "../Common/Adult";
import Credit from "../Common/Credit";
import GenreBox from "../Common/GenreBox";
import MovieDetail from "../Common/MovieDetail";
import RuntimeBox from "../Common/RuntimeBox";
interface IMovieModalProp {
  id: string;
  scrollY: MotionValue<number>;
  bigInfoData: "" | IMovie | undefined;
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
  const [movieNav, setMovieNav] = useState(0);

  let long = false;
  console.log("bigInfoData", bigInfoData);
  return (
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
                    <Adult id={bigInfoData.id + ""} />
                    <BigTitle style={{ top: "-100px" }}>
                      {bigInfoData.title.split(":")[0]}
                    </BigTitle>
                    <SmallTitle>
                      {bigInfoData.title.split(":")[1]}
                      <RuntimeBox id={bigInfoData.id + ""} />
                    </SmallTitle>
                  </>
                ) : (
                  <BigTitle>
                    {(long = false)}
                    {bigInfoData.title}
                    <RuntimeBox id={bigInfoData.id + ""} />
                  </BigTitle>
                )}
                <NavInfo long={long}>
                  <InfoMenu onClick={() => setMovieNav(0)}>상세정보</InfoMenu>

                  <InfoMenu onClick={() => setMovieNav(1)}>등장인물</InfoMenu>
                  <InfoMenu onClick={() => setMovieNav(2)}>
                    비슷한 컨텐츠
                  </InfoMenu>
                </NavInfo>
                <NavContent>
                  {movieNav === 0 && (
                    <MovieDetail
                      id={bigInfoData.id + ""}
                      long={long}
                      data={bigInfoData}
                    />
                  )}
                  {movieNav === 1 && <Credit id={bigInfoData.id + ""} />}
                </NavContent>
              </Wrapper>
            )}
          </BigInfo>
        </>
      ) : null}
    </AnimatePresence>
  );
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
  height: 70vh;
  background-color: ${(props) => props.theme.black.lighter};
  top: ${(props) => props.scroll + 80 + "px"};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  z-index: 10;
`;

const BigCover = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;
  position: relative;
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
  top: ${(props) => (props.long ? "-80px" : "-50px")};
`;
const InfoMenu = styled.div`
  cursor: pointer;
  background-color: tranparent;
  padding: 10px 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const NavContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  height: 100%;
  position: relative;
  overflow-x: hidden;
`;
export default MovieModal;
