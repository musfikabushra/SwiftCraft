// GLOBAL VARIABLES

let allProducts = [];
let cartCount = 0;

// LOAD TRENDING PRODUCTS


async function loadTrendingProducts() {

  const res = await fetch("https://fakestoreapi.com/products");

  const data = await res.json();

  const trendingGrid = document.getElementById("trendingGrid");

  trendingGrid.innerHTML = "";

  data.slice(0, 3).forEach(product => {
    trendingGrid.appendChild(createProductCard(product));
  });

}


// LOAD ALL PRODUCTS

async function loadAllProducts() {

  const res = await fetch("https://fakestoreapi.com/products");

  allProducts = await res.json();

  showProducts(allProducts);

}

// SHOW PRODUCTS FUNCTION

function showProducts(products) {

  const productGrid = document.getElementById("productGrid");

  productGrid.innerHTML = "";

  products.forEach(product => {

    productGrid.appendChild(createProductCard(product));

  });

}

// CATEGORY FILTER

document.addEventListener("click", function (e) {

  if (e.target.classList.contains("categoryBtn")) {

    // active style remove
    document.querySelectorAll(".categoryBtn").forEach(btn => {
      btn.classList.remove(
        "bg-indigo-600",
        "text-white"
      );

      btn.classList.add("border");
    });

    // active style add
    e.target.classList.add(
      "bg-indigo-600",
      "text-white"
    );

    e.target.classList.remove("border");


    const category = e.target.dataset.category;


    if (category === "all") {

      showProducts(allProducts);

    } else {

      const filtered = allProducts.filter(product =>
        product.category === category
      );

      showProducts(filtered);

    }

  }

});

// CREATE PRODUCT CARD

function createProductCard(product) {

  const card = document.createElement("div");

  card.className =
    "bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition";

  card.innerHTML = `
  
    <img src="${product.image}" 
    class="h-48 w-full object-contain bg-gray-100">
    
    <div class="p-4">
    
      <h3 class="font-semibold truncate">
        ${product.title}
      </h3>
      
      <p class="text-indigo-600 font-bold">
        $${product.price}
      </p>
      
      <p class="text-sm text-gray-500">
        ${product.category}
      </p>
      
      <p class="text-yellow-500 text-sm">
        ⭐ ${product.rating.rate}
      </p>
      
      <div class="flex justify-between mt-3">
      
        <button
          class="detailsBtn bg-blue-600 text-white px-3 py-1 rounded"
          data-id="${product.id}">
          Details
        </button>
        
        <button
          class="addBtn bg-green-600 text-white px-3 py-1 rounded">
          Add
        </button>
        
      </div>
      
    </div>
  
  `;

  return card;

}


// CART FUNCTION

document.addEventListener("click", function (e) {

  if (e.target.classList.contains("addBtn")) {

    cartCount++;

    document.getElementById("cartCount").textContent = cartCount;

  }

});


// Show Product Details in Modal
async function showProductDetails(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  // Create modal
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";

  // Modal content
  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-scaleIn">
      <!-- Close Button -->
      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-600 closeModal text-xl font-bold">
        ✖
      </button>

      <!-- Product Image -->
      <img src="${product.image}" alt="${product.title}" class="h-48 mx-auto object-contain mb-4">

      <!-- Product Title -->
      <h2 class="text-2xl font-bold mb-2">${product.title}</h2>

      <!-- Product Description -->
      <p class="text-gray-700 mb-4 text-sm leading-relaxed">${product.description}</p>

      <!-- Price -->
      <p class="text-blue-600 font-bold text-lg mb-2">Price: $${product.price}</p>

      <!-- Rating -->
      <p class="text-yellow-500 mb-4">⭐ ${product.rating.rate} (${product.rating.count})</p>

      <!-- Buy Now Button -->
      <button class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full">
        Buy Now
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  // Close Modal on click
  modal.querySelector(".closeModal").addEventListener("click", () => modal.remove());

  // Close Modal when clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Handle Details Button Click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("detailsBtn")) {
    const id = e.target.getAttribute("data-id");
    showProductDetails(id);
  }
});



// NAV ACTIVE LINK

function setActiveLink(id) {

  document.querySelectorAll("#homeLink, #productsLink")
    .forEach(link => {

      link.classList.remove(
        "text-indigo-600",
        "border-b-2",
        "border-indigo-600"
      );

    });


  document.getElementById(id).classList.add(
    "text-indigo-600",
    "border-b-2",
    "border-indigo-600"
  );

}

// NAVIGATION

document.getElementById("homeLink")
  .addEventListener("click", function (e) {

    e.preventDefault();

    document.getElementById("homeSection")
      .classList.remove("hidden");

    document.getElementById("productsSection")
      .classList.add("hidden");

    setActiveLink("homeLink");

    loadTrendingProducts();

  });


document.getElementById("productsLink")
  .addEventListener("click", function (e) {

    e.preventDefault();

    document.getElementById("homeSection")
      .classList.add("hidden");

    document.getElementById("productsSection")
      .classList.remove("hidden");

    setActiveLink("productsLink");

    loadAllProducts();

  });

// DEFAULT LOAD


loadTrendingProducts();