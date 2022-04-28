import { filterProps, motion } from "framer-motion";
import styled from "styled-components";
import { useGetInfo } from "../../HOC";

interface IVoteProp {
  id: string;
  adult?: boolean | undefined;
  display?: "relative" | "absolute";
  long?: boolean;
}
function VoteAverage({ id, adult, display, long }: IVoteProp) {
  const vote_average = useGetInfo(id, "vote_average");
  //   const vote = Number(vote_average);
  console.log("infoFetch", vote_average);
  console.log("type", typeof adult);
  return (
    <Wrapper
      vote={vote_average}
      long={long}
      adult={Boolean(adult)}
      display={display}
    >
      ⭐{vote_average}
    </Wrapper>
  );
}
export default VoteAverage;

const Wrapper = styled(motion.span)<{
  vote: number | undefined;
  adult: boolean | undefined;
  display?: string;
  long?: boolean;
}>`
  top: ${(props) => (props.long ? "-100px" : "")};
  position: ${(props) => props.display};
  left: ${(props) => (props.adult === true ? "60px" : "")};
  font-size: 20px;
  border-radius: 10px;
  padding: 5px 10px;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.2);
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
