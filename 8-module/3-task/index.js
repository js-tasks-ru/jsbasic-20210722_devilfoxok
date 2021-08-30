export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

     if (product === null || product === '' || product === undefined) return

     this.productIndex = this.cartItems.findIndex(item => item.product.id == product.id)     
     this.productIndex == -1 ?
     this.cartItems.push({product, count: 1}) :
     this.cartItems[this.productIndex].count += 1;
     this.onProductUpdate(this.cartItems);    
  }

  updateProductCount(productId, amount) {
    this.productIndex = this.cartItems.findIndex(item => item.product.id == productId)

    if (this.productIndex == -1) return

    this.cartItems[this.productIndex].count += amount

    if (this.cartItems[this.productIndex].count == 0) {
      this.cartItems.splice(this.productIndex, 1)
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0 )
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + current.product.price*current.count, 0 )
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

