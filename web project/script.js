document.addEventListener('DOMContentLoaded', function() {

    // Quantity controls
    document.querySelectorAll('.product-card').forEach(card => {
        const minusBtn = card.querySelector('.qty-minus');
        const plusBtn = card.querySelector('.qty-plus');
        const qtyInput = card.querySelector('input');

        minusBtn.addEventListener('click', function() {
            let qty = parseInt(qtyInput.value);
            if (qty > 1) {
                qtyInput.value = qty - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            let qty = parseInt(qtyInput.value);
            qtyInput.value = qty + 1;
        });
    });

    // Add to cart button
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            const qty = product.querySelector('input').value;

            alert(`Added ${qty} x ${productName} to cart!`);
        });
    });
});
