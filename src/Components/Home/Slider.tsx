import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import styled from "styled-components";
import { INowPlaying } from "../../api";
import { motionLeave } from "../../atoms";
import { getImagePath, offset } from "../../utils";
import LeftArrow from "../Common/LeftArrow";
import RightArrow from "../Common/RightArrow";
import VoteAverage from "../Common/VoteAverage";

interface IDataProp {
  data?: INowPlaying;
  top: number;
  back: boolean;
  index: number;
  setIndex: SetterOrUpdater<number>;
  setBack: SetterOrUpdater<boolean>;
  id: string;
  keyword: string;
}
function Slider({
  id,
  data,
  top,
  back,
  index,
  setIndex,
  setBack,
  keyword,
}: IDataProp) {
  const [leaving, setLeaving] = useRecoilState(motionLeave);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const navigate = useNavigate();
  const movieClickHandler = (movieId: string, id: string) => {
    navigate(`/movies/${id}/${movieId}`);
  };
  return (
    <Wrapper top={top}>
      <RightArrow
        leaving={leaving}
        toggle={toggleLeaving}
        setIndex={setIndex}
        data={data}
        setBack={setBack}
      />
      <LeftArrow
        leaving={leaving}
        toggle={toggleLeaving}
        setIndex={setIndex}
        data={data}
        setBack={setBack}
      />
      {/* onExitComplete에 toggleLeaving함수를 사용할 때 슬라이드 작동이 
      멈추는 버그가 생겨 setLeaving으로 대체
      */}
      <AnimatePresence onExitComplete={() => setLeaving(false)} custom={back}>
        <Keyword>{keyword}</Keyword>
        <Row
          custom={back}
          variants={sliderVariant}
          initial="normal"
          animate="action"
          exit="exit"
          key={index}
          transition={{ type: "tween", duration: 1 }}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => {
              return (
                <MovieWrapper key={movie + ""}>
                  <Vote>
                    <VoteAverage id={movie.id + ""} display="relative" />
                  </Vote>

                  <Movie
                    layoutId={movie.id + id}
                    key={movie.id + id}
                    // onClick={() => movieClickHandler(movie.id + "")}
                    onClick={() => movieClickHandler(movie.id + "", id)}
                    variants={movieVariant}
                    initial="initial"
                    whileHover="hover"
                    bgimage={getImagePath(movie.poster_path, "w300")}
                    transition={{ type: "tween" }}
                  >
                    {console.log("movie.id : ", movie.id)}
                    <Info variants={infoVariant}>
                      {movie.title.indexOf(":") !== -1 ? (
                        <h4>{movie.title.split(":")[0]}</h4>
                      ) : (
                        <h4>{movie.title}</h4>
                      )}
                    </Info>
                  </Movie>
                </MovieWrapper>
              );
            })}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
}
/* Motion Variant */
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
const infoVariant = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.3,
    },
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
/* Styled-component */
const Keyword = styled.h1`
  position: relative;
  font-family: "one-pop";
  color: #e73118;
  top: -20px;
  left: 60px;
  font-weight: 300;
  font-size: 52px;
`;
const Wrapper = styled(motion.div)<{ top: IDataProp["top"] }>`
  position: relative;
  top: ${(props) => (props.top ? `${props.top}px` : "")};
`;

const Row = styled(motion.span)`
  cursor: pointer;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0 60px;
`;
const MovieWrapper = styled(motion.div)``;
const Vote = styled.div`
  display: flex;
  justify-content: center;
`;
const Movie = styled(motion.div)<{ bgimage: string }>`
  background-image: url(${(props) => props.bgimage});
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
  display: flex;
  justify-content: center;
`;
const Info = styled(motion.span)`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 90%;

  opacity: 0;
  text-align: center;
  h4 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }
`;
export default Slider;
