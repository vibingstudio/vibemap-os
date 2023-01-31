import bitmonHashList from "../staticData/creaturesHash.json";
import monkettersHashList from "../staticData/monkettesHash.json";

const UseNFTHooks = () => {
  const getMintAddresses = async (nfts: any) => {
    if (!nfts) {
      return [];
    }
    const mintAddresses = await Promise.all(
      nfts.map(async (nft: any) => {
        return nft?.mint;
      })
    );
    return mintAddresses;
  };

  const filterHolders = (nfts: any) => {
    if (!nfts) return [];
    const result = nfts.filter((nft: any) => nft?.data?.symbol === "BITMON");
    return result;
  };

  // export const filterHolders = async (nfts: any) => {
  //   if (!nfts) return [];
  //   // const result = nfts.map( async (nft: any) => {

  //   // });
  //   // return result;
  //   const result = await Promise.all(
  //     nfts.map(async (nft: any) => {
  //       const fetchMetadata = await fetch(nft?.data.uri);
  //       const metadata = await fetchMetadata.json();
  //       if (metadata?.collection?.family === "Bitmons") {
  //         return nft;
  //       } else {
  //         return null;
  //       }
  //     })
  //   );
  //   return result;
  // };

  // async function getMetadataPDA(mint: PublicKey): Promise<any> {
  //   const [publicKey] = await PublicKey.findProgramAddress(
  //     [Buffer.from("metadata"), PROGRAM_ID?.toBuffer(), mint.toBuffer()],
  //     PROGRAM_ID
  //   );
  //   return publicKey;
  // }

  const filterNFTs = (nfts: any , nftHashlist : any) => {
    if (nfts.length === 0) return [];

    const bitmonNfts = nfts.filter((nft: any) =>
    nftHashlist.includes(nft?.mint)
    );
    return bitmonNfts;
  };

  return {
    getMintAddresses,
    filterHolders,
    filterNFTs,
  };
};

export default UseNFTHooks;
