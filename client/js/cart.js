function initializeMockCart() {
  const mockCart = [
    {
      name: "Pain Reliever",
      price: 75.0,
      quantity: 2,
      image: "logo.jpeg"
    },
    {
      name: "Vitamin C Tablets",
      price: 50.0,
      quantity: 1,
      image: "logo.jpeg"
    }
  ];
  localStorage.setItem("cart", JSON.stringify(mockCart));
}

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.length === 0) {
    initializeMockCart();
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  return cart;
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const cart = getCart();
  const cartTableBody = document.getElementById("cart-items");
  let total = 0;
  cartTableBody.innerHTML = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="product-cell">
        <img src="${item.image}" alt="${item.name}" />
        <span>${item.name}</span>
      </td>
      <td>${item.price.toFixed(2)} EGP</td>
      <td>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">–</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
      </td>
      <td>${itemTotal.toFixed(2)} EGP</td>
      <td>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </td>
    `;
    cartTableBody.appendChild(row);
  });

  document.getElementById("total-price").textContent = `${total.toFixed(2)} EGP`;
}

function changeQuantity(index, delta) {
  const cart = getCart();
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  saveCart(cart);
  updateCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCart();
}

function goToCheckout() {
  const cart = getCart();
  if (cart.length > 0) {
    window.location.href = "checkout.html";
  } else {
    alert("Your cart is empty.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initializeMockCart();
  updateCart();
  document.getElementById("checkout-btn").addEventListener("click", goToCheckout);
});