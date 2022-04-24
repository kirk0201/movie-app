import styled from "styled-components";
import { useGetInfo } from "../../utils";
import { IIdProp } from "./RuntimeBox";

function Adult({ id }: IIdProp) {
  return <>{useGetInfo(id, "adult") && <Wrapper>19</Wrapper>}</>;
}
export default Adult;
const Wrapper = styled.span`
  padding: 5px 15px;
  background-color: red;
  border-radius: 70%;
`;
