// checkout.js

window.onload = function () {
    displayOrderSummary();
};

// عرض ملخص الطلب
// تعديل الكود في ملف checkout.js
// تعديل الكود في ملف checkout.js لعرض الصورة والسعر
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryContainer = document.getElementById("order-items");
    const totalPriceEl = document.getElementById("total-price");

    let total = 0;
    summaryContainer.innerHTML = "";

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // إضافة صورة المنتج مع الاسم والسعر في الـ Checkout
        const itemEl = document.createElement("div");
        itemEl.className = "order-item";
        itemEl.innerHTML = `
            <div class="order-item-img">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="order-item-details">
                <span>${item.name} x ${item.quantity}</span>
                <span>${item.price.toFixed(2)} EGP</span>
                <span>Total: ${(itemTotal).toFixed(2)} EGP</span>
            </div>
        `;
        summaryContainer.appendChild(itemEl);
    });

    totalPriceEl.textContent = `Total Price: ${total.toFixed(2)} EGP`;
}

// إرسال الطلب
function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !email || !address) {
        alert("Please fill in all fields.");
        return;
    }

    // محاكاة الطلب
    alert("Order placed successfully!");

    // مسح الكارت بعد إتمام الشراء
    localStorage.removeItem("cart");

    // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    window.location.href = "index.html";
}
