'use strict';

class Cart {

  constructor(buttonid, cartid, cartcontent) {
    this.buttonid = document.getElementById(buttonid);
    this.cartid = document.getElementById(cartid);
    this.cartcontent = document.getElementById(cartcontent);
  }
  addToCart(img, itemName, itemPrice, size, color) {
    this.img = img;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.size = size;
    this.color = color;

    let section = document.createElement("section"),
        leftside = document.createElement('div'),
        middleside = document.createElement('div'),
        rightside = document.createElement('div'),
        productimg = document.createElement("img"),
        removeLink = document.createElement("a"),
        productName = document.createElement('h5'),
        productPrice = document.createElement('p'),
        productSize = document.createElement('p'),
        productColor = document.createElement('p');

    section.setAttribute('class', 'mp-cart-item');
    leftside.setAttribute('class', 'left');
    middleside.setAttribute('class', 'mid');
    rightside.setAttribute('class', 'right');
    removeLink.setAttribute('class', 'mp-removelink');
    productimg.setAttribute('src', this.img.src);
    productimg.setAttribute('class', 'mp-thumbnail');
    productPrice.setAttribute('class', 'mp-product-price');
    productSize.setAttribute('class', 'mp-hint-text');
    productColor.setAttribute('class', 'mp-hint-text');

    productName.append(this.itemName);
    productPrice.append("$" + this.itemPrice);
    removeLink.append("Remove");
    productSize.append("Size: " + this.size);
    productColor.append("Color: " + this.color);

    leftside.append(productimg);
    middleside.append(productName);
    middleside.append(productSize);
    middleside.append(productColor);
    middleside.append(removeLink);

    rightside.append(productPrice);

    section.append(leftside);
    section.append(middleside);
    section.append(rightside);

    this.cartcontent.append(section);

    removeLink.addEventListener("click", function() {
      this.parentElement.parentElement.remove();
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
  let cart = new Cart("cartButton", "shoppingCart", "cart-content"),
      addtoCart = document.getElementById("addToCart"),
      cartContainer = document.getElementById("shoppingCart"),
      thumbnails = document.getElementsByClassName("mp-thumbnail"),
      colorctrls = document.getElementsByClassName("color-option"),
      sizectrls = document.getElementsByClassName("size-option"),
      colorlabel = document.getElementById("active-color"),
      sizelabel = document.getElementById("active-size");
  // thumbnail swapper on product pages
  let swapThumbnail = function(newsource) {
    let focusedImage = document.getElementById("mp-focused-img");
    focusedImage.setAttribute("src", newsource.src);
  };
  let switchActive = function(newsource, ctrls, ctrllabel) {
    for(let i = 0; i < ctrls.length; i++) {
      ctrls[i].classList.remove("active");
    }
    newsource.classList.add("active");

    ctrllabel.innerHTML = newsource.getElementsByTagName('input')[0].value;
  }

  cart.buttonid.addEventListener("click", function(evt) {
      evt.stopPropagation();
      cart.toggle();
  });
  addtoCart.addEventListener("click", function(evt) {
    evt.stopPropagation();
    let productThumbnail = document.getElementById("product-thumbnail"),
        itemName = document.getElementById("mp-product-name").textContent,
        itemPrice = document.getElementById("mp-price").textContent.substr(1);

    cart.addToCart(productThumbnail, itemName, itemPrice, sizelabel.textContent, colorlabel.textContent);
    if(cart.checkActive() === false) {
      cart.toggle();
    }
  });
  for(let i = 0; i < colorctrls.length; i++) {
    colorctrls[i].addEventListener("click", function() {
      switchActive(colorctrls[i], colorctrls, colorlabel)
    });
  }
  for(let i = 0; i < sizectrls.length; i++) {
    sizectrls[i].addEventListener("click", function() {
      switchActive(sizectrls[i], sizectrls, sizelabel)
    });
  }
  // if you click a thumbnail on a product page it will swap out the main image
  for(let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("click", function(evt) {
      swapThumbnail(thumbnails[i]);
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
