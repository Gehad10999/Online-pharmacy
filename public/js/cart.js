// تحميل الكارت من localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// حفظ الكارت في localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// تحديث عرض الكارت بالكامل
function updateCart() {
    const cart = getCart();
    const cartTableBody = document.getElementById("cart-items");
    cartTableBody.innerHTML = "";

    let total = 0;

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

    document.getElementById("total-price").textContent = total.toFixed(2) + " EGP";
}

// تغيير الكمية
function changeQuantity(index, delta) {
    const cart = getCart();
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    saveCart(cart);
    updateCart();
}

// إزالة عنصر
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCart();
}

// إتمام الشراء
// cart.js

// تحميل الكارت من localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// حفظ الكارت في localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// تحديث عرض الكارت بالكامل
function updateCart() {
    const cart = getCart();
    const cartTableBody = document.getElementById("cart-items");
    cartTableBody.innerHTML = "";

    let total = 0;

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

    document.getElementById("total-price").textContent = total.toFixed(2) + " EGP";
}

// تغيير الكمية
function changeQuantity(index, delta) {
    const cart = getCart();
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    saveCart(cart);
    updateCart();
}

// إزالة عنصر
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCart();
}

// إتمام الشراء
function checkout() {
    alert("Checkout successful!");
    localStorage.removeItem("cart");
    updateCart();
}

// عند تحميل الصفحة
window.onload = updateCart;

// توجيه المستخدم إلى صفحة Checkout
function goToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        window.location.href = "checkout.html";
    } else {
        alert("Your cart is empty.");
    }
}


// عند تحميل الصفحة
window.onload = updateCart;
