export const handleError = (message) => {
  console.error("Error:", message);
  alert(message);
};

export const handleSuccess = (message) => {
  console.log("Success:", message);
  alert(message);
};
