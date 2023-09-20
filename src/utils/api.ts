const API_URL = "https://www.universal-tutorial.com/api";
const API_TOKEN_KEY = "OtBahzcXeaFN676_Dyyiq-yXO4sJUwWrrBq5PRCHbjn12kvZxFOeQtc0UkTVdliyKAM";
const USER_EMAIL = "js.velasquez2463@gmail.com";

let currentToken: string | null = null;

const fetchToken = async () => {
  if (currentToken) return currentToken;

  try {
    const response = await fetch(`${API_URL}/getaccesstoken`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "api-token": API_TOKEN_KEY,
        "user-email": USER_EMAIL
      }
    });
    const data = await response.json();
    currentToken = data.auth_token;
    return currentToken;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

const fetchWithToken = async (endpoint: string) => {
  try {
    const token = await fetchToken();
    const response = await fetch(endpoint, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
    return response.json();
  } catch (error) {
    console.error("Error in fetchWithToken:", error);
    throw error;
  }
};

export const getCountries = () => {
  return fetchWithToken(`${API_URL}/countries/`);
};

export const getStates = (countryName: string) => {
  return fetchWithToken(`${API_URL}/states/${countryName}`);
};

export const getCities = (stateName: string) => {
  return fetchWithToken(`${API_URL}/cities/${stateName}`);
};
