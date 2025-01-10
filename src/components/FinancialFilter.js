import React, { useState } from "react";
import { Slider, Typography, Button } from "@mui/material";

function FinancialFilter({ onFilter }) {
  const [dateRange, setDateRange] = useState([1990, 2025]);
  const [revenueRange, setRevenueRange] = useState([0, 400000000000]);
  const [netIncomeRange, setNetIncomeRange] = useState([0, 100000000000]);

  const handleRangeChange = (range, setRange) => (e, newValue) => {
    if (newValue[0] <= newValue[1]) {
      setRange(newValue);
    } else {
      // Ensure min stays less than or equal to max
      setRange([Math.min(newValue[0], newValue[1]), Math.max(newValue[0], newValue[1])]);
    }
  };


  const handleFilterChange = () => {
    onFilter({
      dateRange: { start: dateRange[0], end: dateRange[1] },
      revenueRange: { min: revenueRange[0], max: revenueRange[1] },
      netIncomeRange: { min: netIncomeRange[0], max: netIncomeRange[1] },
    });
  };

  return (
    <div
      style={{
        padding: "15px 20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "15px auto",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
 
      {/* Date Range Filter */}
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: "15px" }}>
        Date Range (Years)
      </Typography>
      <Slider
        value={dateRange}
        onChange={(e, newValue) => setDateRange(newValue)}
        valueLabelDisplay="auto"
        min={1990}
        max={2025}
        step={1}
        style={{ color: "#162055" }}
      />

      {/* Revenue Range Filter */}
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: "15px" }}>
        Revenue Range
      </Typography>
      <Slider
        value={revenueRange}
        onChange={(e, newValue) => setRevenueRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={400000000000}
        step={10000}
        style={{ color: "#162055" }}
      />

      {/* Net Income Range Filter */}
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: "15px" }}>
        Net Income Range
      </Typography>
      <Slider
        value={netIncomeRange}
        onChange={(e, newValue) => setNetIncomeRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={100000000000}
        step={10000}
        style={{ color: "#162055" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleFilterChange}
        style={{
          marginTop: "20px",
          backgroundColor: "#162055",
          padding: "10px 20px",
          fontSize: "14px",
          maxWidth: '160px',
          alignSelf: 'flex-end', // Align to the right


        }}
      >
        Apply Filters
      </Button>
    </div>
  );
}

export default FinancialFilter;
