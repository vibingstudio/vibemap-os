import styled from "styled-components";
import { motion } from "framer-motion";

export const List = styled(motion.ul)`
  width: 100%;
  box-sizing: border-box;
  max-height: 180px;
  overflow-y: auto;
  padding: 6px;
  z-index: 1000;
  left: 0;
  top: 55%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  color: black;
  list-style-type: none;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
  &::-webkit-scrollbar {
    width: 0.3rem;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00b6de;
  }
`;

export const ListItem = styled.li<{
  padding: any;
  sortActive: any;
}>`
  display: flex;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : "6px")};
  border-radius: 4px;
  color: ${({ sortActive }) =>
    sortActive ? "#00c4ff" : "rgba(255, 255, 255, 0.7)"};
  cursor: pointer;
  transition: all 0.4s ease;
  > span {
    margin: 5px;
  }
  &:hover {
    color: #00c4ff;
  }
`;
