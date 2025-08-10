// DisplayItem.js with CSS
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles.css"; 

function DisplayItem() {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const result = await axios.get("http://localhost:8080/inventory");
      setInventory(result.data);
      console.log("Inventory loaded:", result.data);

    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  };

  const updateNavigate = (itemId) => {
    navigate(`/updateItem/${itemId}`); // Navigate using correct item id
  };

  const deleteItem = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/inventory/${id}`);
        alert("Item deleted successfully!");
        loadInventory();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item.");
      }
    }
  };

  const generatePdf = (inventory) => {
    const doc = new jsPDF("portrait");
    doc.text("Inventory Item List", 14, 10);

    const tableData = inventory.map((item) => [
      item.itemId,
      item.itemName,
      item.itemCategory,
      item.itemQty,
      item.itemDetails
    ]);

    autoTable(doc, { 
      head: [['Item ID', 'Item Name', 'Category', 'Quantity', 'Details']],
      body: tableData,
      startY: 20,
    });

    doc.save("inventory_item_list.pdf");
  };

  const filteredData = inventory.filter(
    (item) =>
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery) // Added filter for backend primary key `id`
  );

  return (
    <div className="container">
      <h1>Inventory Management</h1>
      
      <div className="action-bar">
        <button onClick={() => navigate('/additem')} className="btn btn-primary">
          Add New Item
        </button>
        <button onClick={() => generatePdf(inventory)} className="btn btn-secondary">
          Generate PDF Report
        </button>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}> {/* Changed key to unique backend ID */}
                <td>{item.itemId}</td>
                <td>
                  {item.itemImage ? (
                    <img
                      src={`http://localhost:8080/inventory/uploads/${item.itemImage}`}
                      alt={item.itemName}
                      className="item-image"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{item.itemName}</td>
                <td>{item.itemCategory}</td>
                <td>{item.itemQty}</td>
                <td className="item-details">{item.itemDetails}</td>
                <td>
                  <button 
                    onClick={() => updateNavigate(item.id)} // Fixed bug: item.Id → item.id
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteItem(item.id)} // Fixed bug: item.Id → item.id
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayItem;
