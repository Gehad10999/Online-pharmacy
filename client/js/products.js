function createProductCard(product) {
    return `
      <div class="product-card">
        <img class="product-img" src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <span class="price">${product.price} EGP</span>
          <div class="quantity-controls">
            <div class="quantity">
              <button class="qty-minus">-</button>
              <input type="text" value="1" readonly>
              <button class="qty-plus">+</button>
            </div>
            <button class="add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Rest of your JavaScript remains the same...
  function addToCart(product, qty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.name === product.name);
    qty = parseInt(qty);
  
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += qty;
    } else {
      product.quantity = qty;
      cart.push(product);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
  }
  
  function goToCart() {

    window.location.href = 'cart.html';
  }
  
  function renderCategory(categoryTitle, products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    container.innerHTML = products.map(createProductCard).join('');
  
    container.querySelectorAll('.product-card').forEach((card, index) => {
      const minusBtn = card.querySelector('.qty-minus');
      const plusBtn = card.querySelector('.qty-plus');
      const qtyInput = card.querySelector('input');
      const addToCartBtn = card.querySelector('.add-to-cart');
  
      minusBtn.addEventListener('click', () => {
        let qty = parseInt(qtyInput.value);
        if (qty > 1) qtyInput.value = qty - 1;
      });
  
      plusBtn.addEventListener('click', () => {
        let qty = parseInt(qtyInput.value);
        qtyInput.value = qty + 1;
      });
  
      addToCartBtn.addEventListener('click', () => {
        const product = products[index];
        const qty = parseInt(qtyInput.value);
        
        addToCart({
          name: product.name,
          price: product.price,
          image: product.image
        }, qty);
        
setTimeout(() => {
  goToCart();
}, 100);       });
    });
  }
  
  
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:5000/product/all');
      const productData = await response.json();
  
      renderCategory('Cosmetics', productData.cosmetics || [], 'cosmetics-container');
      renderCategory('Hair Care', productData.haircare || [], 'haircare-container');
      renderCategory('Mom & Baby', productData.mombaby || [], 'mombaby-container');
      renderCategory('Medicine', productData.medicine || [], 'medicine-container');
      renderCategory('Skin Care', productData.skincare || [], 'skincare-container');
  
      updateCartCount();
    } catch (err) {
      console.error('Failed to load product data:', err);
    }
  });