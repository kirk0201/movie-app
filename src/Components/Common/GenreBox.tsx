import styled from "styled-components";
import { useGetGenreString } from "../../utils";

function GenreBox() {
  const bannerGenre = useGetGenreString("popular");
  return (
    <Wrapper>
      {bannerGenre.map((box) => (
        <Box key={box}>{box}</Box>
      ))}
    </Wrapper>
  );
}
export default GenreBox;
const Wrapper = styled.div`
  display: flex;
`;
const Box = styled.div`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: ${(props) => props.theme.black.lighter};
`;
