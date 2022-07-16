export const currentNeteork = () => {
  const getcurrentNetworkId = sessionStorage.getItem("currentyNetwork");
  if (getcurrentNetworkId === "80001") {
    return "Polygon";
  } else {
    return "Ethereum";
  }
};
