import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventorySystem = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [inventory] = useState([
    { id: 1, name: 'Laptop Computer', category: 'Electronics', quantity: 15, price: 85000, status: 'In Stock', supplier: 'Tech Solutions' },
    { id: 2, name: 'Office Chair', category: 'Furniture', quantity: 8, price: 12000, status: 'Low Stock', supplier: 'Furniture World' },
    { id: 3, name: 'Printer Paper', category: 'Stationery', quantity: 50, price: 800, status: 'In Stock', supplier: 'Office Supplies Ltd' },
    { id: 4, name: 'Monitor 24"', category: 'Electronics', quantity: 3, price: 28000, status: 'Low Stock', supplier: 'Tech Solutions' },
    { id: 5, name: 'Desk Lamp', category: 'Furniture', quantity: 20, price: 3500, status: 'In Stock', supplier: 'Lighting Co.' },
    { id: 6, name: 'Notebook Set', category: 'Stationery', quantity: 0, price: 450, status: 'Out of Stock', supplier: 'Paper Plus' },
    { id: 7, name: 'Smartphone', category: 'Electronics', quantity: 12, price: 65000, status: 'In Stock', supplier: 'Mobile World' },
    { id: 8, name: 'Filing Cabinet', category: 'Furniture', quantity: 5, price: 22000, status: 'In Stock', supplier: 'Furniture World' }
  ]);

  const categories = ['All', 'Electronics', 'Furniture', 'Stationery'];

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const filteredInventory = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return '#28a745';
      case 'Low Stock': return '#ffc107';
      case 'Out of Stock': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getTotalValue = () => {
    return inventory.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const getStockSummary = () => {
    const inStock = inventory.filter(item => item.status === 'In Stock').length;
    const lowStock = inventory.filter(item => item.status === 'Low Stock').length;
    const outOfStock = inventory.filter(item => item.status === 'Out of Stock').length;
    return { inStock, lowStock, outOfStock };
  };

  const stockSummary = getStockSummary();

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>My Inventory</div>
            <div style={styles.subtitle}>Inventory Management System</div>
          </div>

          <nav style={styles.desktopNav}>
            <button style={{ ...styles.button, ...styles.loginButton }} onClick={handleLogin}>Login</button>
            <button style={{ ...styles.button, ...styles.signupButton }} onClick={handleRegister}>Create Account</button>
          </nav>

          <button
            style={isMenuOpen ? { ...styles.mobileMenuButton, ...styles.mobileMenuOpen } : styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div style={styles.mobileNav}>
            <button style={styles.mobileButton} onClick={() => { handleLogin(); setIsMenuOpen(false); }}>Login</button>
            <button style={styles.mobileButton} onClick={() => { handleRegister(); setIsMenuOpen(false); }}>Create Account</button>
          </div>
        )}
      </header>

     <main style={styles.main}>
        <section style={styles.dashboardSection}>
          <h2 style={styles.sectionTitle}>📊 Dashboard Overview</h2>
          <div style={styles.summaryGrid}>
            <div style={{ ...styles.summaryCard, ...styles.summaryCardBlue }}>
              <div style={styles.cardIcon}>📦</div>
              <h3 style={styles.summaryTitle}>Total Items</h3>
              <div style={styles.summaryValue}>{inventory.length}</div>
              <div style={styles.cardSubtext}>Items in catalog</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.summaryCardGreen }}>
              <div style={styles.cardIcon}>💰</div>
              <h3 style={styles.summaryTitle}>Total Value</h3>
              <div style={styles.summaryValue}>Rs. {getTotalValue().toLocaleString()}</div>
              <div style={styles.cardSubtext}>Inventory worth</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.summaryCardSuccess }}>
              <div style={styles.cardIcon}>✅</div>
              <h3 style={styles.summaryTitle}>In Stock</h3>
              <div style={styles.summaryValue}>{stockSummary.inStock}</div>
              <div style={styles.cardSubtext}>Available items</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.summaryCardWarning }}>
              <div style={styles.cardIcon}>⚠️</div>
              <h3 style={styles.summaryTitle}>Low Stock</h3>
              <div style={styles.summaryValue}>{stockSummary.lowStock}</div>
              <div style={styles.cardSubtext}>Need restocking</div>
            </div>
            <div style={{ ...styles.summaryCard, ...styles.summaryCardDanger }}>
              <div style={styles.cardIcon}>❌</div>
              <h3 style={styles.summaryTitle}>Out of Stock</h3>
              <div style={styles.summaryValue}>{stockSummary.outOfStock}</div>
              <div style={styles.cardSubtext}>Unavailable items</div>
            </div>
          </div>
        </section>

        <section style={styles.inventorySection}>
          <h2 style={styles.sectionTitle}>🏪 Inventory Management</h2>

          <div style={styles.controlsContainer}>
            <div style={styles.searchContainer}>
              <div style={styles.searchIcon}>🔍</div>
              <input
                type="text"
                placeholder="Search items or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.categoryContainer}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={selectedCategory === category ? { ...styles.categoryButton, ...styles.categoryButtonActive } : styles.categoryButton}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.target.style.backgroundColor = '#f0f9ff';
                      e.target.style.borderColor = '#2e8555';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.target.style.backgroundColor = '#fff';
                      e.target.style.borderColor = '#e0e7ff';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {category === 'All' ? '📋' : category === 'Electronics' ? '💻' : category === 'Furniture' ? '🪑' : '📝'} {category}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.tableContainer}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Item Name</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Price (Rs.)</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item, index) => {
                    const statusColors = getStatusColor(item.status);
                    return (
                      <tr 
                        key={item.id} 
                        style={{
                          ...styles.tableRow,
                          backgroundColor: index % 2 === 0 ? '#fff' : '#f8fafc'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e0f2fe';
                          e.currentTarget.style.transform = 'scale(1.01)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f8fafc';
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <td style={styles.td}>
                          <div style={styles.idBadge}>#{item.id}</div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.itemName}>
                            {item.category === 'Electronics' ? '💻' : item.category === 'Furniture' ? '🪑' : '📝'} {item.name}
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.categoryBadge}>{item.category}</div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.quantityDisplay}>
                            <span style={styles.quantityNumber}>{item.quantity}</span>
                            <span style={styles.quantityLabel}>units</span>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.priceDisplay}>Rs. {item.price.toLocaleString()}</div>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: statusColors.bg,
                            color: statusColors.color,
                            border: `1px solid ${statusColors.border}`
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.supplierName}>🏢 {item.supplier}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>📦 My Inventory System</h3>
            <p style={styles.footerDescription}>
              Professional inventory management solution for your business needs.
              Track, manage and optimize your stock efficiently with modern technology.
            </p>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>📞 Contact Information</h4>
            <p style={styles.footerContact}>📱 +94 77 123 4567</p>
            <p style={styles.footerContact}>✉️ ruchiralakshan2003@gmil.com</p>
            <p style={styles.footerContact}>📍 123 Business Street, Colombo 03, Sri Lanka</p>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>🔗 Quick Links</h4>
            <ul style={styles.footerLinks}>
               <li><button style={styles.footerLink} onClick={() => {/* navigate or alert */}}>About Us</button></li>
               <li><button style={styles.footerLink} onClick={() => {}}>Services</button></li>
               <li><button style={styles.footerLink} onClick={() => {}}>Support</button></li>
               <li><button style={styles.footerLink} onClick={() => {}}>Privacy Policy</button></li>
            <li><button style={styles.footerLink} onClick={() => {}}>Terms of Service</button></li>
            </ul>

          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerSectionTitle}>⏰ Business Hours</h4>
            <p style={styles.footerTime}>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p style={styles.footerTime}>Saturday: 9:00 AM - 4:00 PM</p>
            <p style={styles.footerTime}>Sunday: Closed</p>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.footerBottomContent}>
            &copy; 2025 My Inventory System. All rights reserved. | Made with ❤️ in Sri Lanka
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    backgroundColor: '#f8fafc',
  },
  header: {
    background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#1e40af',
    letterSpacing: '-0.5px',
    textShadow: '0 2px 4px rgba(30, 64, 175, 0.1)',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500',
    marginTop: 2,
  },
  desktopNav: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    fontSize: '1rem',
    padding: '0.8rem 1.8rem',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 130,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  loginButton: {
    backgroundColor: 'transparent',
    color: '#2e8555',
    border: '2px solid #2e8555',
  },
  signupButton: {
    backgroundColor: '#2e8555',
    color: '#fff',
    border: '2px solid #2e8555',
    boxShadow: '0 4px 12px rgba(46, 133, 85, 0.2)',
  },
  mobileMenuButton: {
    display: 'none',
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#374151',
  },
  mobileMenuOpen: {
    color: '#2e8555',
    fontWeight: '700',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem 2rem',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
  },
  mobileButton: {
    padding: '0.8rem',
    backgroundColor: '#2e8555',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    padding: '2rem 0',
  },
  dashboardSection: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 2rem 3rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
    borderRadius: 16,
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  summaryCardBlue: {
    borderLeft: '4px solid #3b82f6',
  },
  summaryCardGreen: {
    borderLeft: '4px solid #10b981',
  },
  summaryCardSuccess: {
    borderLeft: '4px solid #22c55e',
  },
  summaryCardWarning: {
    borderLeft: '4px solid #f59e0b',
  },
  summaryCardDanger: {
    borderLeft: '4px solid #ef4444',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    display: 'block',
  },
  summaryTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  summaryValue: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: 1,
    marginBottom: '0.5rem',
  },
  cardSubtext: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  inventorySection: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 2rem',
  },
  controlsContainer: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'relative',
    flex: '1',
    minWidth: '300px',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.2rem',
    color: '#94a3b8',
    zIndex: 10,
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  categoryContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: '0.8rem 1.5rem',
    border: '2px solid #e0e7ff',
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
  },
  categoryButtonActive: {
    backgroundColor: '#2e8555',
    borderColor: '#2e8555',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(46, 133, 85, 0.3)',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  tableHeader: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  },
  th: {
    padding: '1.5rem 1rem',
    textAlign: 'left',
    fontWeight: '700',
    color: '#374151',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e2e8f0',
  },
  tableRow: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  td: {
    padding: '1.25rem 1rem',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle',
  },
  idBadge: {
    display: 'inline-block',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    borderRadius: 8,
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  itemName: {
    fontWeight: '600',
    color: '#1e293b',
    fontSize: '1rem',
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '0.4rem 1rem',
    backgroundColor: '#f0f9ff',
    color: '#0369a1',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  quantityDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityNumber: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1e293b',
  },
  quantityLabel: {
    fontSize: '0.7rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  priceDisplay: {
    fontWeight: '600',
    color: '#059669',
    fontSize: '1rem',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  supplierName: {
    color: '#64748b',
    fontWeight: '500',
  },
  footer: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    color: '#fff',
    marginTop: 'auto',
  },
  footerContainer: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '3rem 2rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#f8fafc',
  },
  footerSectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#cbd5e1',
  },
  footerDescription: {
    lineHeight: 1.6,
    color: '#94a3b8',
    fontSize: '0.95rem',
  },
  footerContact: {
    margin: '0.5rem 0',
    color: '#cbd5e1',
    fontSize: '0.95rem',
  },
  footerTime: {
    margin: '0.3rem 0',
    color: '#cbd5e1',
    fontSize: '0.9rem',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
    display: 'block',
    padding: '0.3rem 0',
  },
  footerBottom: {
    borderTop: '1px solid #475569',
    padding: '1.5rem 0',
  },
  footerBottomContent: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 2rem',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '0.9rem',
  },
};

export default InventorySystem;