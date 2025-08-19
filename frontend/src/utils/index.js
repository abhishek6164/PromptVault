export const handleError = (message) => {
  console.error("Error:", message);
  alert(message);
};

export const handleSuccess = (message) => {
  console.log("Success:", message);
  alert(message);
};


export const apiRequest = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // 👈 Token attach
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  return response.json();
};