class Item {
  constructor(name, price, image, category, stock, rating) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.rating = rating;
  }
}

function rebuildShop() {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = ""; // Limpiar lista antes de regenerar

  exampleItems.forEach((item) => {
      const itemCard = document.createElement("div");
      itemCard.className = "item-card";
      itemCard.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
          <p>Category: ${item.category}</p>
          <p>Stock: <span id="stock-${item.name}">${item.stock}</span></p>
          <p>Rating: ${item.rating}</p>
          <button onclick="addToCart('${item.name}')">Add to Cart</button>
      `;
      itemList.appendChild(itemCard);
  });
}

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    if (item.stock <= 0) {
      alert("Item out of stock.");
      return;
    }

    const existingItem = this.items.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }

    item.stock -= 1;
    this.updateCartDisplay();
  }

  clearCart() {
    this.items.forEach((cartItem) => {
        const stockItem = exampleItems.find((i) => i.name === cartItem.name);
        if (stockItem) {
            stockItem.stock += cartItem.quantity;
        }
    });

    this.items = [];
    this.updateCartDisplay();
    rebuildShop();
}


updateCartDisplay() {
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartItems = document.getElementById("cart-items").getElementsByTagName("tbody")[0];

  cartItems.innerHTML = "";

  if (this.items.length === 0) {
      cartDropdown.style.display = "none";
      return;
  }

  cartDropdown.style.display = "block";

  this.items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td><img src="${item.image}" alt="${item.name}" width="50"></td>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>${item.quantity}</td>
      `;
      cartItems.appendChild(row);
  });
}

}

const cart = new Cart();
let cartVisible = false;

document.getElementById("cart-icon").addEventListener("click", () => {
  if (cart.items.length > 0) {
    cartVisible = !cartVisible;
    document.getElementById("cart-dropdown").style.display = cartVisible
      ? "block"
      : "none";
  }
});

document.getElementById("cart-icon").addEventListener("mouseover", () => {
  if (cart.items.length > 0) {
    document.getElementById("cart-dropdown").style.display = "block";
  }
});

document.getElementById("cart-icon").addEventListener("mouseout", () => {
  if (!cartVisible) {
    document.getElementById("cart-dropdown").style.display = "none";
  }
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart.clearCart();
});

document
  .getElementById("add-item-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("item-name").value;
    const price = parseFloat(document.getElementById("item-price").value);
    const image = document.getElementById("item-image").value;
    const category = document.getElementById("item-category").value;
    const stock = parseInt(document.getElementById("item-stock").value);
    const rating = parseFloat(document.getElementById("item-rating").value);

    if (price < 1000) {
      alert("Price must be at least $1000.");
      return;
    }

    if (stock <= 0) {
      alert("Stock must be greater than 0.");
      return;
    }

    const newItem = new Item(name, price, image, category, stock, rating);
    exampleItems.push(newItem);
    addItemToShop(newItem);
    this.reset();
  });

function addItemToShop(item) {
  const itemList = document.getElementById("item-list");
  const itemCard = document.createElement("div");
  itemCard.className = "item-card";
  itemCard.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>$${item.price}</p>
    <p>Category: ${item.category}</p>
    <p>Stock: <span id="stock-${item.name}">${item.stock}</span></p>
    <p>Rating: ${item.rating}</p>
    <button onclick="addToCart('${item.name}')">Add to Cart</button>
  `;
  itemList.appendChild(itemCard);
}

function addToCart(name) {
  const item = exampleItems.find((i) => i.name === name);
  if (item) {
    cart.addItem(item);
    document.getElementById(`stock-${name}`).innerText = item.stock;
  }
}

const exampleItems = [
  new Item(
    "Super Mario Odyssey",
    59.99,
    "https://mario.wiki.gallery/images/thumb/5/5f/SMO_Artwork_Box_Art.png/115px-SMO_Artwork_Box_Art.png",
    "Adventure",
    10,
    4.5
  ),
  new Item(
    "The Legend of Zelda: Breath of the Wild",
    59.99,
    "https://4.bp.blogspot.com/-o3KBo7YAGT0/WH_VYcoURII/AAAAAAAAFgE/eXqEcxVQQrQjY9T1bwbkc7BUCloozskDwCLcB/s1600/BotW_boxart_NA_Switch.jpg",
    "Adventure",
    15,
    5
  ),
  new Item(
    "Splatoon 2",
    49.99,
    "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/b3/S2_AU_front_cover.jpg/111px-S2_AU_front_cover.jpg",
    "Shooter",
    20,
    4
  ),
];

exampleItems.forEach((item) => addItemToShop(item));