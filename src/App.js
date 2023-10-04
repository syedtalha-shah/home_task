import React, { useState, useEffect } from "react";
import demoData from "../src/mock-data.json";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import InventoryManagementPage from "./InventoryManagementPage";
import ProductRegistration from "./ProductRegistration";
import './styles.css'

export default function App() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [revenueData, setRevenueData] = useState([]);
  const [data, setData] = useState(demoData || {});

  useEffect(() => {
    const totalOrders = demoData.sales.length;
    const totalSales = demoData.sales.reduce(
      (total, sale) => total + sale.quantity,
      0
    );

    const inventoryData = data.inventory;

    const filteredSales =
      selectedCategory === "All"
        ? data.sales
        : data.sales.filter((sale) => {
            const product = data.products.find(
              (product) => product.id === sale.productId
            );
            return product.category === selectedCategory;
          });
    const revenueByDate = filteredSales.reduce((acc, sale) => {
      const date = new Date(sale.date).toLocaleDateString();

      const product = data.products.find(
        (product) => product.id === sale.productId
      );

      if (product) {
        acc[date] = (acc[date] || 0) + sale.quantity * product.price;
      }

      return acc;
    }, {});

    setTotalOrders(totalOrders);
    setTotalSales(totalSales);
    setInventoryData(inventoryData);

    const revenueChartData = Object.keys(revenueByDate).map((date) => ({
      date,
      revenue: revenueByDate[date]
    }));

    setRevenueData(revenueChartData);

    console.log("Revenue Data:", revenueData);
    console.log("Filtered Sales:", filteredSales);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="inventory-management">
      <h2>Revenue Analysis</h2>
      <div className="filter-controls" >
        <p>Total Orders: {totalOrders}</p>
        <p>Total Sales: {totalSales}</p>
      </div>
      <div className="revenue-analysis">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {data.products &&
            Array.from(
              new Set(data.products.map((product) => product.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>
      <div>
        <h3>Revenue Chart</h3>
        {revenueData.length === 0 ? (
          <p>No revenue data available for the selected category.</p>
        ) : (
          <LineChart width={600} height={300} data={revenueData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        )}
      </div>
      <div>
        <h3>Inventory Chart</h3>
        <BarChart width={600} height={300} data={inventoryData}>
          <XAxis dataKey="productName" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="currentStock" fill="#82ca9d" />
        </BarChart>
      </div>
      <br />
      <br />
      <br />
      <InventoryManagementPage />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ProductRegistration />
    </div>
  );
}
