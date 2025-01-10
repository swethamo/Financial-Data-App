import React from "react";

function FinancialTable({ data, onSort, sortField, sortDirection }) {
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === "ascending" ? "descending" : "ascending";
    onSort(field, direction);
  };

  // Determine the arrow to display based on sort direction
  const getArrow = (field) => {
    if (sortField === field) {
      return sortDirection === "ascending" ? "↑" : "↓";
    }
    // Show the default arrow for "date", "revenue", and "netIncome"
    if (["date", "revenue", "netIncome"].includes(field)) {
      return "↑";
    }
    return "";
  };

  return (
    <table className="financial-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("date")}>
            Date {getArrow("date")}
          </th>
          <th onClick={() => handleSort("revenue")}>
            Revenue {getArrow("revenue")}
          </th>
          <th onClick={() => handleSort("netIncome")}>
            Net Income {getArrow("netIncome")}
          </th>
          <th>Gross Profit</th>
          <th>EPS</th>
          <th>Operating Income</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.revenue}</td>
            <td>{item.netIncome}</td>
            <td>{item.grossProfit}</td>
            <td>{item.eps}</td>
            <td>{item.operatingIncome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FinancialTable;
