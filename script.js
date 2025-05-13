function createProductCard(product) {
  return `
    <div class="product-card">
      <img class="product-img" src="${product.image}" alt="${product.name}">
      <span class="product-info"><h3>${product.name}</h3></span>
      <span class="price">${product.price} EGP</span>
      <div class="quantity">
        <button class="qty-minus">-</button>
        <input type="text" value="1" readonly>
        <button class="qty-plus">+</button>
      </div>
      <div class="hover-actions">
        <button class="add-to-cart">Add to cart!</button>
      </div>
    </div>
  `;
}


  
  function renderCategory(categoryTitle, products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    container.innerHTML = products.map(createProductCard).join('');
  
    container.querySelectorAll('.product-card').forEach(card => {
      const minusBtn = card.querySelector('.qty-minus');
      const plusBtn = card.querySelector('.qty-plus');
      const qtyInput = card.querySelector('input');
  
      minusBtn.addEventListener('click', function () {
        let qty = parseInt(qtyInput.value);
        if (qty > 1) qtyInput.value = qty - 1;
      });
  
      plusBtn.addEventListener('click', function () {
        let qty = parseInt(qtyInput.value);
        qtyInput.value = qty + 1;
      });
  
      const addToCartBtn = card.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', function () {
        const productName = card.querySelector('h3').textContent;
        const qty = qtyInput.value;
          addToCartBtn.textContent = `Added ${qty} x ${productName} to cart`;

          setTimeout(() => {
  addToCartBtn.textContent = 'Add to cart!';
  addToCartBtn.disabled = false;
}, 2000);

      });
    });
  }
  

// البيانات الخاصة بالمنتجات
const cosmetics = [
    { name: 'Matte Lipstick', price: '220', image: 'imgs/co1.jpg' },
    { name: 'Fit Me Foundation', price: '295', image: 'imgs/co2.jpg' },
    { name: 'Volume Mascara', price: '260', image: 'imgs/co3.jpg' },
    { name: 'SHEGLAM Spray', price: '793', image: 'imgs/co4.jpg' },
    { name: 'Rimmel Bronzer', price: '500', image: 'imgs/co5.jpg' },
    { name: 'Amanda Lip Balm', price: '40', image: 'imgs/co6.jpg' },
    { name: 'Concealer', price: '267', image: 'imgs/co7.jpg' },
    { name: 'Power Grip Primer', price: '1,099', image: 'imgs/co8.jpg' }
];

const hairCare = [
    { name: 'L’Oréal Paris Elvive Shampoo', price: '101', image: 'imgs/hc1.jpg' },
    { name: 'Rosemary Mint Scalp & Hair Oil', price: '899', image: 'imgs/hc2.jpg' },
    { name: 'Kerastase Discipline 8H Magic Serum ', price: '3,299', image: 'imgs/hc3.jpg' },
    { name: 'Dove Shampoo Intensive Repair', price: '164', image: 'imgs/hc4.jpg' },
    { name: 'Angelikashalala Hair Brush', price: '105', image: 'imgs/hc5.jpg' },
    { name: 'Clary Leave-In Conditioner', price: '255', image: 'imgs/hc6.jpg' },
    { name: 'Ordinary Serum for Hair Density', price: '670', image: 'imgs/hc7.jpg' },
    { name: 'Loriano Hair Mask With Keratin', price: '80', image: 'imgs/hc8.jpg' }
];

const momAndBaby = [
    { name: 'Hero Baby Apple Compote', price: '42', image: 'imgs/mb1.jpg' },
    { name: 'CERELAC Wheat Without Milk', price: '35', image: 'imgs/mb2.jpg' },
    { name: 'Pampers EXTRA CARE Taped Diapers', price: '560', image: 'imgs/mb3.jpg' },
    { name: 'Soothing Blossoms Baby Powder', price: '222', image: 'imgs/mb4.jpg' },
    { name: 'Newborn Health Safety Care Set', price: '299', image: 'imgs/mb5.jpg' },
    { name: 'Johnson Baby Soft Lotion', price: '205', image: 'imgs/mb6.jpg' },
    { name: 'Philips Avent Ultra Air', price: '845', image: 'imgs/mb7.jpg' },
    { name: 'Canpol babies safe cotton buds', price: '250', image: 'imgs/mb8.jpg' }

];

const medicien =[
    { name: 'Vitacare Vitamin D3', price: '360', image: 'imgs/m1.jpg'},
    { name: 'Pictol Tablets', price: '50', image: 'imgs/m2.jpg'},
    { name: 'Limitless Hydrate', price: '162', image: 'imgs/m3.jpg'},
    { name: 'Nerve Supplement', price: '299', image: 'imgs/m4.jpg'},
    { name: 'Liifun Nose Wash', price: '949', image: 'imgs/m5.jpg'},
    { name: 'Laxage Cream', price: '82', image: 'imgs/m6.jpg'},
    { name: 'Panadol Extra', price: '280', image: 'imgs/m7.jpg'}

];

const skinCare =[
    {name: 'Garnier SkinActive', price:'75', image:'imgs/sk1.jpg'},
    {name: 'Argento cleanser', price:'122', image:'imgs/sk2.jpg'},
    {name: 'Eva Eye Cream', price:'58', image:'imgs/sk3.jpg'},
    {name: 'Ultrasonic Cleaner', price:'155', image:'imgs/sk4.jpg'},
    {name: 'Care & More Cream', price:'27', image:'imgs/sk5.jpg'},
    {name: 'Bobana Mask', price:'75', image:'imgs/sk6.jpg'},
    {name: 'Luna', price:'176', image:'imgs/sk7.jpg'},
    {name: 'Glysolid body lotion', price:'55', image:'imgs/sk8.jpg'},


];

window.addEventListener('DOMContentLoaded', function () {
    renderCategory('Cosmetics', cosmetics, 'cosmetics-container');
    renderCategory('Hair Care', hairCare, 'haircare-container');
    renderCategory('Mom & Baby', momAndBaby, 'mombaby-container');
    renderCategory('Medicien', medicien, 'medicien-container');
    renderCategory('Skin Care', skinCare, 'skincare-container');
  });
  




