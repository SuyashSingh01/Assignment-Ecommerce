document.addEventListener("DOMContentLoaded", function () {
  // Update cart count on page load
  updateCartCount();

  // Check if we're on the cart page
  const cartItemsContainer = document.getElementById("cart-items");
  const cartContainer = document.getElementById("cart-container");
  const cartEmpty = document.getElementById("cart-empty");

  if (cartItemsContainer) {
    // Load cart items
    loadCartItems();

    // Add event listener to clear cart button
    const clearCartBtn = document.getElementById("clear-cart-btn");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", clearCart);
    }
  }

  // Load cart items
  function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      // Show empty cart message
      cartContainer.style.display = "none";
      cartEmpty.style.display = "block";
      return;
    }

    // Show cart container
    cartContainer.style.display = "grid";
    cartEmpty.style.display = "none";

    // Clear previous items
    cartItemsContainer.innerHTML = "";

    // Add cart items
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <div class="cart-item-category">${item.category}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-id="${
                          item.id
                        }">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${
                          item.id
                        }">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">$${(
                      item.price * item.quantity
                    ).toFixed(2)}</div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners
    document.querySelectorAll(".quantity-btn.decrease").forEach((btn) => {
      btn.addEventListener("click", decreaseQuantity);
    });

    document.querySelectorAll(".quantity-btn.increase").forEach((btn) => {
      btn.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", removeItem);
    });

    // Update cart summary
    updateCartSummary();
  }

  // Decrease quantity
  function decreaseQuantity(e) {
    const productId = parseInt(e.currentTarget.getAttribute("data-id"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
      } else {
        removeItem(e);
      }
    }
  }

  // Increase quantity
  function increaseQuantity(e) {
    const productId = parseInt(e.currentTarget.getAttribute("data-id"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCartItems();
      updateCartCount();
    }
  }

  // Remove item
  function removeItem(e) {
    const productId = parseInt(e.currentTarget.getAttribute("data-id"));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCartItems();
    updateCartCount();

    // Show toast notification
    showToast("Item removed from cart");
  }

  // Clear cart
  function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    loadCartItems();
    updateCartCount();

    // Show toast notification
    showToast("Cart cleared");
  }

  // Update cart summary
  function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");

    if (subtotalElement && totalElement) {
      const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
  }

  // Show toast notification
  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add("active");

      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove("active");
      }, 3000);
    }
  }
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
