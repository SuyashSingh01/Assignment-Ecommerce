# Frontend E-Commerce Website

## Title: Build a Basic E-Commerce Website

### Objective

The goal of this assignment is to test your understanding of core JavaScript concepts, including form handling, API interaction, state management, and DOM manipulation. You will create a functional e-commerce website using HTML, CSS, and JavaScript.

---

### Assignment Instructions

#### 1. Register & Login Page

**Task:** Create a register and login page with the following features:

- **Form Fields:**
  - Register form: Name, Email, Password, Confirm Password.
  - Login form: Email, Password.
- **Validations:**
  - All fields are required.
  - Email should be in a valid format.
  - Password should be at least 6 characters.
  - Confirm Password must match the Password.
- **Local Storage:**
  - Store the user data (Name, Email, and Password) in `localStorage` during registration.
  - Validate the user credentials during login using the data from `localStorage`.
  - Redirect the user to the homepage upon successful login.

---

#### 2. Home Page

**Task:** Create a homepage to display a list of products.

- Fetch dummy product data from a public API:
  - [Fake Store API](https://fakestoreapi.com/products)
  - [Dummy JSON API](https://dummyjson.com/docs/products)
- **Display the following product details:**
  - Product Name
  - Image
  - Price
  - Category

---

#### 3. Filtering & Searching

**Task:** Implement functionality to filter and search products.

- **Filter:**
  - Provide a dropdown or buttons to filter products based on their category (e.g., electronics, clothing).
- **Search:**
  - Add a search bar to allow users to search for products by name.
  - Show only the products that match the search query.

---

#### 4. Shopping Cart

**Task:** Add functionality to allow users to add products to a shopping cart.

- Include an "Add to Cart" button for each product on the homepage.
- **Local Storage:**
  - Store the cart items in `localStorage` to persist data across page reloads.
- **Create a Cart Page:**
  - Display the list of items added to the cart.
  - Show the product name, image, quantity, and price.
  - Calculate and display the total price of all items in the cart.

### Bonus Features (Optional)

- Include a loading spinner while fetching the API data.
- Implement a "Remove from Cart" functionality in the Cart Page.
- Enhance UI with a responsive design using CSS Flexbox/Grid.
- Add any additional functionality to showcase your JavaScript skills.

---

### Submission Guidelines

- Submit the entire project code to a newly created GitHub repository.
- Include a `README.md` file in the root directory of the project.

---

### Project Setup

1. Clone the repository.
2. Open the project folder in your code editor.
3. Run the project in a browser to test functionality.

---

### Author

This project is part of an assignment to demonstrate JavaScript proficiency.
