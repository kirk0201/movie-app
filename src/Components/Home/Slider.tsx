import { AnimatePresence, motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IMovie, INowPlaying } from "../../api";
import { motionLeave, slideDirectionBack, sliderIndexState } from "../../atoms";
import { getImagePath, offset } from "../../utils";
import LeftArrow from "../Common/LeftArrow";
import RightArrow from "../Common/RightArrow";

interface IDataProp {
  data?: INowPlaying;
}
function Slider({ data }: IDataProp) {
  const [leaving, setLeaving] = useRecoilState(motionLeave);
  const [back, setBack] = useRecoilState(slideDirectionBack);
  const [sliderIndex, setSliderIndex] = useRecoilState(sliderIndexState);

  const navigate = useNavigate();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const movieClickHandler = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Wrapper>
      <RightArrow />
      <LeftArrow />
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
    </Wrapper>
  );
}
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
const Wrapper = styled(motion.div)`
  position: relative;
  top: -100px;
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
export default Slider;
