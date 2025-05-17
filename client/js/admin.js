
  
  const MOCK_LOW_STOCK_PRODUCTS = [
    { id: 1, name: "Organic Oil", stock: 5, image: "logo.jpeg" },
    { id: 2, name: "Hair Cream", stock: 3, image: "logo.jpeg" },
    { id: 3, name: "Green Soap", stock: 2, image: "logo.jpeg" },
  ];
  
  
  function renderLowStockCard(product) {
    const card = document.createElement('div');
    card.className = 'low-stock-card';
    card.innerHTML = `
      <img src="logo.jpeg">
      <h4>${product.name}</h4>
      <p>${product.stock} items remaining</p>
    `;
    return card;
  }
  
  async function getDashboardStats() {
    try {
      const res = await fetch('http://localhost:5000/count'); 
      const data = await res.json();
  
      document.getElementById("statProducts").textContent = data.total_products ?? '--';
      document.getElementById("statOrders").textContent = data.total_orders ?? '--';
      document.getElementById("statUsers").textContent = data.total_users ?? '--';
      document.getElementById("statEarnings").textContent = data.total_earnings ?? '--';
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  }
  
  
  async function loadLowStockProducts() {
    try {
        const res = await fetch('http://localhost:5000/product'); 
        data = await res.json();
        data = data.low_stock_products;
        console.log(data)
  
      const container = document.getElementById('lowStockContainer');
      container.innerHTML = '';
  
      if (!data || data.length === 0) {
        container.innerHTML = '<p>All products are in stock 👍</p>';
        return;
      }
  
      data.forEach(product => {
        const card = renderLowStockCard(product);
        container.appendChild(card);
      });
    } catch (err) {
      console.error('Failed to fetch low stock products:', err);
    }
  }
  
  async function addProduct(name, price, stock, image_url , category) {
    try {
      const res = await fetch('http://localhost:5000/product/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, stock, image_url , category })
      });
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to add product:', err);
      return { success: false };
    }
  }
  
  function handleAddProduct() {
    const name = document.getElementById('addName').value.trim();
    const price = document.getElementById('addPrice').value.trim();
    const stock = document.getElementById('addStock').value.trim();
    const image_url = document.getElementById('addImage').value.trim();
    const category = document.getElementById('addCat').value.trim();

  
    if (!name || !price || !stock || !image_url || !category) {
      alert("Please fill in all fields");
      return;
    }
  
    addProduct(name, price, stock, image_url , category).then(response => {
      if (response?.success) {
        alert("Product added successfully!");
        clearInputs();
        closePopup();
      } else {
        alert("Failed to add product, try again");
      }
    });
  }
  
  async function deleteProduct() {
    const productId = document.getElementById('deleteId').value.trim();
    if (!productId) {
      alert("Enter a product ID");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:5000/product/${productId}`, {
        method: 'DELETE'
      });
  
      if (res.ok) {
        alert("Deleted successfully");
        closePopup();
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert("Error deleting product");
    }
  }
  
  
  function clearInputs() {
    ['addName', 'addPrice', 'addStock', 'addImage', 'deleteId', 'deleteName'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }
  
  function openPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
  }
  
  function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("addProductBox").style.display = "none";
    document.getElementById("deleteProductBox").style.display = "none";
    document.getElementById("actionButtons").style.display = "flex";
    document.getElementById("mainTitle").style.display = "block";
    clearInputs();
  }
  
  function showAddProduct() {
    document.getElementById("addProductBox").style.display = "block";
    document.getElementById("deleteProductBox").style.display = "none";
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
  }
  
  function showDeleteProduct() {
    document.getElementById("deleteProductBox").style.display = "block";
    document.getElementById("addProductBox").style.display = "none";
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("mainTitle").style.display = "none";
  }
  
  // Initialize dashboard with mocked data
  document.addEventListener('DOMContentLoaded', () => {
    getDashboardStats();
    loadLowStockProducts();
  });