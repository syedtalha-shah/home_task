import React, { useState } from "react";
import data from '../src/mock-data.json'
import './styles.css'

function ProductRegistration() {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    initialStock: "",
    productImage: null
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      productName,
      productDescription,
      productPrice,
      initialStock,
      productImage
    } = formData;

    if (!productName || isNaN(productPrice) || initialStock <= 0) {
      alert("Please fill out all required fields correctly.");
      return;
    }
    const newProduct = {
      id: (data.products.length + 1).toString(), 
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      category: "New Category", 
      image: "product_image_url_here" 
    };

    data.products.push(newProduct);
    data.inventory.push({
      productId: newProduct.id,
      initialStock: parseInt(initialStock, 10),
      currentStock: parseInt(initialStock, 10),
      lowStockThreshold: 10 
    });

    setFormData({
      productName: "",
      productDescription: "",
      productPrice: "",
      initialStock: "",
      productImage: null
    });

    alert("Product registered successfully!");
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Product Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label className="registration-label">
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="registration-input"
          />
        </label>
        <label className="registration-label">
          Description:
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="registration-input"
          ></textarea>
        </label>
        <label className="registration-label">
          Price:
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            className="registration-input"
          />
        </label>
        <label className="registration-label">
          Initial Stock Level:
          <input
            type="number"
            name="initialStock"
            value={formData.initialStock}
            onChange={handleInputChange}
            className="registration-input"
          />
        </label>
        <label className="registration-label">
          Product Image:
          <input
            type="file"
            name="productImage"
            onChange={handleInputChange}
            accept="image/*"
            className="registration-input"
          />
        </label>
        <button type="submit" className="registration-button">
          Add Product
        </button>
      </form>
    </div>  );
}

export default ProductRegistration;
