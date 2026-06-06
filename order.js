class Order {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.marketplace = data.marketplace;
    this.marketplace_order_id = data.marketplace_order_id;
    this.status = data.status;
    this.created_at = data.created_at || new Date();
  }
}

module.exports = Order;
