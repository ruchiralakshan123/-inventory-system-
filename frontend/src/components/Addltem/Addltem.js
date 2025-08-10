import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles.css";

function AddItem() {
  const [inventory, setInventory] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null,
  });

  const { itemId, itemName, itemCategory, itemQty, itemDetails } = inventory;

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'itemImage') {
      setInventory({ ...inventory, itemImage: files[0] });
    } else {
      setInventory({ ...inventory, [name]: value });
    }
  };

  // 🔧 Updated function: now it sends FormData with JSON + optional image
  const onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 🔧 itemDetails sent as JSON string
    formData.append("itemDetails", JSON.stringify({
      itemId: inventory.itemId,
      itemName: inventory.itemName,
      itemCategory: inventory.itemCategory,
      itemQty: inventory.itemQty.toString(), // 🔧 Ensured it's a string
      itemDetails: inventory.itemDetails
    }));

    // 🔧 Only add image if selected
    if (inventory.itemImage) {
      formData.append("file", inventory.itemImage);
    }

    try {
      await axios.post("http://localhost:8080/inventory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Item added successfully!");

      // 🔧 Reset form after successful submission
      setInventory({
        itemId: generateItemId(),
        itemName: "",
        itemCategory: "",
        itemQty: "",
        itemDetails: "",
        itemImage: null,
      });
    } catch (error) {
      console.error("❌ Error adding item:", error);
      alert("Failed to add item. Check console for details.");
    }
  };

  // 🆕 Used to generate random unique ID
  const generateItemId = () => {
    const prefix = 'ID';
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  // 🔧 Generates ID on first load
  useEffect(() => {
    setInventory((prevInputs) => ({
      ...prevInputs,
      itemId: generateItemId(),
    }));
  }, []);

  return (
    <div className="container">
      <div className="form-container">
        <h2>📦 Add New Item</h2>
        <form onSubmit={onsubmit}>
          <div className="form-group">
            <label htmlFor="itemId">🏷️ Item ID</label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              value={itemId}
              onChange={onInputChange}
              readOnly
              placeholder="Auto-generated ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemName">📝 Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={onInputChange}
              required
              placeholder="Enter item name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemCategory">📋 Item Category</label>
            <select
              id="itemCategory"
              name="itemCategory"
              value={itemCategory}
              onChange={onInputChange}
              required
            >
              <option value="">Select Item Category</option>
              <option value="Apparel & Fashion">👕 Apparel & Fashion</option>
              <option value="Electronics & Gadgets">📱 Electronics & Gadgets</option>
              <option value="Health & Beauty">💄 Health & Beauty</option>
              <option value="Food & Dining">🍕 Food & Dining</option>
              <option value="Home & Furniture">🏠 Home & Furniture</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="itemQty">📊 Item Quantity</label>
            <input
              type="number"
              id="itemQty"
              name="itemQty"
              value={itemQty}
              onChange={onInputChange}
              required
              min="1"
              placeholder="Enter quantity"
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemDetails">📄 Item Details</label>
            <textarea
              id="itemDetails"
              name="itemDetails"
              value={itemDetails}
              onChange={onInputChange}
              required
              placeholder="Enter detailed description of the item..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemImage">📸 Item Image</label>
            <input
              type="file"
              id="itemImage"
              name="itemImage"
              accept="image/*"
              onChange={onInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            ✨ Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
