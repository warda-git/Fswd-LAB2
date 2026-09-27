let cart = [];

function addToCart(name, price){
  let item = cart.find(p => p.name === name);

  if(item){
    item.qty++;
  }else{
    cart.push({name, price, qty:1});
  }

  displayCart();
}

function displayCart(){
  let box = document.getElementById("cartItems");
  let total = 0;
  let count = 0;

  if(cart.length === 0){
    box.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
  }else{
    box.innerHTML = cart.map((item,index) => {
      total += item.price * item.qty;
      count += item.qty;

      return `
        <div class="border rounded p-2 mb-2">
          <div class="d-flex justify-content-between">
            <strong>${item.name}</strong>
            <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">×</button>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-2">
            <span>$${item.price}</span>

            <div>
              <button class="btn btn-sm btn-outline-dark" onclick="changeQty(${index},-1)">-</button>
              <span class="mx-2">${item.qty}</span>
              <button class="btn btn-sm btn-outline-dark" onclick="changeQty(${index},1)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = count;
}

function changeQty(index, amount){
  cart[index].qty += amount;

  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }

  displayCart();
}

function removeItem(index){
  cart.splice(index,1);
  displayCart();
}

function checkout(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("cart")).hide();

  let modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  modal.show();
}

function placeOrder(){
  alert("Order placed successfully!");
  cart = [];
  displayCart();

  bootstrap.Modal.getInstance(document.getElementById("checkoutModal")).hide();
}

function showMessage(message){
  alert(message);
}
