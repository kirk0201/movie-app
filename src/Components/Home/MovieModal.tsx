import {
  AnimatePresence,
  motion,
  MotionValue,
  useViewportScroll,
} from "framer-motion";
import { PathMatch, useMatch } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../../api";
import { getImagePath } from "../../utils";
interface IMovieModalProp {
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
}: IMovieModalProp) {
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
                    <SmallTitle>{bigInfoData.title.split(":")[1]}</SmallTitle>
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
export default MovieModal;
