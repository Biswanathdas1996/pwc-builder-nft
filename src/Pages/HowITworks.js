import { Container, Typography, Box } from "@material-ui/core";

const HowItWorks = () => {
  return (
    <Container>
      <Box marginY="100px">
        <Typography
          style={{ fontSize: "45px", fontWeight: "600px", textAlign: "center" }}
          gutterBottom
        >
          How It Works
        </Typography>
        <Typography style={{ fontSize: "20px" }}>
          Like physical money, cryptocurrencies are fungible, meaning that they
          can be traded or exchanged, one for another. For example, one bitcoin
          is always equal in value to another bitcoin. Similarly, a single unit
          of ether is always equal to another unit. This fungibility
          characteristic makes cryptocurrencies suitable as a secure medium of
          transaction in the digital economy.5 NFTs shift the crypto paradigm by
          making each token unique and irreplaceable, thereby making it
          impossible for one non-fungible token to be equal to another. They are
          digital representations of assets and have been likened to digital
          passports because each token contains a unique, non-transferable
          identity to distinguish it from other tokens. They are also
          extensible, meaning you can combine one NFT with another to “breed” a
          third, unique NFT. Just like Bitcoin, NFTs also contain ownership
          details for easy identification and transfer between token holders.
          Owners can also add metadata or attributes pertaining to the asset in
          NFTs. For example, tokens representing coffee beans can be classified
          as fair trade. Or, artists can sign their digital artwork with their
          own signature in the metadata. NFTs evolved from the ERC-721 standard.
          Developed by some of the same people responsible for the ERC-20 smart
          contract, ERC-721 defines the minimum interface—ownership details,
          security, and metadata—required for the exchange and distribution of
          gaming tokens. The ERC-1155 standard takes the concept further by
          reducing the transaction and storage costs required for NFTs and
          batching multiple types of non-fungible tokens into a single
          contract.6 Perhaps the most famous use case for NFTs is that of
          cryptokitties. Launched in November 2017, cryptokitties are digital
          representations of cats with unique identifications on Ethereum’s
          blockchain. Each kitty is unique and has a price in ether. They
          reproduce among themselves and produce new offspring, which have
          different attributes and valuations compared to their parents. Within
          a few short weeks of their launch, cryptokitties racked up a fan base
          that spent $20 million worth of ether to purchase, feed, and nurture
          them. Some enthusiasts even spent upward of $100,000 on the effort.7
          More recently, the Bored Ape Yacht Club has garnered controversial
          attention for its high prices, celebrity following, and high-profile
          thefts of some of its 10,000 NFTs.89 Though the cryptokitties and
          Bored Ape Yacht Club use cases may sound trivial, others have more
          serious business implications. For example, NFTs have been used in
          private equity transactions as well as real estate deals.10 One of the
          implications of enabling multiple types of tokens in a contract is the
          ability to provide escrow for different types of NFTs—from artwork to
          real estate—into a single financial transaction.
        </Typography>
      </Box>
    </Container>
  );
};

export default HowItWorks;
