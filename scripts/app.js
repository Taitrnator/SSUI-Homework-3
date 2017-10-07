
class Cart {
  constructor(buttonid, cartid) {
    this.buttonid = document.getElementById(buttonid);
    this.cartid = document.getElementById(cartid);
  }

  addToCart(img, itemName, itemPrice) {
    this.img = img;
    this.itemName = itemName;
    this.itemPrice = itemPrice;

    console.log(this.itemPrice);
    let section = document.createElement("section"),
        productimg = document.createElement("img"),
        removeLink = document.createElement("a"),
        productName = document.createElement('h5');

    section.setAttribute('class', 'mp-cart-item');
    removeLink.setAttribute('class', 'mp-removelink');
    removeLink.append("Remove");
    productimg.setAttribute('src', this.img.src);
    productimg.setAttribute('class', "mp-thumbnail");
    section.append(productimg);
    section.append(removeLink);
    this.cartid.append(section);

    removeLink.addEventListener("click", function() {
      this.parentElement.remove();
    });
  }
  toggle() {
    this.cartid.classList.toggle("show");
  }
  checkActive() {
    return this.cartid.classList.contains("show");
  }
}


document.addEventListener("DOMContentLoaded", function() {
  let cart = new Cart("cartButton", "shoppingCart");
  let addtoCart = document.getElementById("addToCart");
  let cartContainer = document.getElementById("shoppingCart");
  let thumbnails = document.getElementsByClassName("mp-thumbnail");
  // thumbnail swapper on product pages
  let swapThumbnail = function(newsource) {
    let container = document.getElementById("mp-focused-img-container");
    let focusedImage = document.getElementById("mp-focused-img");
    focusedImage.setAttribute("src", newsource.src);
  };

  cart.buttonid.addEventListener("click", function(evt) {
      evt.stopPropagation();
      cart.toggle();
  });
  addtoCart.addEventListener("click", function(evt) {
    evt.stopPropagation();
    let productThumbnail = document.getElementById("product-thumbnail"),
        itemName = document.getElementById("mp-product-name").textContent,
        itemPrice = document.getElementById("mp-price").textContent.substr(1);

    cart.addToCart(productThumbnail, itemName, itemPrice);
    if(cart.checkActive() === false) {
      cart.toggle();
    }
  });
  // if you click a thumbnail on a product page it will swap out the main image
  for(let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("click", function() {
      swapThumbnail(thumbnails[i])
    });
  }
  // a way to toggle the cart by clicking on the page
  document.addEventListener("click", function() {
    if(cart.checkActive() === true) {
      cart.toggle();
    }
  });
  // make an exception to the above when user clicks inside cart
  cartContainer.addEventListener("click", function(evt) {
    evt.stopPropagation();
  });
});
