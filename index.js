require('dotenv').config();
const express = require('express');
const ShopifyAdapter = require('./adapters/shopify');
const EbayAdapter = require('./adapters/ebay');
const TrackingEngine = require('./trackingEngine');

const app = express();
const port = process.env.PORT || 3000;
const aftershipApiKey = process.env.AFTERSHIP_API_KEY;

app.use(express.json());

const trackingEngine = aftershipApiKey ? new TrackingEngine(aftershipApiKey) : null;

// Simulated Database
const db = {
  linkedAccounts: [], // { id, marketplace, shopName, accessToken }
  manualDeliveries: [], // { trackingNumber, carrier, title }
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', trackingEngine: !!trackingEngine });
});

// --- Phase 3 Endpoints ---

// Manually register a tracking number + carrier
app.post('/deliveries/manual', async (req, res) => {
  const { trackingNumber, carrier, title } = req.body;

  if (!trackingNumber || !carrier) {
    return res.status(400).json({ error: 'Missing trackingNumber or carrier' });
  }

  if (!trackingEngine) {
    return res.status(503).json({ error: 'Tracking Engine not configured' });
  }

  try {
    const slug = trackingEngine.mapCarrierToSlug(carrier);
    const registered = await trackingEngine.registerTracking(trackingNumber, slug, {
      title: title || `Manual Delivery: ${trackingNumber}`
    });

    const delivery = { trackingNumber, carrier, title, registered };
    db.manualDeliveries.push(delivery);

    res.json({ success: true, delivery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simulated Account Linking
app.post('/accounts/link', async (req, res) => {
  const { marketplace, shopName, accessToken } = req.body;

  if (!marketplace || !accessToken) {
    return res.status(400).json({ error: 'Missing marketplace or accessToken' });
  }

  // In a real app, shopName is required for Shopify
  if (marketplace === 'shopify' && !shopName) {
    return res.status(400).json({ error: 'shopName is required for Shopify' });
  }

  const newAccount = {
    id: Date.now().toString(),
    marketplace,
    shopName,
    accessToken,
    linkedAt: new Date(),
  };

  db.linkedAccounts.push(newAccount);

  // Trigger an initial sync for the new account
  try {
    if (marketplace === 'shopify') {
      // Simulate fetching first order or just acknowledging
      // In Phase 3, we just link it. Actual periodic syncing would be Phase 4/Background
    }
  } catch (error) {
    console.error('Initial sync failed:', error);
  }

  res.json({ success: true, account: newAccount });
});

// List all deliveries (manual + triggered syncs from marketplaces)
app.get('/deliveries', async (req, res) => {
  // In a full implementation, we'd iterate over linked accounts and manual deliveries
  // For now, return what we have in DB
  res.json({
    manual: db.manualDeliveries,
    linkedAccounts: db.linkedAccounts
  });
});

// --- End Phase 3 Endpoints ---

// Sync Shopify order tracking to AfterShip
app.post('/sync/shopify/:shop/:orderId', async (req, res) => {
  const { shop, orderId } = req.params;
  const accessToken = req.headers['x-shopify-access-token'];

  if (!accessToken) {
    return res.status(401).json({ error: 'Missing Shopify access token' });
  }

  if (!trackingEngine) {
    return res.status(503).json({ error: 'Tracking Engine not configured' });
  }

  const adapter = new ShopifyAdapter(shop, accessToken);
  try {
    const trackingInfos = await adapter.fetchTrackingInfo(orderId);
    const results = [];

    for (const info of trackingInfos) {
      if (info.tracking_number) {
        const slug = trackingEngine.mapCarrierToSlug(info.tracking_company || '');
        const registered = await trackingEngine.registerTracking(info.tracking_number, slug, {
          order_id: orderId,
          title: `Shopify Order ${orderId}`
        });
        results.push(registered);
      }
    }
    res.json({ success: true, trackingInfos, registered: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync eBay order tracking to AfterShip
app.post('/sync/ebay/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Missing eBay access token' });
  }

  if (!trackingEngine) {
    return res.status(503).json({ error: 'Tracking Engine not configured' });
  }

  const adapter = new EbayAdapter(accessToken);
  try {
    const trackingInfos = await adapter.fetchTrackingInfo(orderId);
    const results = [];

    for (const info of trackingInfos) {
      if (info.tracking_number) {
        const slug = trackingEngine.mapCarrierToSlug(info.tracking_company || '');
        const registered = await trackingEngine.registerTracking(info.tracking_number, slug, {
          order_id: orderId,
          title: `eBay Order ${orderId}`
        });
        results.push(registered);
      }
    }
    res.json({ success: true, trackingInfos, registered: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route to fetch tracking for a Shopify order
app.get('/track/shopify/:shop/:orderId', async (req, res) => {
  const { shop, orderId } = req.params;
  const accessToken = req.headers['x-shopify-access-token'];

  if (!accessToken) {
    return res.status(401).json({ error: 'Missing Shopify access token' });
  }

  const adapter = new ShopifyAdapter(shop, accessToken);
  try {
    const trackingInfo = await adapter.fetchTrackingInfo(orderId);
    res.json(trackingInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route to fetch tracking for an eBay order
app.get('/track/ebay/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Missing eBay access token' });
  }

  const adapter = new EbayAdapter(accessToken);
  try {
    const trackingInfo = await adapter.fetchTrackingInfo(orderId);
    res.json(trackingInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

module.exports = app;
