import { filterProps } from "framer-motion";
import styled from "styled-components";
import { useGetInfo } from "../../HOC";

interface IVoteProp {
  id: string;
  adult?: boolean | undefined;
}
function VoteAverage({ id, adult }: IVoteProp) {
  const vote_average = useGetInfo(id, "vote_average");
  //   const vote = Number(vote_average);
  console.log(vote_average);
  return (
    <Wrapper vote={vote_average} adult={adult}>
      {vote_average}
    </Wrapper>
  );
}
export default VoteAverage;

const Wrapper = styled.div<{
  vote: number | undefined;
  adult: boolean | undefined;
}>`
  text-align: center;
  position: relative;
  width: 5vw;
  left: ${(props) => (props.adult ? "60px" : "")};
  font-size: 20px;
  border-radius: 10px;
  padding: 5px 10px;
  font-weight: 700;
  background-color: grey;
  color: ${(props) =>
    props.vote! >= 9
      ? props.theme.voteUp.veryDark
      : props.vote! >= 8
      ? props.theme.voteUp.darker
      : props.vote! >= 7
      ? props.theme.voteUp.lighter
      : props.vote! >= 6
      ? props.theme.voteDown.lighter
      : props.vote! >= 5
      ? props.theme.voteDown.darker
      : props.vote! >= 4
      ? props.theme.voteDown.veryDark
      : "#d1c4e9"};
`;
