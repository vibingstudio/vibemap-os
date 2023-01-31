import Link from "next/link";
import styled from "styled-components";

import { breakpoints } from "../../styles/breakpoints";

export const MenuContainer = styled.header<{ from: String }>`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: end;
  color: white;
  width: 93%;
  margin: 0 auto;
  padding: 10px 40px 20px 40px;
  z-index: 9999;
  @media (max-width: 1100px) {
    padding: 20px 0;
  }
  @media(max-width: 650px) {
    padding: 13px 0;
  @media (max-width: 450px) {
    padding: 13px 0;
  }
`;

export const ConnectBtnContainer = styled.div<{ backgroundColor: string }>`
  display: inline-block;
  background: ${({ backgroundColor }) => backgroundColor};
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    background: ${({ backgroundColor }) => backgroundColor};
    opacity: 1;
    & .connectBtn {
      color: black;
    }
  }
`;

export const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  @media ${breakpoints.mobileXL} {
    gap: 1rem;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;
  z-index: 6;
  @media (max-width: 640px) {
    gap: 1.5rem;
  }
  @media (max-width: 520px) {
    padding-top: 5px;
  }
`;

export const SocialLink = styled.a<{ isMobile: Boolean }>`
  display: flex;
  align-items: center;
  width: 25px;
  height: auto;
  text-decoration: none;
  transition: all 0.4s ease;
  cursor: pointer;
  & svg {
    height: inherit;
    width: inherit;
  }
  @media (max-width: 1023px) {
    opacity: 1;
  }
  @media (max-width: 600px) {
    display: ${({ isMobile }) => (isMobile ? "flex" : "none")};
    width: 20px;
    height: auto;
  }
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  position: relative;

  & img {
    width: auto;
    height: 35px;
    @media (max-width: 600px) {
      height: 20px;
    }
  }
`;

export const Logo = styled.img``;

export const ConnectBtn = styled.button`
  border: none;
`;

export const HamburgerMenuContainer = styled.div<{ isOpen: Boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  top: 4px;
  z-index: 500;

  & .dropdownItemContainer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    background: #00000080;
    padding: 10px;
    width: 10rem;
    right: 0;
    top: ${({ isOpen }) => (isOpen ? "2.5rem" : "0rem")};
    transition: all 0.3s ease-out;
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    pointer-events: ${({ isOpen }) => (isOpen ? "all" : "none")};
    border-radius: 5px;

    & .dropdownItem {
      color: white;
      font-size: 0.9rem;
      font-weight: 500;
      background: transparent;
      width: 100%;
      border: none;
      padding: 7px;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease-out;
      &:hover {
        background: #ffffff20;
      }
    }

    & .dropdownSocialIcons {
      display: none;
      @media (max-width: 600px) {
        display: block;
      }
    }
  }
`;
