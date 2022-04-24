import styled from "styled-components";
import { useGetInfo } from "../../utils";

export interface IIdProp {
  id: string;
}
function RuntimeBox({ id }: IIdProp) {
  return (
    <Wrapper>
      {useGetInfo(id, "runtime")}
      <Min> min</Min>
    </Wrapper>
  );
}
export default RuntimeBox;
const Wrapper = styled.span`
  font-size: 14px;
  padding: 5px 10px;
  background-color: #c49000;
  border-radius: 10px;
`;
const Min = styled.span`
  font-size: 12px;
`;
