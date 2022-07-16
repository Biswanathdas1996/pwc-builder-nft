export const getSymbol = () => {
  const getcurrentNetworkId = sessionStorage.getItem("currentyNetwork");
  if (getcurrentNetworkId === "80001") {
    return "MATIC";
  } else {
    return "INR";
  }
};
