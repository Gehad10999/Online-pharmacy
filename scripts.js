// فتح البوب اب
const loginSignupBtn = document.getElementById('login-signup-btn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginSignupBtn.addEventListener('click', function () {
    popup.style.display = 'block';
});

function closePopup() {
    popup.style.display = 'none';
}

// التنقل بين login و signup
loginTab.addEventListener('click', function () {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active-form');
    signupForm.classList.remove('active-form');
});

signupTab.addEventListener('click', function () {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
});

// التحكم في زيادة ونقص الكمية
const quantityButtons = document.querySelectorAll('.quantity-btn');

quantityButtons.forEach(button => {
    button.addEventListener('click', function () {
        const quantitySpan = this.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent);

        if (this.classList.contains('increase')) {
            quantity++;
        } else if (this.classList.contains('decrease') && quantity > 1) {
            quantity--;
        }

        quantitySpan.textContent = quantity;
    });
});

// دالة واحدة فقط مسؤولة عن إضافة المنتج للكارت
function addToCart(button) {
    const container = button.closest('.pro');

    const name = container.querySelector('.product-name').textContent;
    const price = parseFloat(container.querySelector('.product-price').textContent.replace("EGP", "").trim());
    const image = container.querySelector('img').getAttribute('src');
    const quantity = parseInt(container.querySelector('.quantity').textContent);

    const product = { name, price, image, quantity };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("تمت إضافة المنتج إلى العربة!");
}
