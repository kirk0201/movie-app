import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { RecoilState, SetterOrUpdater, useRecoilState } from "recoil";
import styled from "styled-components";
import { INowPlaying, movieFetch } from "../../api";
import {
  motionLeave,
  slideDirectionBack,
  popularIndexState,
} from "../../atoms";
import { offset } from "../../utils";
import { sliderBtnVariant } from "./RightArrow";
export interface IArrowProp {
  setIndex: SetterOrUpdater<number>;
  data?: INowPlaying;
  setBack: SetterOrUpdater<boolean>;
  leaving: boolean;
  toggle: () => void;
}
function LeftArrow({ setIndex, data, setBack, leaving, toggle }: IArrowProp) {
  // const [leaving, setLeaving] = useRecoilState(motionLeave);
  // const [back, setBack] = useRecoilState(slideDirectionBack);
  // const { data, isLoading } = useQuery<INowPlaying>(
  //   ["movie", "nowplaying"],
  //   () => movieFetch("now_playing")
  // );
  // const toggleLeaving = () => setLeaving((prev) => !prev);
  const sliderPrevHandler = () => {
    if (data) {
      if (leaving) return;
      toggle();
      setBack(true);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <ArrowSvg
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
    </ArrowSvg>
  );
}
const ArrowSvg = styled(motion.svg)`
  position: absolute;
  width: 5vw;
  height: 5vh;
  top: 130px;
  z-index: 100;
  left: 0;
`;
export default LeftArrow;
