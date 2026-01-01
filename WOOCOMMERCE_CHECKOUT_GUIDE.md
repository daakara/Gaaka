# WooCommerce Checkout Integration Guide

This guide explains how GAAKA uses WooCommerce to handle the complete checkout, payment, and order management flow.

## 🏗️ Architecture Overview

```
┌─────────────────────┐
│   Next.js Frontend  │  ← Product display, marketing
│   (Static/Vercel)   │
└──────────┬──────────┘
           │
           │ 1. User adds to cart
           ▼
┌─────────────────────┐
│  WooCommerce API    │  ← Cart management
│  (REST Store API)   │
└──────────┬──────────┘
           │
           │ 2. User clicks "Checkout"
           ▼
┌─────────────────────┐
│ WooCommerce Checkout│  ← Full checkout experience
│   (WordPress)       │
└──────────┬──────────┘
           │
           │ 3. Payment processing
           ▼
┌─────────────────────┐
│  Payment Gateway    │  ← Stripe, PayPal, etc.
│  (Plugin)           │
└──────────┬──────────┘
           │
           │ 4. Order confirmation
           ▼
┌─────────────────────┐
│ Order Management    │  ← WordPress admin
│  (WooCommerce)      │
└─────────────────────┘
```

## 📦 What WooCommerce Handles

✅ **Cart Management**
- Add/remove/update items
- Session persistence (cookies)
- Cart totals calculation

✅ **Checkout Process**
- Billing/shipping address forms
- Shipping method selection
- Payment method selection
- Order review
- Terms & conditions

✅ **Payment Processing**
- Multiple payment gateways
- Secure payment handling
- 3D Secure / SCA compliance
- Payment confirmations

✅ **Order Management**
- Order storage in database
- Order status tracking
- Customer emails
- Admin notifications
- Order history

✅ **Shipping & Tax**
- Shipping zone configuration
- Multiple shipping methods
- Tax calculation by location
- Shipping label generation

## 🚀 Setup Instructions

### Step 1: Install Required Plugins

Log into WordPress at `https://www.gaaka.com/dev/wp-admin`

**Install these plugins:**

1. **WooCommerce** (already installed)
2. **WooCommerce Blocks** (for modern checkout)
3. **Payment Gateway Plugin** - Choose one:
   - **WooCommerce Stripe Gateway** (recommended)
   - **WooCommerce PayPal Payments**
   - **Klarna Payments for WooCommerce**

```bash
# Via WP-CLI
wp plugin install woocommerce-gateway-stripe --activate
wp plugin install woocommerce-paypal-payments --activate
```

### Step 2: Configure WooCommerce Settings

#### General Settings
1. Go to **WooCommerce → Settings → General**
2. **Store Address:** Your business address
3. **Selling Location(s):** Select target countries
4. **Currency:** EUR (€)
5. **Currency Position:** Left with space

#### Shipping Settings
1. Go to **WooCommerce → Settings → Shipping**
2. **Create Shipping Zones:**

**Zone 1: Germany**
- Zone Name: Germany
- Regions: Germany
- Shipping Methods:
  - Flat Rate: €4.90 (orders under €50)
  - Free Shipping: €0 (orders over €50)

**Zone 2: European Union**
- Zone Name: EU
- Regions: Europe (select EU countries)
- Shipping Methods:
  - Flat Rate: €12.90 (orders under €100)
  - Free Shipping: €0 (orders over €100)

**Zone 3: Rest of World**
- Zone Name: International
- Regions: Rest of World
- Shipping Methods:
  - Flat Rate: €25.00

3. **Save changes**

#### Tax Settings
1. Go to **WooCommerce → Settings → Tax**
2. **Enable taxes:** Yes
3. **Prices entered with tax:** Prices inclusive of tax
4. **Calculate tax based on:** Customer billing address
5. **Standard rates:**
   - Country: DE (Germany)
   - Rate: 19%
   - Tax name: VAT

**EU Countries:**
- Add tax rates for each EU country (varies by country)
- Enable "Tax based on customer location"

#### Payment Settings
1. Go to **WooCommerce → Settings → Payments**
2. **Enable payment methods:**

**Stripe:**
- Enable: Yes
- Title: Credit/Debit Card
- Description: "Pay securely with your credit or debit card"
- Configure API keys (see Stripe setup below)

**PayPal:**
- Enable: Yes  
- Title: PayPal
- Description: "Pay via PayPal"
- Configure API credentials

**Bank Transfer (optional):**
- Enable: Yes
- Title: Direct Bank Transfer
- Account details: Add your bank details

### Step 3: Configure Stripe Payment Gateway

1. Go to **WooCommerce → Settings → Payments → Stripe**

2. **Get Stripe API Keys:**
   - Create account at https://stripe.com
   - Go to Developers → API Keys
   - Copy "Publishable key" and "Secret key"

3. **Stripe Settings in WooCommerce:**
   - **Enable:** Yes
   - **Title:** Credit/Debit Card
   - **Test mode:** Enable (for testing)
   - **Test Publishable Key:** `pk_test_...`
   - **Test Secret Key:** `sk_test_...`
   - **Capture:** Capture charge immediately
   - **Payment Request Buttons:** Enable (for Apple Pay/Google Pay)
   - **Webhook Secret:** (generate in Stripe dashboard)

4. **Set up Webhooks in Stripe:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://www.gaaka.com/dev/?wc-api=wc_stripe`
   - Select events:
     - `charge.succeeded`
     - `charge.failed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copy webhook signing secret to WooCommerce settings

5. **Go Live:**
   - Once tested, disable test mode
   - Add live API keys: `pk_live_...` and `sk_live_...`

### Step 4: Configure Checkout Page

1. Go to **WooCommerce → Settings → Advanced**
2. **Page Setup:**
   - Cart page: Select /cart
   - Checkout page: Select /checkout
   - Terms and conditions: Create and select page

3. **Checkout Settings:**
   - **Guest checkout:** Enable (allow non-account purchases)
   - **Account creation:** Optional
   - **Require phone:** Yes
   - **Company name:** Optional

### Step 5: Customize Checkout Appearance

**Option A: Use Default WooCommerce Checkout**
- Works out of the box
- Mobile-responsive
- Supports all payment gateways

**Option B: Use WooCommerce Blocks (Recommended)**
1. Go to **Pages → Checkout → Edit**
2. Add **Checkout Block**
3. Customize:
   - Field layout
   - Colors (use GAAKA brand colors)
   - Button styles
   - Express checkout buttons

**Custom CSS for Branding:**
```css
/* Add to Appearance → Customize → Additional CSS */

/* Primary button color */
.wc-block-components-button,
.woocommerce #respond input#submit,
.woocommerce button.button,
.woocommerce input.button {
  background-color: #d97706 !important; /* amber-600 */
  border-color: #d97706 !important;
}

.wc-block-components-button:hover,
.woocommerce #respond input#submit:hover,
.woocommerce button.button:hover,
.woocommerce input.button:hover {
  background-color: #b45309 !important; /* amber-700 */
}

/* Link colors */
.woocommerce a {
  color: #d97706;
}

/* Price color */
.woocommerce .amount {
  color: #d97706;
}
```

### Step 6: Enable WooCommerce REST API

Required for cart synchronization from Next.js:

1. Go to **WooCommerce → Settings → Advanced → REST API**
2. **Add Key:**
   - Description: GAAKA Frontend
   - User: Admin user
   - Permissions: Read/Write
3. **Copy keys** (you'll need them)

4. **Update .env.local** in Next.js project:
```bash
NEXT_PUBLIC_WORDPRESS_URL=https://www.gaaka.com/dev
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...
```

### Step 7: Enable WooCommerce Store API

The cart integration uses WooCommerce Store API (Block-based):

1. **Ensure WooCommerce Blocks plugin is active**
2. **Enable REST API:**
   - Go to **Settings → Permalinks**
   - Click **Save Changes** (flushes rewrite rules)
3. **Test endpoint:**
   ```bash
   curl https://www.gaaka.com/dev/wp-json/wc/store/v1/cart
   ```
   Should return cart data (empty cart if no session)

### Step 8: Configure Email Notifications

1. Go to **WooCommerce → Settings → Emails**

**Configure these emails:**

**New Order (to admin):**
- Enable: Yes
- Recipients: your@email.com
- Subject: New order #{order_number}

**Processing Order (to customer):**
- Enable: Yes
- Subject: Your order has been received

**Completed Order (to customer):**
- Enable: Yes
- Subject: Your order is complete

**Customer Invoice:**
- Enable: Yes

**Email Sender Options:**
- "From" name: GAAKA
- "From" email: orders@gaaka.com
- Header image: Upload GAAKA logo
- Footer text: Add company details

### Step 9: Test the Integration

**Test on Next.js Site:**

1. Browse to a product page
2. Click "Add to Cart"
3. Verify item appears in cart
4. Click "Proceed to Checkout"
5. Should redirect to: `https://www.gaaka.com/dev/checkout`

**Test Checkout Flow:**

1. Fill in billing details
2. Select shipping method
3. Select payment method
4. Place test order (use Stripe test card: `4242 4242 4242 4242`)
5. Verify order confirmation page
6. Check admin for new order

**Stripe Test Cards:**
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

### Step 10: Go Live Checklist

- [ ] Disable WooCommerce test mode
- [ ] Add live Stripe API keys
- [ ] Test real payment (small amount)
- [ ] Verify email notifications working
- [ ] Set up SSL certificate (HTTPS)
- [ ] Enable "Force secure checkout"
- [ ] Test on mobile devices
- [ ] Review privacy policy & terms
- [ ] Set up automatic backups
- [ ] Configure abandoned cart recovery (optional plugin)

## 🔐 Security Configuration

### Enable HTTPS for Checkout

1. **Install SSL Certificate** (via Namecheap)
2. **Force HTTPS:**
```php
// Add to wp-config.php
define('FORCE_SSL_ADMIN', true);
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
```

3. **WooCommerce Force Secure Checkout:**
   - WooCommerce → Settings → Advanced
   - Check "Force secure checkout"

### GDPR Compliance

1. **Install WooCommerce Privacy Plugin**
2. **Create Privacy Policy Page**
3. **Enable features:**
   - Consent checkbox on checkout
   - Data erasure requests
   - Data export requests

## 📊 Order Management

### View Orders
1. Go to **WooCommerce → Orders**
2. See all orders with status
3. Click order to view details

### Order Statuses
- **Pending Payment:** Awaiting payment
- **Processing:** Payment received, preparing shipment
- **On Hold:** Awaiting stock or verification
- **Completed:** Order fulfilled
- **Cancelled:** Order cancelled
- **Refunded:** Order refunded
- **Failed:** Payment failed

### Process an Order
1. Open order in admin
2. Update status to "Processing"
3. Add tracking number (if using shipping plugin)
4. Update status to "Completed"
5. Customer receives notification email

## 🚚 Shipping Integration (Optional)

**Recommended Shipping Plugins:**

1. **ShipStation for WooCommerce**
   - Multi-carrier shipping labels
   - Tracking numbers
   - Bulk processing

2. **WooCommerce Shipping & Tax**
   - Real-time shipping rates
   - Print labels from WooCommerce
   - Automatic tax calculation

3. **DHL for WooCommerce** (if using DHL)

## 💰 Payment Gateway Options

### Stripe (Recommended)
✅ Credit/debit cards
✅ Apple Pay / Google Pay
✅ 3D Secure / SCA
✅ Subscriptions support
❌ 2.9% + €0.25 per transaction

### PayPal
✅ PayPal account payments
✅ Credit cards (via PayPal)
✅ Wide customer recognition
❌ 2.49% + €0.35 per transaction

### Klarna
✅ Pay later options
✅ Installments
✅ Popular in EU
❌ Higher fees

### Bank Transfer
✅ No transaction fees
✅ Good for B2B
❌ Manual reconciliation
❌ Delayed payment

## 🔄 Next.js → WooCommerce Flow

### Add to Cart
```typescript
// User clicks "Add to Cart" on Next.js product page
import { addToWooCommerceCart } from '@/lib/woocommerce/cart-service'

const result = await addToWooCommerceCart(productId, quantity)
// ↓
// POST https://www.gaaka.com/dev/wp-json/wc/store/v1/cart/add-item
// ↓
// WooCommerce creates cart session (cookie)
// ↓
// Returns updated cart data
```

### View Cart
```typescript
// User views cart on Next.js
import { getCart } from '@/lib/woocommerce/cart-service'

const { cart } = await getCart()
// ↓
// GET https://www.gaaka.com/dev/wp-json/wc/store/v1/cart
// ↓
// Returns cart with items, totals, shipping
```

### Checkout
```typescript
// User clicks "Proceed to Checkout"
window.location.href = 'https://www.gaaka.com/dev/checkout'
// ↓
// Redirects to WooCommerce checkout page
// ↓
// WooCommerce handles:
// - Address forms
// - Shipping selection
// - Payment processing
// - Order confirmation
```

## 🎨 Customization Options

### Custom Thank You Page

Redirect to Next.js after order:

```php
// Add to theme's functions.php
add_action('woocommerce_thankyou', 'gaaka_custom_redirect');
function gaaka_custom_redirect($order_id) {
    $order = wc_get_order($order_id);
    $redirect_url = 'https://gaaka.vercel.app/order-confirmation?order=' . $order_id;
    wp_redirect($redirect_url);
    exit;
}
```

### Custom Checkout Fields

Add gift message field:

```php
add_action('woocommerce_after_order_notes', 'gaaka_add_gift_message');
function gaaka_add_gift_message($checkout) {
    echo '<div class="gift-message">';
    woocommerce_form_field('gift_message', array(
        'type' => 'textarea',
        'class' => array('form-row-wide'),
        'label' => 'Gift Message (optional)',
        'placeholder' => 'Add a personalized message...',
    ), $checkout->get_value('gift_message'));
    echo '</div>';
}
```

## 🆘 Troubleshooting

### Cart not syncing
1. Check WooCommerce Store API is enabled
2. Verify CORS headers allow requests
3. Check browser console for errors
4. Ensure cookies are enabled

### Checkout not loading
1. Verify checkout page is published
2. Check permalinks (Settings → Permalinks → Save)
3. Disable conflicting plugins
4. Check for JavaScript errors

### Payment not processing
1. Verify API keys are correct
2. Check payment gateway is enabled
3. Review webhook configuration
4. Check Stripe/PayPal dashboard for errors

### Emails not sending
1. Install WP Mail SMTP plugin
2. Configure SMTP settings
3. Test email delivery
4. Check spam folder

## 📚 Resources

- **WooCommerce Docs:** https://woocommerce.com/documentation/
- **Store API:** https://github.com/woocommerce/woocommerce-blocks/tree/trunk/src/StoreApi
- **Stripe Plugin:** https://woocommerce.com/products/stripe/
- **PayPal Plugin:** https://woocommerce.com/products/woocommerce-paypal-payments/

---

**Next Steps:**
1. Complete WordPress/WooCommerce setup (Steps 1-8 above)
2. Replace old checkout files:
   - Rename `pages/cart-woocommerce.tsx` → `pages/cart.tsx`
   - Rename `pages/checkout-woocommerce.tsx` → `pages/checkout.tsx`
3. Test complete purchase flow
4. Go live with real payment gateway
