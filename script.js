let cart = [];

function addToCart(name, price, image) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = cart.find(item => item.name === name);
  
  if (existingProduct) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
    existingProduct.quantity += 1;
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
    cart.push({ name, price, image, quantity: 1 });
  }
  

  updateCart();
  saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
}

function removeItem(name) {
  // Xóa sản phẩm khỏi giỏ hàng
  cart = cart.filter(item => item.name !== name);

  updateCart();
  saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
}

function increaseQuantity(name) {
  // Tăng số lượng sản phẩm lên 1
  const product = cart.find(item => item.name === name);
  product.quantity += 1;

  updateCart();
  saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
}

function decreaseQuantity(name) {
  // Giảm số lượng sản phẩm xuống 1
  const product = cart.find(item => item.name === name);
  product.quantity -= 1;

  if (product.quantity <= 0) {
    // Nếu số lượng sản phẩm bằng 0, xóa khỏi giỏ hàng
    removeItem(name);
  }

  updateCart();
  saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
}

function updateCart() {
  const cartElement = document.getElementById("cart");
  const totalElement = document.getElementById("total-price");

  cartElement.innerHTML = "";

  let totalPrice = 0;

  cart.forEach(item => {
    const listItem = document.createElement("li");

    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.classList.add("product-image0"); 
    listItem.appendChild(imageElement);

    const nameElement = document.createElement("span");
    nameElement.innerText = item.name;
    listItem.appendChild(nameElement);

    const priceElement = document.createElement("span");
    priceElement.innerText = " - "+`Price:${item.price}` + " Quantity: ";
    listItem.appendChild(priceElement);

    const quantityElement = document.createElement("span");
    quantityElement.innerText = item.quantity;
    listItem.appendChild(quantityElement);

    const decreaseButton = document.createElement("button");
    decreaseButton.innerText = "-";
    decreaseButton.addEventListener("click", () => decreaseQuantity(item.name));
    listItem.appendChild(decreaseButton);

    const increaseButton = document.createElement("button");
    increaseButton.innerText = "+";
    increaseButton.addEventListener("click", () => increaseQuantity(item.name));
    listItem.appendChild(increaseButton);

    cartElement.appendChild(listItem);

    totalPrice += item.price * item.quantity;
  });

  if (totalPrice === 0) {
    totalElement.innerHTML = "Your cart is empty";
  } else {
    totalElement.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
  }
}

// Khởi tạo giỏ hàng ban đầu và khôi phục giỏ hàng từ localStorage (nếu có)
function initializeCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCart();
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Gọi hàm initializeCart khi trang web được tải
initializeCart();
