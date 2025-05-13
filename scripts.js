const products = [
  {name: "RANDO 30 Gm Cream", price: "EGP 97", image: "images/prod1.jpg"},
  {name: "Garnier Tissue Mask Eye", price: "EGP 100", image: "images/pro5.jpg" },
  {name: "Loreal Hyaluron Expert", price: "EGP 250", image: "images/pro6.jpg" },
  {name: "B-complex 100 Tab", price: "EGP 900", image: "images/pro4.png"},
  {name: "Cerelac 125 Gm", price: "EGP 100", image: "images/pro8.jpg"},
  {name: "Panadol Cold & AMP", price: "EGP 130", image: "images/pro7.jpg"}

];

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "pro";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="des">
        <h5 class="product-name">${product.name}</h5>
        <h4 class="product-price">${product.price}</h4>
      </div>
      <div class="hover-button">
        <button class="quick-view" onclick="showModal('${product.name}', '${product.price}', '${product.image}')">عرض سريع</button>
      </div>
    `;

    return card;
  }

  // عرض كل المنتجات في الصفحة
  const container = document.getElementById("products-container");
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // عرض تفاصيل المنتج في النافذة المنبثقة
  function showModal(name, price, image) {
    document.getElementById("modalProductName").textContent = name;
    document.getElementById("modalProductPrice").textContent = price;
    document.getElementById("modalProductImage").src = image;

    const myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.show();
  }







const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close');
const registerBtn = document.getElementById('login-tab');

const signupForm = document.getElementById('signup-form');

loginSignupBtn.addEventListener('click', function () {
    popup.style.display = 'block';
});

function closePopup() {
    popup.style.display = 'none';
}

// التنقل بين login و signup
document.addEventListener('DOMContentLoaded', () => {
    // تأكد من أن العناصر موجودة بالفعل
    const registerBtn = document.querySelector('.register_btn');
    const loginBtn = document.querySelector('.login_btn');
    const container = document.querySelector('.container');
  
    // إذا كانت الأزرار موجودة بشكل صحيح
    if (registerBtn && loginBtn && container) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');  // إضافة الكلاس active عند النقر على "Register"
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');  // إزالة الكلاس active عند النقر على "Login"
        });
    }
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
