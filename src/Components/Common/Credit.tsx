import { useEffect } from "react";
import styled from "styled-components";
import { ICast } from "../../api";
import { getImagePath, useGetCredit } from "../../utils";
import { IIdProp } from "./RuntimeBox";

function Credit({ id }: IIdProp) {
  const sliceName = useGetCredit(id);
  const sliceProfile = useGetCredit(id);
  console.log("sliceProfile", sliceProfile);
  return (
    <Wrapper>
      {sliceName &&
        sliceName.map((act: ICast) => (
          <>
            <Image image={getImagePath(act.profile_path, "w200")}>
              <Item>{act.name}</Item>
            </Image>
          </>
        ))}
    </Wrapper>
  );
}
export default Credit;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  top: -50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  background-color: transparent;
  padding: 20px 50px;
  background-position: center;
`;
const Image = styled.div<{ image?: string }>`
  box-shadow: 2px, 2px, 3px, red;
  background: url(${(props) => props.image});
  background-size: auto;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: flex-end;
`;
const Container = styled.div`
  position: relative;
`;
const Item = styled.div`
  position: relative;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.7);
`;
