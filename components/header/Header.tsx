import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react"; // Default styles that can be overridden by your app

import {
  MenuContainer,
  SocialLinks,
  SocialLink,
  HamburgerMenuContainer,
  LogoLink,
  SocialLinksContainer,
  Logo,
  ConnectBtnContainer,
} from "./styles";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";
// import DiscordIcon from "../../images/svgs/discord-icon.svg";
// import TwitterIcon from "../../images/svgs/twitter-icon.svg";
import Swal from "sweetalert2";
import DiscordIcon from "../../images/svgs/DiscordIcon";
import TwitterIcon from "../../images/svgs/TwitterIcon";
import Image from "next/image";
import useUserSOLBalanceStore from "hooks/getBonkBalance";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  from?: string;
  connectedProfile: any;
  setUserModalOpen: any;
  userModalOpen: boolean;
  holdingNfts: any;
  logo: any;
  btnBgColor: any;
  themeColor: any;
  discordLink: string;
  twitterLink: string;
  collectionName: string;
}

const Header = ({
  isMenuOpen,
  setIsMenuOpen,
  from,
  connectedProfile,
  setUserModalOpen,
  holdingNfts,
  logo,
  btnBgColor,
  themeColor,
  discordLink,
  twitterLink,
  collectionName,
}: HeaderProps) => {
  const wallet = useWallet();
  const ref = React.useRef(null);

  useEffect(() => {
    const handleMouseClick = (e: any) => {
      if (!ref?.current?.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [isMenuOpen, ref]);

  const location = useRouter();
  const bonkBalance = useUserSOLBalanceStore((s) => s.bonkBalance);

  return (
    <MenuContainer from={`${from}`}>
      <div>
        <LogoLink href={location.pathname}>
          <Image src={logo} alt="logo" />
        </LogoLink>
      </div>
      <SocialLinksContainer>
        <SocialLinks>
          {discordLink && (
            <SocialLink href={discordLink} target="_blank" isMobile={false}>
              <DiscordIcon fill="#5865F2" />
            </SocialLink>
          )}
          {twitterLink && (
            <SocialLink href={twitterLink} target="_blank" isMobile={false}>
              <TwitterIcon fill="#73A1FB" />
            </SocialLink>
          )}
          <ConnectBtnContainer backgroundColor={btnBgColor}>
            <WalletMultiButton className="connectBtn" />
          </ConnectBtnContainer>
        </SocialLinks>
        {wallet.connected && (
          <HamburgerMenuContainer isOpen={isMenuOpen}>
            <span ref={ref}>
              <HamburgerMenu
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </span>
            <div className="dropdownItemContainer">
              {wallet.connected && (
                <>
                  <button
                    className="dropdownItem"
                    onClick={
                      holdingNfts?.length > 0 || bonkBalance >= 100
                        ? () => setUserModalOpen(true)
                        : () => {
                            Swal.fire({
                              title: `You don't have any ${collectionName} yet!`,
                              text: `Only ${collectionName} holders can access this feature.`,
                              color: "#fff",
                              icon: "warning",
                              confirmButtonText: "Ok",
                              background: themeColor,
                              confirmButtonColor: "#be29ec",
                            });
                          }
                    }
                  >
                    {connectedProfile?.isAdded ? "Edit Profile" : "Add Profile"}
                  </button>
                  <button className="dropdownItem">About</button>
                  <div className="dropdownSocialIcons">
                    <SocialLinks>
                      {discordLink && (
                        <SocialLink
                          href={discordLink}
                          target="_blank"
                          isMobile={true}
                        >
                          <DiscordIcon fill="#5865F2" />
                        </SocialLink>
                      )}
                      {twitterLink && (
                        <SocialLink
                          href={twitterLink}
                          target="_blank"
                          isMobile={true}
                        >
                          <TwitterIcon fill="#73A1FB" />
                        </SocialLink>
                      )}
                    </SocialLinks>
                  </div>
                </>
              )}
            </div>
          </HamburgerMenuContainer>
        )}
      </SocialLinksContainer>
    </MenuContainer>
  );
};

export default Header;
