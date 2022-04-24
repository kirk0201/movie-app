import styled from "styled-components";
import { useGetGenreColor, useGetGenreString } from "../../utils";
interface IGenreProp {
  genreId: number[];
}
function GenreBox({ genreId }: IGenreProp) {
  const bannerGenre = useGetGenreString(genreId);
  return (
    <Wrapper>
      {bannerGenre.map((box) => (
        <Box key={box} genre={box}>
          {box}
        </Box>
      ))}
    </Wrapper>
  );
}
export default GenreBox;
const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;
`;
const Box = styled.div<{ genre: string }>`
  padding: 10px 20px;
  border-radius: 10px;
  margin-right: 5px;
  color: ${(props) => useGetGenreColor(props.genre)};
  background-color: ${(props) => props.theme.black.veryDark};
`;
