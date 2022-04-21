import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import styled from "styled-components";
import { INowPlaying } from "../../api";
import { motionLeave } from "../../atoms";
import { getImagePath, offset } from "../../utils";
import LeftArrow from "../Common/LeftArrow";
import RightArrow from "../Common/RightArrow";

interface IDataProp {
  data?: INowPlaying;
  top: number;
  back: boolean;
  index: number;
  setIndex: SetterOrUpdater<number>;
  setBack: SetterOrUpdater<boolean>;
  id: string;
}
function Slider({ id, data, top, back, index, setIndex, setBack }: IDataProp) {
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
      <AnimatePresence onExitComplete={toggleLeaving} custom={back}>
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
const Wrapper = styled(motion.div)<{ top: IDataProp["top"] }>`
  position: relative;
  top: ${(props) => (props.top ? `${props.top}px` : "")};
`;
const Row = styled(motion.span)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0 60px;
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
