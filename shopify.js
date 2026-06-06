const axios = require('axios');

class ShopifyAdapter {
  constructor(shopName, accessToken, apiVersion = '2024-04') {
    this.shopName = shopName;
    this.accessToken = accessToken;
    this.apiVersion = apiVersion;
    this.baseUrl = `https://${shopName}.myshopify.com/admin/api/${apiVersion}`;
  }

  async getOrders() {
    try {
      const response = await axios.get(`${this.baseUrl}/orders.json?status=any`, {
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
        },
      });
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching Shopify orders:', error.response?.data || error.message);
      throw error;
    }
  }

  async getFulfillments(orderId) {
    try {
      const response = await axios.get(`${this.baseUrl}/orders/${orderId}/fulfillments.json`, {
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
        },
      });
      return response.data.fulfillments;
    } catch (error) {
      console.error(`Error fetching fulfillments for Shopify order ${orderId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async fetchTrackingInfo(orderId) {
    const fulfillments = await this.getFulfillments(orderId);
    return fulfillments.map(f => ({
      tracking_number: f.tracking_number,
      tracking_company: f.tracking_company,
      tracking_url: f.tracking_url,
      status: f.shipment_status,
    }));
  }
}

module.exports = ShopifyAdapter;
