'use strict';

/**
 * @ngdoc function
 * @name sneakersApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the sneakersApp
 */
angular.module('sneakersApp')
  .controller('StoreCtrl', ['storeWarehouse', function(storeWarehouse) {
  	var vm = this;
  	this.cart = [];
    this.selectedProduct;

    storeWarehouse.getProducts().then(function(data) {
      vm.products = data;
    });

  	/**
  	 * @description Add product on cart
  	 * @param {object} product
  	 */
  	this.addToCart = function(product, index) {
  		if (this.cart.length === 0) {
			  this.cart.push(product);
  		} else {
  			var repeat = false;
  			for (var i=0; i<this.cart.length; i++) {
  				if (this.cart[i].id === product.id) {        
  					repeat = true;
  					product.limit = 'Sorry, you have reached the quantity limit. Please remove an item and try again.';
            this.selectedProduct = index;
  				}
  			}

  			if (!repeat) {
  				this.cart.push(product);
  			}
  		}
  	};

  	/**
  	 * @description Remove item from cart
  	 * @param  {object} product
  	 * @return {void}
  	 */
  	this.removeFromCart = function(product) {
  		var index = this.cart.indexOf(product);
  		this.cart.splice(index, 1);
  		product.limit = '';
      this.selectedProduct = -1;
  	};
  }]);
