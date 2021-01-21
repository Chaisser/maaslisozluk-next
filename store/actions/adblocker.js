export const GET_STATUS = "GET_STATUS";

export const getStatus = (adblockerStatus) => {
  return {
    type: GET_STATUS,
    status: adblockerStatus,
  };
};
