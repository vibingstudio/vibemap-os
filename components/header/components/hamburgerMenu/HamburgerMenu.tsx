import React from "react";
interface Props {
  isOpen?: boolean;
  onClick?: () => void;
}

const HamburgerMenu = ({ isOpen = false, onClick }: Props) => {
  return (
    <div
      className={isOpen ? "icon nav-icon-5 open" : "icon nav-icon-5"}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerMenu;
