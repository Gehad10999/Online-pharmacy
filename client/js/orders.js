
// const orders = [
//   {
//     orderNumber: '1025',
//     address: '123 Main Street',
//     status: 'Pending Confirmation',
//     total: '250 EGP',
//     date: 'May 11, 2025',
//     items: 4,
//     customer: 'Ahmed Ali'
//   },
//   {
//     orderNumber: '1021',
//     address: 'Garden City',
//     status: 'Confirmed',
//     total: '150 EGP',
//     date: 'May 11, 2025',
//     items: 3,
//     customer: 'Sara Youssef'
//   },
//   {
//     orderNumber: '1026',
//     address: 'Downtown',
//     status: 'Cancelled',
//     total: '400 EGP',
//     date: 'May 12, 2025',
//     items: 2,
//     customer: 'Laila Mostafa'
//   }
// ];

// Attach filter buttons


document.addEventListener('DOMContentLoaded', async () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const containerAll = document.getElementById('order-cards-container-2');
  const template = document.getElementById('order-card-template').innerHTML;

  let orders = [];

  // Fetch orders from API
  async function fetchOrders() {
    try {
      const res = await fetch('http://localhost:5000/orders/all');
      if (!res.ok) throw new Error('Failed to fetch orders');
      orders = await res.json();
      orders = orders.orders;
      renderAllOrders('all');
    } catch (error) {
      console.error('Error fetching orders:', error);
      containerAll.innerHTML = '<p>Failed to load orders.</p>';
    }
  }

  // Attach filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      renderAllOrders(filter);
    });
  });

  // Render filtered orders in "Orders" section
  function renderAllOrders(filter = 'all') {
    containerAll.innerHTML = '';
    const filtered = filter === 'all'
      ? orders
      : orders.filter(order => order.status.toLowerCase().includes(filter));
    filtered.forEach(order => {
      const card = createOrderCard(order);
      containerAll.appendChild(card);
    });
  }

  // Create order card with optional actions
  function createOrderCard(orderData) {
  let cardHTML = template
    .replace('{{orderNumber}}', orderData.orderNumber)
    .replace('{{address}}', orderData.address)
    .replace('{{status}}', orderData.status)
    .replace('{{total}}', orderData.total)
    .replace('{{date}}', orderData.order_date)
    .replace('{{items}}', orderData.items)
    .replace('{{customer}}', orderData.user_name);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = cardHTML.trim();
  const cardElement = tempDiv.firstChild;

  // Add event listeners to buttons
  const confirmBtn = cardElement.querySelector('.btn-confirm');
  const deleteBtn = cardElement.querySelector('.btn-delete');

  confirmBtn.addEventListener('click', () => handleConfirm(orderData.orderNumber));
  deleteBtn.addEventListener('click', () => {
    console.log("Delete clicked");
    handleDelete(orderData.orderNumber);
  });

  return cardElement;  // Return the DOM element itself
}

async function handleConfirm(orderNumber) {
  console.log('Confirming order:', orderNumber);

  try {
    const res = await fetch(`http://localhost:5000/orders/${orderNumber}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' })  // or 'Confirmed' depending on backend
    });
    if (!res.ok) throw new Error('Failed to confirm order');

    // Update local copy
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) order.status = 'Confirmed';

    alert(`Order #${orderNumber} confirmed.`);
    renderAllOrders(document.querySelector('.filter-btn.active').dataset.filter);
  } catch (error) {
    console.error('Error confirming order:', error);
    alert('Failed to confirm order. Please try again.');
  }
}

async function handleDelete(orderNumber) {
  console.log('Deleting order:', orderNumber);

  try {
    const res = await fetch(`http://localhost:5000/orders/${orderNumber}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete order');

    // Remove from local array
    const index = orders.findIndex(o => o.orderNumber === orderNumber);
    if (index !== -1) orders.splice(index, 1);

    alert(`Order #${orderNumber} deleted.`);
    renderAllOrders(document.querySelector('.filter-btn.active').dataset.filter);
  } catch (error) {
    console.error('Error deleting order:', error);
    alert('Failed to delete order. Please try again.');
  }
}

  // Fetch and render orders on page load
  fetchOrders();
});