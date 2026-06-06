class Shipment {
  constructor(data) {
    this.id = data.id;
    this.order_id = data.order_id;
    this.tracking_number = data.tracking_number;
    this.carrier_code = data.carrier_code;
    this.last_checkpoint = data.last_checkpoint;
    this.estimated_delivery = data.estimated_delivery;
    this.raw_tracking_data = data.raw_tracking_data || {};
  }
}

module.exports = Shipment;
