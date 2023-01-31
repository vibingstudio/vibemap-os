import styled from "styled-components";
import Image from "next/image";

const underlineColor = "rgba(255,20,147, 0.5)";

export const DropdownContainer = styled.div<{
  open: Boolean;
  requiredError: Boolean;
  color: string;
}>`
  position: relative;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  cursor: pointer;
  & .underline {
    width: 99.95%;
    height: 3px;
    background-color: ${({ requiredError, color }) =>
      requiredError ? "red" : color};
    position: absolute;
    transition: all 0.5s ease-in-out;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  & .instraction {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    @media (max-width: 600px) {
      font-size: 0.6rem;
    }
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const Text = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

// export const Image = styled.img<{ open: Boolean }>`

// `;

export const ArrowImg = styled(Image)<{ open: Boolean }>`
  width: auto;
  height: 0.55rem;
  transition: all 0.5s linear;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const SearchInput = styled.input`
  width: 50%;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
