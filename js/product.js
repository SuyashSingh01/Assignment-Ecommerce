document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const productsContainer = document.getElementById("products-container");
  const loadingSpinner = document.getElementById("loading-spinner");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const categorySelect = document.getElementById("category-select");

  // Variables
  let products = [];
  let filteredProducts = [];

  // Fetch products from API
  async function fetchProducts() {
    try {
      loadingSpinner.style.display = "flex";

      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      products = await response.json();
      filteredProducts = [...products];
      console.log("Products fetched:", products);

      // Populate categories
      populateCategories();

      // Display products
      displayProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      productsContainer.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 30px;">
                    <p>Failed to load products. Please try again later.</p>
                </div>
            `;
    } finally {
      loadingSpinner.style.display = "none";
    }
  }

  // Populate category dropdown
  function populateCategories() {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(option);
    });
  }

  // Display products
  function displayProducts() {
    productsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `
                <div class="no-products" style="text-align: center; grid-column: 1 / -1; padding: 30px;">
                    <p>No products found matching your criteria.</p>
                </div>
            `;
      return;
    }

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-details">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price.toFixed(
                      2
                    )}</div>
                    <button class="add-to-cart" data-id="${product.id}">
                       <i class="fas fa-shopping-cart"></i>
                       Add to Cart
                    </button>
                </div>
            `;

      productsContainer.appendChild(productCard);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }

  // Filter products
  function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    filteredProducts = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });

    displayProducts();
  }

  // Add to cart functionality
  function addToCart(e) {
    const button = e.currentTarget;
    const productId = parseInt(button.getAttribute("data-id"));
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Get current cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already in cart
      const existingItem = cart.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        });
      }

      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      updateCartCount();

      // Show added feedback
      button.classList.add("added");
      button.innerHTML = '<i class="fas fa-check"></i> Added';

      // Show toast notification
      showToast(`${product.title} added to cart!`);

      // Reset button after 1.5 seconds
      setTimeout(() => {
        button.classList.remove("added");
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
      }, 1500);
    }
  }

  // Show toast notification
  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.classList.add("active");

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("active");
    }, 3000);
  }

  // Close toast on click
  const toastCloseBtn = document.querySelector(".toast .close");
  if (toastCloseBtn) {
    toastCloseBtn.addEventListener("click", () => {
      document.getElementById("toast").classList.remove("active");
    });
  }

  // Event listeners
  searchBtn.addEventListener("click", filterProducts);
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      filterProducts();
    }
  });
  categorySelect.addEventListener("change", filterProducts);

  // Initialize
  fetchProducts();
  updateCartCount();
});

// Update cart count
function updateCartCount() {
  const cartCountElements = document.querySelectorAll("#cart-count-nav");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartCountElements.forEach((element) => {
    element.textContent = totalItems;
  });
}
