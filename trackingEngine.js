const axios = require('axios');

class TrackingEngine {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.aftership.com/v4';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'aftership-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Registers a new tracking number with AfterShip
   * @param {string} trackingNumber 
   * @param {string} slug - Carrier slug (e.g., 'ups', 'fedex', 'usps')
   * @param {Object} metadata - Optional metadata (order_id, title, etc.)
   */
  async registerTracking(trackingNumber, slug, metadata = {}) {
    try {
      const response = await this.client.post('/trackings', {
        tracking: {
          tracking_number: trackingNumber,
          slug: slug,
          ...metadata
        }
      });
      return response.data.data.tracking;
    } catch (error) {
      // If tracking already exists, AfterShip might return an error. 
      // We should handle that gracefully or just return the existing tracking if possible.
      if (error.response && error.response.status === 4003) { // Specific AfterShip error for already exists
         console.warn(`Tracking ${trackingNumber} already exists in AfterShip.`);
         return this.getTracking(trackingNumber, slug);
      }
      console.error('Error registering tracking with AfterShip:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Fetches the latest tracking updates for a tracking number
   * @param {string} trackingNumber 
   * @param {string} slug 
   */
  async getTracking(trackingNumber, slug) {
    try {
      const response = await this.client.get(`/trackings/${slug}/${trackingNumber}`);
      return response.data.data.tracking;
    } catch (error) {
      console.error(`Error fetching tracking for ${trackingNumber}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Helper to map marketplace carrier names to AfterShip slugs
   * @param {string} marketplaceCarrier 
   */
  mapCarrierToSlug(marketplaceCarrier) {
    const mapping = {
      'UPS': 'ups',
      'USPS': 'usps',
      'FedEx': 'fedex',
      'DHL': 'dhl',
      'Royal Mail': 'royal-mail',
      'Canada Post': 'canada-post',
      'Australia Post': 'australia-post',
    };
    return mapping[marketplaceCarrier] || marketplaceCarrier.toLowerCase().replace(/\s+/g, '-');
  }
}

module.exports = TrackingEngine;
