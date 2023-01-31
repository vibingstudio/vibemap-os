import React, { useEffect, useState } from "react";
import { Popup } from "react-map-gl";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Image from "next/image";

import { NftCard, NftCardContainer, PopupContainer } from "../styles";

import VerifyTag from "../../../images/svgs/VerifyTag";
import DiscordIcon from "../../../images/svgs/DiscordIcon";
import TwitterIcon from "../../../images/svgs/TwitterIcon";

const CustomPopup = ({
  selectedProfile,
  logo,
  maptype,
  coinName,
}: {
  selectedProfile: any;
  logo: any;
  maptype?: string;
  coinName?: string;
}) => {
  const [pageNo, setPageNo] = useState(0);

  const pageNum = Math.ceil(selectedProfile.tokens.length / 8);

  const handlePageClick = (data: any) => {
    setPageNo(data.selected);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedProfile?.discord);
    Toast.fire({
      icon: "success",
      title: "Discord ID copied!",
    });
  };

  return (
    <Popup
      longitude={selectedProfile?.country?.longitude}
      latitude={selectedProfile?.country?.latitude}
      closeButton={false}
      closeOnClick={true}
      offset={18}
    >
      <PopupContainer>
        <div className="popup-header">
          <Image src={logo} alt="logo" />
        </div>
        <div className="holder-info-container">
          <div>
            <p className="holder-name">
              {selectedProfile?.name}
              <VerifyTag fill="#588ff7" />
            </p>
            <p className="holder-address">
              {selectedProfile?.country?.country},{" "}
              {selectedProfile?.country?.city}
            </p>
            <p className="hoder-tags">
              {selectedProfile?.tags?.map((tag: any, index: number) => (
                <span key={index}>{`#${tag}.`}</span>
              ))}
            </p>
            {selectedProfile?.tokens?.length > 0 && (
              <p>NFTs Holding : {selectedProfile?.tokens?.length}</p>
            )}
          </div>
          <div className="social-links-container">
            {selectedProfile?.discord && (
              <span onClick={handleCopy}>
                <DiscordIcon fill="white" />
              </span>
            )}
            {selectedProfile?.twitter && (
              <a
                href={`https://twitter.com/${selectedProfile?.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon fill="white" />
              </a>
            )}
          </div>
        </div>
        <div className="coinholderText">
          <h2>{coinName} Holder</h2>
        </div>
        {maptype !== "coin" && (
          <NftCardContainer>
            {selectedProfile?.tokens
              ?.slice(pageNo * 8, (pageNo + 1) * 8)
              .map((token: any, index: number) => (
                <NFTCard key={index} nft={token} />
              ))}
          </NftCardContainer>
        )}
        {maptype !== "coin" && (
          <>
            {selectedProfile?.tokens?.length > 8 && (
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageNum}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link previous-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                activeClassName={"pagination-active"}
              />
            )}
          </>
        )}
      </PopupContainer>
    </Popup>
  );
};

const NFTCard = ({ nft }: { nft: any }) => {
  const [details, setDetails] = React.useState<any>(null);
  const { name, uri } = nft?.data ?? {};

  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name, uri]);

  return (
    <NftCard>
      <div>
        <img src={details?.image} alt="nft" className="nftImg" />
      </div>
      <p className="nft-name">{name}</p>
    </NftCard>
  );
};

export default CustomPopup;
