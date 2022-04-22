import { motion } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGenre, IGenre, INowPlaying, movieFetch } from "../../api";
import { getImagePath, useGetGenreString } from "../../utils";
import GenreBox from "../Common/GenreBox";

function Banner() {
  const [hiddenContent, setContent] = useState(false);

  const { data, isLoading } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    () => movieFetch("now_playing")
  );
  const { data: genre } = useQuery<IGenre>("genre", getGenre);

  // console.log("BannerData", data);
  // console.log(genre);
  console.log("test", useGetGenreString("popular"));
  // Oerview 내용 요약 및 확대
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
  return (
    <BannerImg bgImage={getImagePath(data?.results[0].backdrop_path!)}>
      <Col>
        <Title>{data?.results[0].title}</Title>
        <GenreBox />

        {splitOverVIewHandler()}
      </Col>
      <Col>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=lV8MuZC_-Fo`}
          // width="100%"
          height="60vh"
          style={{
            position: "relative",
            zIndex: 10,
          }}
          playing={true}
          muted={true}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
              },
            },
          }}
        />
      </Col>
    </BannerImg>
  );
}
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
const BannerImg = styled.div<{ bgImage: string }>`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 60px;
  /* flex-direction: column; */
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImage});
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Overview = styled.div`
  padding-top: 15px;
`;
const ShowContent = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  width: 80%;
`;
const HiddenBtn = styled(motion.button)<{ hiddenprop: boolean | string }>`
  position: relative;
  border-radius: 5px;
  border: none;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.hiddenprop === "true"
      ? `url("https://img.icons8.com/material-outlined/24/000000/collapse-arrow.png")`
      : `url("https://img.icons8.com/material-two-tone/24/000000/expand-arrow--v1.png")`};
  background-position: center;
  width: 80%;
  color: ${(props) => props.theme.black.darker};
  background-color: transparent;
  cursor: pointer;
  padding: 15px 10px;
  z-index: 10;
`;
const Col = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default Banner;
