import styled from "styled-components";

export const MapContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 10;
  overflow: hidden;
`;

export const NoteContainer = styled.div<{ color: string }>`
  position: absolute;
  z-index: 100;
  left: 25px;
  bottom: 25px;

  & .note {
    color: white;
    font-size: 15px;
    font-weight: 700;
    margin: 0;
    text-align: center;

    @media (max-width: 500px) {
      font-size: 12px;
    }
  }

  & .haveYouOwn {
    color: white;
    text-align: center;
    margin: 0;
    padding-top: 5px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .clickToHaveMap {
      display: inline-block;
      color: white;
      text-decoration: none;
      margin-top: 5px;
      padding: 4px 12px;
      background-color: ${({ color }) => color};
      border-radius: 5px;
      cursor: pointer;
    }
  }

  & .poweredBy {
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      width: 20px;
      height: auto;
    }
    & h2 {
      font-size: 13px;
      color: white;
      padding-left: 7px;
    }
  }
  @media (max-width: 500px) {
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const MarkerContainer = styled.div`
  cursor: pointer;
  & svg {
    width: 22px;
    height: auto;
  }
`;

export const PopupContainer = styled.div`
  width: 100%;

  & .popup-header {
    display: flex;
    justify-content: center;

    & img {
      width: 90px;
      height: auto;
    }
  }

  & h2 {
    margin: 0;
    text-align: center;
  }

  & .coinholderText {
    padding-top: 20px;
    text-transform: capitalize;
  }

  & .holder-info-container {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    & p {
      margin: 0;
    }
    & .holder-name {
      margin: 0;
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    & .hoder-tags {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    & .social-links-container {
      display: flex;
      gap: 10px;
      & svg {
        width: 25px;
        height: auto;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        & :hover {
          fill: #fff;
        }
      }
    }
  }
`;

export const NftCardContainer = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
`;

export const NftCard = styled.div`
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  background-color: #fff;
  & .nftImg {
    width: 100%;
    border-radius: 10px;
  }
  & .nft-name {
    margin: 0;
    font-weight: 600;
    text-align: center;
    color: #000;
  }
`;

// User Form Component

export const FormRootContainer = styled.section`
  padding: 2rem;
  position: relative;
  z-index: 10000;

  & .cancel-icon-container {
    position: absolute;
    cursor: pointer;
    top: 1.5rem;
    right: 1.5rem;
    & svg {
      width: 15px;
      height: auto;
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  & img {
    width: auto;
    height: 50px;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    gap: 0.8rem;
  }

  & .transectionNote {
    margin: 0;
    color: white;

    & .transectionLink {
      padding-bottom: 9px;
      padding-top: 9px;
      line-height: 1.5;
      overflow-wrap: break-word;
    }

    & .transectionLink svg {
      width: 17px;
      margin-left: 5px;
      cursor: pointer;
      @media (max-width: 600px) {
        width: 12px;
      }
    }

    @media (max-width: 600px) {
      font-size: 10px;
    }
  }

  & .connectWithUsBtnContainer {
    display: flex;
  }
`;

export const ContectWithUsBtn = styled.a<{ bgColor: string }>`
  font-size: 0.8rem;
  background-color: ${({ bgColor }) => bgColor};
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
  border: 1px solid ${({ bgColor }) => bgColor};
  &:hover {
    background-color: transparent;
  },
`;

export const InputContainer = styled.div<{ error: boolean; color: string }>`
  position: relative;
  & .underline {
    width: 99.95%;
    height: 3px;
    background-color: ${({ error, color }) => (error ? "red" : color)};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 0.5s ease-in-out;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export const Input = styled.input`
  width: 100%;
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  outline: none;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const TagText = styled.p`
  display: flex;
  gap: 0.4rem;
  margin: 0;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 2.5px 8px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-in-out;
  & svg {
    width: 10px;
    height: auto;
    cursor: pointer;
    fill: rgba(255, 255, 255, 0.7);
    & :hover {
      fill: #00b6de;
    }
    @media (max-width: 600px) {
      width: 8px;
    }
  }
`;

export const UploadBtnContainer = styled.div``;
export const UploadBtn = styled.button<{ color: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 1px dashed ${({ color }) => color};
  border-radius: 5px;
  padding: 3rem;
  cursor: pointer;
  text-align: center;
  color: white;
  background-color: transparent;
  & :focus {
    outline: none;
  }
  & svg {
    width: 40px;
  }
  & span {
    margin-top: 10px;
    display: block;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
    & svg {
      width: 25px;
    }
    & span {
      font-size: 0.8rem;
    }
  }
`;

export const SubmitButtonContainer = styled.div<{ color: string }>`
  width: 100%;
  display: flex;
  justify-content: center;

  & .saveButton {
    position: relative;
    border: 1px solid ${({ color }) => color};
    background-color: transparent;
    outline: none;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    & .loading-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      & svg {
        width: auto;
        height: 34px;
      }
    }

    & :hover {
      background-color: #00b6de;
    }
    @media (max-width: 1100px) {
      font-size: 1rem;
      padding: 8px 30px;
    }
  }
`;
