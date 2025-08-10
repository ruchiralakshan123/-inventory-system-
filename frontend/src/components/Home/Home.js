import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

function Home() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const result = await axios.get("http://localhost:8080/inventory");
      setInventory(result.data);
    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  };

  const filteredData = inventory.filter((item) =>
    item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Top Navigation Buttons */}
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => navigate('/home')}>Home</button>
        <button className="nav-btn" onClick={() => navigate('/userProfile')}>Profile</button>
        <button className="nav-btn" onClick={() => navigate('/login')}>Logut</button>

      </div>

      {/* Search Box */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <h1 className="inventory-title">Inventory Items</h1>

      {/* Inventory List */}
      <div className="inventory-grid">
        {filteredData.map((item, index) => (
          <div key={index} className="inventory-card">
            <p className="item-id">{item.itemId}</p>

            <div className="image-wrapper">
              {item.itemImage ? (
                <img
                  src={`http://localhost:8080/inventory/uploads/${item.itemImage}`}
                  alt={item.itemName}
                  className="item-image"
                />
              ) : (
                <p className="no-image">No Image</p>
              )}
            </div>

            <p className="item-name">{item.itemName}</p>
            <p className="item-category">{item.itemCategory}</p>
            <p className="item-qty">Quantity: {item.itemQty}</p>
            <p className="item-details">{item.itemDetails}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
