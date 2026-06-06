const axios = require('axios');

class EbayAdapter {
  constructor(accessToken, environment = 'production') {
    this.accessToken = accessToken;
    this.baseUrl = environment === 'sandbox' 
      ? 'https://api.sandbox.ebay.com' 
      : 'https://api.ebay.com';
  }

  async getOrders() {
    try {
      const response = await axios.get(`${this.baseUrl}/sell/fulfillment/v1/order`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching eBay orders:', error.response?.data || error.message);
      throw error;
    }
  }

  async getOrder(orderId) {
    try {
      const response = await axios.get(`${this.baseUrl}/sell/fulfillment/v1/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching eBay order ${orderId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async fetchTrackingInfo(orderId) {
    const order = await this.getOrder(orderId);
    const trackingInfos = [];

    if (order.fulfillments) {
      for (const fulfillment of order.fulfillments) {
        trackingInfos.push({
          tracking_number: fulfillment.shipmentTrackingNumber,
          tracking_company: fulfillment.shippingCarrierCode,
          status: fulfillment.fulfillmentStatus,
        });
      }
    } else if (order.orderFulfillments) {
       // Handle different response structures if necessary
       for (const fulfillment of order.orderFulfillments) {
        trackingInfos.push({
          tracking_number: fulfillment.shipmentTrackingNumber,
          tracking_company: fulfillment.shippingCarrierCode,
          status: fulfillment.fulfillmentStatus,
        });
      }
    }

    return trackingInfos;
  }
}

module.exports = EbayAdapter;
