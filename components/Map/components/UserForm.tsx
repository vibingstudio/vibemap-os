import React, { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import randomLocation from "random-location";
import Image from "next/image";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import Swal from "sweetalert2";

import CancelIcon from "../../../images/svgs/CancelIcon";
import BallLoading from "../../../images/svgs/BallLoading";

import countriesWithStates from "../../../staticData/countryAndSates.json";
import {
  FormContainer,
  Input,
  InputContainer,
  LogoContainer,
  SubmitButtonContainer,
  FormRootContainer,
} from "../styles";
import Dropdown from "../../common/SelectDropdown/Dropdown/Dropdown";
import ModalLayout from "../../Layout/ModalLayout";
import UseNFTHooks from "../../../hooks/useNFTs";

const UserFormModal = ({
  fetchAllHolder,
  isOpen,
  setIsOpen,
  activeProfile,
  logo,
  setActiveProfile,
  setHoldingNfts,
  themeColor,
  nftHashList,
  collectionName,
  maptype,
  accessToken,
  coinBalance,
  minrequiredCoin,
  fetchingBalance,
}: {
  fetchAllHolder: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  activeProfile: any;
  logo: any;
  setActiveProfile: (value: any) => void;
  setHoldingNfts: (value: any) => void;
  themeColor: any;
  nftHashList: any;
  collectionName: string;
  maptype: string;
  accessToken: string;
  coinBalance?: number | 0;
  minrequiredCoin?: number | 0;
  fetchingBalance?: boolean | 0;
}) => {
  const { filterNFTs, getMintAddresses } = UseNFTHooks();
  const [dataUploading, setDataUploading] = useState(false);
  const [nftMintAddresses, setNftMintAddresses] = useState<any>([]);
  const [filteredNfts, setFilteredNfts] = useState<any>([]);
  const [alltags, setAllTags] = useState<any>([
    "Developer",
    "Artist",
    "Writer",
    "Influencer",
    "Business",
    "Musician",
    "Doctor",
    "Student",
    "Feet Lover",
    "420",
  ]);
  const [inputtedValue, setInputtedValue] = useState<{
    name: string;
    discord: string;
    twitter: string;
  }>({
    name: activeProfile?.name || "",
    discord: activeProfile?.discord || "",
    twitter: activeProfile?.twitter || "",
  });
  const [attemptToSubmit, setAttemptToSubmit] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    activeProfile?.country?.country || ""
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    activeProfile?.country?.city || ""
  );
  const [tags, setTags] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const onlyCountries = [...countriesWithStates].map((country) => country.name);
  const walletAddress = publicKey?.toString();

  useEffect(() => {
    if (activeProfile) {
      setSelectedCountry(activeProfile?.country?.country || "");
      setSelectedCity(activeProfile?.country?.city || "");
      setTags(activeProfile?.tags || []);
      setInputtedValue({
        name: activeProfile?.name || "",
        discord: activeProfile?.discord || "",
        twitter: activeProfile?.twitter || "",
      });
    }
  }, [activeProfile]);

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey as any,
    connection,
  });

  console.log("nfts", nfts);

  const handleInput = (e: any) => {
    setInputtedValue({
      ...inputtedValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagSelect = (tag: string) => {
    setTags([...tags, tag]);
    setAllTags(alltags.filter((t: any) => t !== tag));
  };

  const removeTags = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setAllTags([...alltags, tag]);
  };

  useEffect(() => {
    if (selectedCountry !== "") {
      const country = [...countriesWithStates].find(
        (country: any) => country.name === selectedCountry
      );
      if (country) {
        setCities(country?.states.map((state: any) => state.name));
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (maptype === "coin" && connected && !fetchingBalance) {
      if (coinBalance < minrequiredCoin) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You Don't have enough BONK to Register",
          background: themeColor,
          color: "#fff",
          confirmButtonColor: "#00b6de",
        });
      }
    }
    if (nfts.length > 0 && maptype !== "coin") {
      const filteredNfts = filterNFTs(nfts, nftHashList);
      if (filteredNfts.length < 1 && connected) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not holding any Required NFTs",
          background: themeColor,
          color: "#fff",
          confirmButtonColor: "#00b6de",
        });
      }
      if (filteredNfts.length > 0 && connected) {
        setFilteredNfts(filteredNfts);
        setHoldingNfts(filteredNfts);
        getMintAddresses(nfts).then((data) => {
          setNftMintAddresses(data);
        });
      }
    }
  }, [nfts, connected, fetchingBalance]);

  const handleSubmit = async () => {
    setDataUploading(true);
    if (
      inputtedValue.name === "" ||
      inputtedValue.discord === "" ||
      inputtedValue.twitter === "" ||
      selectedCountry === "" ||
      selectedCity === "" ||
      tags.length === 0
    ) {
      setDataUploading(false);
      setAttemptToSubmit(true);
      return;
    }
    const getLocation = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${selectedCity} ${selectedCountry}.json?access_token=${accessToken}`
    );

    const location = await getLocation.json();
    const cordinates = location?.features[0]?.geometry?.coordinates;
    const randomGeneratedLocation = randomLocation.randomCirclePoint(
      { latitude: cordinates[1], longitude: cordinates[0] },
      10000
    );

    fetch("/api/postUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: {
          name: inputtedValue.name,
          discord: inputtedValue.discord,
          twitter: inputtedValue.twitter,
          wallet: walletAddress,
          tags: tags,
          isAdded: true,
          collectionName: collectionName,
          country: {
            city: selectedCity,
            country: selectedCountry,
            latitude: randomGeneratedLocation.latitude,
            longitude: randomGeneratedLocation.longitude,
          },
          tokens: filteredNfts,
          nftmintaddresses: nftMintAddresses,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsOpen(false);
          fetchAllHolder();
        }
      })
      .finally(() => {
        setDataUploading(false);
      });
  };

  useEffect(() => {
    if (connected) {
      fetch(`/api/user/getOne/${walletAddress}/${collectionName}`)
        .then((res) => res.json())
        .then((data) => {
          setActiveProfile(data.data);
          console.log("data", data);
          if (!data?.data?.isAdded && filteredNfts.length > 0) {
            setIsOpen(true);
          }
          if (!data?.data?.isAdded && coinBalance >= minrequiredCoin) {
            setIsOpen(true);
          }
        });
    }
  }, [connected, filteredNfts, fetchAllHolder, coinBalance]);

  return (
    <>
      <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
        <FormRootContainer>
          <div
            className="cancel-icon-container"
            onClick={() => setIsOpen(false)}
          >
            <CancelIcon fill="white" />
          </div>
          <LogoContainer>
            <Image src={logo} alt="logo" />
          </LogoContainer>
          <FormContainer>
            <InputContainer
              color={themeColor}
              error={
                inputtedValue.name === "" && attemptToSubmit ? true : false
              }
            >
              <Input
                type="text"
                placeholder="Name *"
                name="name"
                onChange={handleInput}
                value={inputtedValue.name}
              />
              <span className="underline"></span>
            </InputContainer>
            <InputContainer
              color={themeColor}
              error={
                inputtedValue.twitter === "" && attemptToSubmit ? true : false
              }
            >
              <Input
                type="text"
                placeholder="Twitter"
                name="twitter"
                onChange={handleInput}
                value={inputtedValue.twitter}
              />
              <span className="underline"></span>
            </InputContainer>
            <InputContainer
              color={themeColor}
              error={
                inputtedValue.discord === "" && attemptToSubmit ? true : false
              }
            >
              <Input
                type="text"
                placeholder="Discord"
                name="discord"
                onChange={handleInput}
                value={inputtedValue.discord}
              />
              <span className="underline"></span>
            </InputContainer>
            <Dropdown
              themeColor={themeColor}
              items={alltags}
              requiredError={
                tags.length === 0 && attemptToSubmit ? true : false
              }
              onDelete={removeTags}
              callFor={"tags"}
              selectItem={handleTagSelect}
              selectedItem={tags}
              labelText="Select Your Skills"
            />

            <Dropdown
              themeColor={themeColor}
              onDelete=""
              items={onlyCountries}
              requiredError={
                selectedCountry === "" && attemptToSubmit ? true : false
              }
              callFor={"countries"}
              selectItem={setSelectedCountry}
              selectedItem={selectedCountry}
              labelText={
                selectedCountry === "" ? "Select Country *" : selectedCountry
              }
            />
            <Dropdown
              themeColor={themeColor}
              items={cities}
              onDelete=""
              requiredError={
                selectedCity === "" && attemptToSubmit ? true : false
              }
              callFor={"cities"}
              selectItem={setSelectedCity}
              selectedItem={selectedCity}
              labelText={
                cities.length === 0
                  ? ""
                  : selectedCountry !== "" && selectedCity === ""
                  ? "Select City *"
                  : selectedCity
              }
            />
            <SubmitButtonContainer color={themeColor}>
              <button
                type="button"
                className="saveButton"
                onClick={dataUploading ? () => {} : () => handleSubmit()}
              >
                {dataUploading ? (
                  <span className="loading-container">
                    <BallLoading />
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </SubmitButtonContainer>
          </FormContainer>
        </FormRootContainer>
      </ModalLayout>
    </>
  );
};

export default UserFormModal;
