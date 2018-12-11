// declare global cart variable, don't do in actual application, best use case is to hide inside of a class as storage
let cart = [];


// on page load, insert navbar.html into header using jQuery
$.get('../../components/navbar.html', function(response) {
  $('#nav').html(response);
});


// creating callback function after loading products from JSON
function showProducts(response) {
  let products = response.products;

  // declare an empty string, which will append all html for rendering products
  let html = '';

  for (let index in products) {
    // checks for every 3rd index, inserts a new row if so
    if (index % 3 === 0) {
      html += '<div class="row">';
    }

    // creates a new product each loop
    html += `
      <div class="col-md-4">
        <div class="card">
          <div class="card-img-top">
            <img class="card-img" src="http://placehold.it/250x250" alt="Placeholder">
          </div>
          <div class="card-title">${products[index].title}</div>
          <div class="card-subtitle">$${products[index].price}</div>
          <div class="card-text">
            <p>${products[index].description}</p>
          </div>
          <button class="btn btn-primary" onClick="addItem(${products[index].id})">Add to Cart</button>
        </div>
      </div>`;

    // close off row after every third element, at index 2, 5, 8, etc.
    if ((index + 1) % 3 === 0) {
      html += '</div>';
    }
  }

  // insert html variable into the products section to render data
  $('#products').html(html);
}


// initially load products from json
$.get('../../assets/products.json', showProducts);



// add functionality for adding to the global cart variable
function addItem(id) {
  $.get('../../assets/products.json', function(response) {
    let products = response.products;

    // loop through all products and check if id is correct
    for (let index in products) {
      if (id === products[index].id) {
        // add full product info to cart variable
        cart.push(products[index]);
        break;
      }
    }
  });

  // console.log(cart);
  sleep(50).then(() => showCart());
}


function removeItem(id) {
  // console.log(id);

  // loop through cart and check id passed in against each elements id
  for (let index in cart) {
    if (id === cart[index].id) {
      // remove item using splice method
      cart.splice(index, 1); // start, remove, add
      break;
    }
  }

  showCart();
}


// write the functionality to show the cart
function showCart() {
  // if cart is empty, change css to display none
  if (cart.length === 0) {
    $('#cart').css('display', 'none');
  } else {
    $('#cart').css('display', 'block');
  }

  // create html variable to be inserted into tbody
  let html = '';

  // loop through cart and add to html variable for each row
  for (let index in cart) {
    html += `
      <tr>
        <td>1</td>
        <td>${cart[index].title}</td>
        <td>$${cart[index].price}</td>
        <td>
          <button class="btn btn-danger" onClick="removeItem(${cart[index].id})">X</button>
        </td>
      </tr>
    `;
  }

  // insert html variable into tbody
  $('#items').html(html);

  // call showTotal() to update cart and navbar
  showTotal();
}


showCart();


// add sleep function to stop asynchronous problems
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


// calculate total from cart and display in necessary places
function showTotal() {
  let total = 0;

  for (let index in cart) {
    total += cart[index].price;
  }

  // fix total number to two decimals
  total = total.toFixed(2);

  // console.log(total);

  // insert total using jQuery
  $('#cart_total').text(`$${total}`);
  $('#nav-total').text(`Total: $${total}`);
}
