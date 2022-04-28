import { motion } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import styled from "styled-components";
import { INowPlaying, movieFetch } from "../../api";
import { getImagePath } from "../../utils";
import Adult from "../Common/Adult";
import GenreBox from "../Common/GenreBox";
import RuntimeBox from "../Common/RuntimeBox";
import VoteAverage from "../Common/VoteAverage";

function Banner() {
  const [hiddenContent, setContent] = useState(false);

  const { data, isLoading } = useQuery<INowPlaying>(
    ["movie", "nowplaying"],
    () => movieFetch("now_playing")
  );

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
  const bannerData = data?.results[0];

  return data ? (
    <BannerImg bgImage={getImagePath(data?.results[0].backdrop_path!)}>
      <Col>
        <Row>
          <VoteAverage
            id={bannerData!.id + ""}
            adult={bannerData!.adult}
          ></VoteAverage>
          <Title>
            <Adult id={bannerData?.id + ""}></Adult>
            {data?.results[0].title}
            <RuntimeBox id={414906 + ""} />
          </Title>
        </Row>
        <GenreBox genreId={bannerData!.genre_ids}></GenreBox>

        {splitOverVIewHandler()}
      </Col>
      <Col>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=lV8MuZC_-Fo`}
          width="60vw"
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
  ) : null;
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
  font-size: 17px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: auto;
`;

const Row = styled.div``;
export default Banner;
