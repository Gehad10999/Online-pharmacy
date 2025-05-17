// main.js

// Mocked categories data
const mockedCategories = [
    {
      id: 1,
      name: "Cosmetics",
      imgSrc: "images/c.png",
      link: "products.html#cosmetics-container",
    },
    {
      id: 2,
      name: "Hair Care",
      imgSrc: "images/hair.png",
      link: "products.html#haircare-container",
    },
    {
      id: 3,
      name: "Mom & Baby",
      imgSrc: "images/m.png",
      link: "products.html#mombaby-container",
    },
    {
      id: 4,
      name: "Medicine",
      imgSrc: "images/med.png",
      link: "products.html#medicien-container",
    },
    {
      id: 5,
      name: "Skin Care",
      imgSrc: "images/s.png",
      link: "products.html#skincare-container",
    },
  ];
  
  // Function to fetch categories - replace mock with API call later
  async function fetchCategories() {
    // For now, return the mocked data wrapped in a Promise to simulate async
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockedCategories), 500);
    });
  
    // Example future API call:
    // const response = await fetch('/api/categories');
    // return await response.json();
  }
  
  // Function to render categories dynamically
  async function renderCategories() {
    const container = document.querySelector(".categories-container");
    if (!container) return;
  
    try {
      const categories = await fetchCategories();
  
      container.innerHTML = ""; // Clear any existing content
  
      categories.forEach((cat) => {
        const categoryHTML = `
          <div class="fe-box">
            <a href="${cat.link}">
              <img src="${cat.imgSrc}" alt="${cat.name}" class="fe-img" />
              <h6>${cat.name}</h6>
            </a>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", categoryHTML);
      });
    } catch (error) {
      console.error("Failed to load categories:", error);
      container.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }
  }
  
  // On DOM load, render categories
  document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
  });
  