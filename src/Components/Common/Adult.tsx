import styled from "styled-components";
import { useGetInfo } from "../../HOC";
import { IIdProp } from "./RuntimeBox";

function Adult({ id }: IIdProp) {
  return <>{useGetInfo(id, "adult") && <Wrapper>19</Wrapper>}</>;
}
export default Adult;
const Wrapper = styled.span`
  font-weight: 700;
  font-size: 32px;
  position: relative;
  padding: 5px 10px;
  background-color: red;
  border-radius: 70%;
`;
