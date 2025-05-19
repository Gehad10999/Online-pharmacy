function createProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <img class="product-img" src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="product-id">ID: ${product.id}</div>
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

function addToCart(product, qty) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingIndex = cart.findIndex(item => item.id === product.id);
  qty = parseInt(qty);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += qty;
  } else {
    product.quantity = qty;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.querySelector('.cart-count');
  if (countElement) {
    countElement.textContent = totalItems;
  }
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
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }, qty);
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/products');
    const allProducts = await res.json();

    const categories = {
      cosmetics: [],
      haircare: [],
      mombaby: [],
      medicine: [],
      skincare: []
    };

    allProducts.forEach(p => {
      if (categories[p.category]) {
        categories[p.category].push(p);
      }
    });

    renderCategory('Cosmetics', categories.cosmetics, 'cosmetics-container');
    renderCategory('Hair Care', categories.haircare, 'haircare-container');
    renderCategory('Mom & Baby', categories.mombaby, 'mombaby-container');
    renderCategory('Medicine', categories.medicine, 'medicine-container');
    renderCategory('Skin Care', categories.skincare, 'skincare-container');

    updateCartCount();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});
