import React, { useCallback, useEffect } from "react";
import Head from "next/head";

import Header from "../components/header/Header";
import UseMap from "../components/Map/UseMap";
import CustomMarker from "../components/Map/components/CustomMarker";
import CustomPopup from "../components/Map/components/CustomPopup";
import UserFormModal from "../components/Map/components/UserForm";
// Haslist of your Collection to check if the user is holding your NFT or not
import monkettersHashList from "../staticData/monkettesHash.json";
import { Loader } from "../components/common/Loader";

import logo from "../images/monkettersLogo.png";

import { HeaderContainer } from "../styles/global";
import { MapContainer } from "../components/Map/styles";

const IndexPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [holders, setHolders] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = React.useState<any>(null);
  const [connectedProfile, setConnectedProfile] = React.useState<any>({});
  const [holdingNfts, setHoldingNfts] = React.useState<any>([]);

  // Fetch all holders from the API
  const fetchAllHolders = useCallback(() => {
    setIsFetching(true);
    fetch("/api/user/getAll")
      .then((response) => response.json())
      .then((data) => {
        // update the holders state
        const filteredHolders = data?.data?.filter((holder: any) => {
          return holder.collectionName === "monkettes";
        });
        setHolders(filteredHolders);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => {
    fetchAllHolders();
  }, []);
  // End of fetch all holders from the API

  // Checking for all the required environment variables
  if (
    !process.env.MAPBOX_ACCESS_TOKEN ||
    !process.env.MAPBOX_STYLE ||
    !process.env.MONGODB_URI
  ) {
    return (
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <h1>Missing environment variables</h1>
        <p>
          You need to add the following environment variables to your .env.local
          file:
        </p>
        <ul>
          <li>
            <code>MAPBOX_ACCESS_TOKEN</code>
          </li>
          <li>
            <code>MAPBOX_ACCESS_TOKEN</code>
          </li>
          <li>
            <code>MONGODB_URI</code>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <section>
      <Head>
        <title>Map</title>
        {/* Add your Favicon Here */}
        <link rel="icon" href={"/monkettersFavicon.png"} />
      </Head>
      <MapContainer>
        {isFetching && <Loader color="rgba(255,20,147, 1)" />}
        <HeaderContainer>
          <Header
            btnBgColor={"rgba(255,20,147, 0.3)"}
            themeColor={"rgba(255,20,147, 0.7)"}
            logo={logo}
            collectionName={"monkettes"}
            connectedProfile={connectedProfile}
            userModalOpen={modalOpen}
            setUserModalOpen={setModalOpen}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            holdingNfts={holdingNfts}
            discordLink="https://discord.gg/monkettes"
            twitterLink="https://twitter.com/MonkettesNFT"
          />
        </HeaderContainer>
        <UseMap
          defLat={37.8}
          defLong={-122.4}
          defZoom={1.35}
          mapStyle={process.env.MAPBOX_STYLE}
          accessToken={process.env.MAPBOX_ACCESS_TOKEN}
          setSelectedProfile={setSelectedProfile}
        >
          {holders.map((holder: any, index) => (
            <CustomMarker
              markerColor="#ffffff"
              activeMarkerColor="#FF22A5"
              key={index}
              longitude={holder?.country?.longitude}
              latitude={holder?.country?.latitude}
              holder={holder}
              setSelectedProfile={setSelectedProfile}
              selectedProfile={selectedProfile}
            />
          ))}
          {selectedProfile !== null && (
            <CustomPopup
              selectedProfile={selectedProfile}
              logo={logo}
              maptype="nft"
            />
          )}
        </UseMap>
        <UserFormModal
          themeColor={"rgba(255,20,147, 0.7)"}
          logo={logo}
          fetchAllHolder={fetchAllHolders}
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          activeProfile={connectedProfile}
          setActiveProfile={setConnectedProfile}
          setHoldingNfts={setHoldingNfts}
          // Haslist of your Collection to check if the user is holding your NFT or not
          nftHashList={monkettersHashList}
          collectionName="monkettes"
          maptype="nft"
          accessToken={process.env.MAPBOX_ACCESS_TOKEN}
        />
      </MapContainer>
    </section>
  );
};

export default IndexPage;
