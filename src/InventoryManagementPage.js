import React, { useState, useEffect } from "react";
import data from '../src/mock-data.json'
import './styles.css'

const InventoryManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    console.log(data.products)
    // Set the initial products state with data.products
    setProducts(data.products);
    setFilteredProducts(data.products);
  }, [data]);

  useEffect(() => {
    // Filter products based on the search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered products by name
    const sorted = filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setFilteredProducts(sorted);
  }, [products, searchQuery, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="inventory-management">
    <h2>Inventory Management</h2>
    <div className="filter-controls">
      <label>
        Search Products:
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
      </label>
      <label>
        Sort by Name:
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.category}</td>
            <td>
              <img src={product.image} alt={product.name} width="100" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>);
};

export default InventoryManagementPage;
