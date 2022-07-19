export const allStates = [
  {
    id: "1",
    type: "List on marketplace and enable transction",
  },
  {
    id: "2",
    type: "List on marketplace and disable transction",
  },
  {
    id: "3",
    type: "Private",
  },
];

export const getTokenListingState = (id) => {
  const filterData = allStates.find((val) => val.id === id);
  return filterData?.type;
};
