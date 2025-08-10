import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles.css";

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/inventory/${id}`);
        setFormData({
          itemId: res.data.itemId || "",
          itemName: res.data.itemName || "",
          itemCategory: res.data.itemCategory || "",
          itemQty: res.data.itemQty || "",
          itemDetails: res.data.itemDetails || "",
        });
      } catch (err) {
        setError("Failed to fetch item details");
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.put(`http://localhost:8080/inventory/${id}`, formData);
      alert("Item updated successfully!");
      navigate("/allitems");
    } catch (err) {
      setError("Failed to update item");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Update Inventory Item</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item ID</label>
            <input
              type="text"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Item Category</label>
            <select
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Apparel & Fashion">Apparel & Fashion</option>
              <option value="Electronics & Gadgets">Electronics & Gadgets</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Home & Furniture">Home & Furniture</option>
            </select>
          </div>
          <div className="form-group">
            <label>Item Quantity</label>
            <input
              type="number"
              name="itemQty"
              value={formData.itemQty}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Item Details</label>
            <textarea
              name="itemDetails"
              value={formData.itemDetails}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Update Item
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/allitems")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem;
