import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FinancialTable from "./components/FinancialTable";
import FinancialFilter from "./components/FinancialFilter";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date", // default to "date" column
    direction: "ascending", // default to ascending
  });

  // Fetch financial data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=5bQ9ZnrTvBaN3vBV4n504VAeama9zTax"
      );
      const result = await response.json();

      // Map and format the data (if needed)
      const formattedData = result.map((item) => ({
        date: item.date,
        revenue: item.revenue,
        netIncome: item.netIncome,
        grossProfit: item.grossProfit,
        eps: item.eps,
        operatingIncome: item.operatingIncome,
      }));

      setData(formattedData);
      setFilteredData(formattedData);
    };

    fetchData();
  }, []);

  // Filter function
  const applyFilters = (filters) => {
    const { dateRange, revenueRange, netIncomeRange } = filters;

    const filtered = data.filter((item) => {
      const year = new Date(item.date).getFullYear();
      const revenue = item.revenue || 0;
      const netIncome = item.netIncome || 0;

      return (
        year >= dateRange.start &&
        year <= dateRange.end &&
        revenue >= revenueRange.min &&
        revenue <= revenueRange.max &&
        netIncome >= netIncomeRange.min &&
        netIncome <= netIncomeRange.max
      );
    });

    setFilteredData(filtered);
  };

  // Handle sorting of data (for date, revenue, netIncome only)
  const handleSort = (key, direction) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return direction === "ascending" ? dateA - dateB : dateB - dateA;
      } else {
        return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto p-4">
      <Header />

      {/* Flexbox layout for table and filters */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {" "}
        <div style={{ flex: 1 }}>
          <FinancialTable
            data={filteredData}
            sortField={sortConfig.key}
            sortDirection={sortConfig.direction}
            onSort={handleSort}
          />
        </div>
        <div style={{ width: "250px", marginLeft: "20px" }}>
          <FinancialFilter onFilter={applyFilters} />
        </div>
      </div>
    </div>
  );
};

export default App;
