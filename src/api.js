const API_KEY = "5bQ9ZnrTvBaN3vBV4n504VAeama9zTax";
const BASE_URL = "https://financialmodelingprep.com/api/v3";

export const fetchFinancialData = async (symbol = "AAPL") => {
  const url = `${BASE_URL}/income-statement/${symbol}?period=annual&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
