# ✅ WooCommerce Checkout - Implementation Checklist

## 🎉 CODE COMPLETE - READY FOR WORDPRESS SETUP

All code has been committed and pushed to GitHub. Follow this checklist to activate WooCommerce checkout.

---

## Phase 1: WordPress Setup (30-45 minutes)

### ☐ 1. Install Payment Gateway Plugin
```bash
# Log into WordPress: https://www.gaaka.com/dev/wp-admin

# Option A: Via WP-CLI
wp plugin install woocommerce-gateway-stripe --activate

# Option B: Via WordPress Admin
# Plugins → Add New → Search "Stripe" → Install → Activate
```

**Plugin:** WooCommerce Stripe Gateway  
**Why:** Handles credit/debit cards, Apple Pay, Google Pay

---

### ☐ 2. Configure Stripe

**Get API Keys:**
1. Create account at https://stripe.com
2. Go to **Developers → API Keys**
3. Copy:
   - Test Publishable Key: `pk_test_...`
   - Test Secret Key: `sk_test_...`

**Add to WooCommerce:**
1. **WooCommerce → Settings → Payments → Stripe**
2. **Enable:** ✓ Yes
3. **Test Mode:** ✓ Enable (for testing)
4. **Test Publishable Key:** Paste
5. **Test Secret Key:** Paste
6. **Payment Request Buttons:** ✓ Enable
7. **Save Changes**

---

### ☐ 3. Set Up Shipping Zones

**Germany (Domestic):**
1. **WooCommerce → Settings → Shipping → Add Zone**
2. **Zone Name:** Germany
3. **Regions:** Germany
4. **Add Shipping Method:**
   - Flat Rate: €4.90 (name: "Standard Shipping")
   - Free Shipping: €0 (minimum order: €50)
5. **Save**

**European Union:**
1. **Add Zone**
2. **Zone Name:** EU
3. **Regions:** Select EU countries (Austria, Belgium, France, etc.)
4. **Add Shipping Method:**
   - Flat Rate: €12.90
   - Free Shipping: €0 (minimum order: €100)
5. **Save**

**Rest of World:**
1. **Add Zone**
2. **Zone Name:** International
3. **Regions:** Rest of World
4. **Add Shipping Method:**
   - Flat Rate: €25.00
5. **Save**

---

### ☐ 4. Configure Taxes

1. **WooCommerce → Settings → Tax**
2. **Enable taxes:** ✓ Yes
3. **Prices entered with tax:** Yes, I will enter prices inclusive of tax
4. **Calculate tax based on:** Customer billing address
5. **Standard Rates → Insert Row:**
   - Country: DE
   - State: *
   - Rate %: 19
   - Tax Name: VAT
6. **Save Changes**

---

### ☐ 5. Configure Checkout Settings

1. **WooCommerce → Settings → Advanced**
2. **Checkout Process:**
   - Guest Checkout: ✓ Enable
   - Create Account: Optional
3. **Checkout Endpoints:**
   - Cart: /cart
   - Checkout: /checkout
   - My Account: /my-account
4. **Save Changes**

---

### ☐ 6. Customize Email Templates

1. **WooCommerce → Settings → Emails**
2. **Configure:**
   - "From" Name: GAAKA
   - "From" Email: orders@gaaka.com
   - Header Image: Upload GAAKA logo
3. **New Order (to you):**
   - Enable: ✓
   - Recipients: your@email.com
4. **Order Confirmation (to customer):**
   - Enable: ✓
5. **Save Changes**

---

### ☐ 7. Enable Store API

1. **Settings → Permalinks**
2. **Click "Save Changes"** (flushes rewrite rules)
3. **Test API:**
```bash
curl https://www.gaaka.com/dev/wp-json/wc/store/v1/cart
```
Should return: `{"items":[],...}` (empty cart)

---

## Phase 2: Activate on Next.js Site (10 minutes)

### ☐ 8. Replace Cart & Checkout Pages

**Backup old files:**
```bash
cd /Users/iDavid/Documents/Gaaka

# Backup
mv pages/cart.tsx pages/cart-old-backup.tsx
mv pages/checkout.tsx pages/checkout-old-backup.tsx
```

**Activate WooCommerce versions:**
```bash
# Rename new files
mv pages/cart-woocommerce.tsx pages/cart.tsx
mv pages/checkout-woocommerce.tsx pages/checkout.tsx
```

**Commit changes:**
```bash
git add pages/
git commit -m "chore: activate WooCommerce cart and checkout pages"
git push
```

Vercel will auto-deploy in ~30 seconds.

---

### ☐ 9. Update Environment Variables

**Add to Vercel:**
1. Go to Vercel dashboard
2. **Settings → Environment Variables**
3. **Add:**
   ```
   NEXT_PUBLIC_WORDPRESS_URL=https://www.gaaka.com/dev
   ```
4. **Redeploy** to apply

---

## Phase 3: Testing (15 minutes)

### ☐ 10. Test Add to Cart

1. Browse to your Next.js site (Vercel URL)
2. Go to product page
3. Click "Add to Cart" (if button exists, otherwise skip)
4. Verify success message
5. Check cart icon updates

---

### ☐ 11. Test Cart Page

1. Go to `/cart`
2. Verify:
   - ✓ Items display
   - ✓ Quantities can be updated
   - ✓ Items can be removed
   - ✓ Totals calculate correctly

---

### ☐ 12. Test Checkout Flow

1. Click "Proceed to Checkout"
2. Should redirect to: `https://www.gaaka.com/dev/checkout`
3. Fill in billing details:
   - Email: test@example.com
   - Name: Test Customer
   - Address: Test Street 123
   - City: Berlin
   - Postcode: 10115
   - Country: Germany
4. Select shipping method
5. Select payment method: **Credit Card**
6. Enter test card:
   ```
   Card Number: 4242 4242 4242 4242
   Expiry: 12/34
   CVC: 123
   ```
7. Click "Place Order"
8. ✓ Should see order confirmation

---

### ☐ 13. Verify Order in WordPress

1. **WooCommerce → Orders**
2. ✓ See test order
3. Click to view details
4. ✓ Verify all information correct

---

### ☐ 14. Check Email Notifications

1. Check your email (admin)
2. ✓ Should receive "New Order" email
3. Check test customer email
4. ✓ Should receive "Order Confirmation"

---

## Phase 4: Go Live (15 minutes)

### ☐ 15. Switch Stripe to Live Mode

1. **Get Live API Keys from Stripe:**
   - Publishable: `pk_live_...`
   - Secret: `sk_live_...`

2. **Update WooCommerce:**
   - WooCommerce → Settings → Payments → Stripe
   - Uncheck "Test Mode"
   - Add Live keys
   - Save Changes

---

### ☐ 16. Set Up Stripe Webhooks

1. **Stripe Dashboard → Developers → Webhooks**
2. **Add Endpoint:**
   - URL: `https://www.gaaka.com/dev/?wc-api=wc_stripe`
   - Events: Select all checkout events
3. **Copy Webhook Secret**
4. **Add to WooCommerce:**
   - Paste in "Webhook Secret" field
   - Save

---

### ☐ 17. Test Live Payment (Optional)

1. Make small test purchase (€1)
2. Use real card
3. Verify payment in Stripe dashboard
4. Verify order in WooCommerce
5. Verify email received

---

### ☐ 18. Security Checklist

- [  ] SSL certificate installed (HTTPS)
- [  ] Force secure checkout enabled
- [  ] Stripe webhook configured
- [  ] Test mode disabled
- [  ] Privacy policy page created
- [  ] Terms & conditions page created
- [  ] GDPR compliance enabled

---

## Phase 5: Optional Enhancements

### ☐ 19. Add PayPal (Alternative Payment)

```bash
wp plugin install woocommerce-paypal-payments --activate
```

1. WooCommerce → Settings → Payments → PayPal
2. Configure PayPal credentials
3. Enable

---

### ☐ 20. Customize Checkout Design

**Add GAAKA branding to checkout:**

1. **Appearance → Customize → Additional CSS**
2. **Add:**
```css
.wc-block-components-button,
.woocommerce button.button {
  background-color: #d97706 !important;
}

.wc-block-components-button:hover,
.woocommerce button.button:hover {
  background-color: #b45309 !important;
}
```

---

### ☐ 21. Set Up Shipping Labels (Optional)

Install shipping plugin:
- ShipStation for WooCommerce
- WooCommerce Shipping & Tax
- DHL for WooCommerce

---

## ✅ Completion Status

**Phase 1: WordPress Setup**
- [  ] Payment gateway installed
- [  ] Stripe configured
- [  ] Shipping zones created
- [  ] Taxes configured
- [  ] Checkout settings updated
- [  ] Email templates customized
- [  ] Store API enabled

**Phase 2: Next.js Activation**
- [  ] Cart page replaced
- [  ] Checkout page replaced
- [  ] Changes deployed to Vercel
- [  ] Environment variables updated

**Phase 3: Testing**
- [  ] Add to cart tested
- [  ] Cart page tested
- [  ] Checkout tested
- [  ] Order verified
- [  ] Emails verified

**Phase 4: Go Live**
- [  ] Stripe live mode enabled
- [  ] Webhooks configured
- [  ] Live payment tested
- [  ] Security checklist complete

---

## 🎉 You're Live!

Once all checkboxes are ticked:

✅ **Customers can:**
- Browse products on Next.js site
- Add items to cart
- Complete checkout on WooCommerce
- Pay via Stripe/PayPal
- Receive order confirmations

✅ **You can:**
- Manage orders in WordPress
- Process payments securely
- Track shipping
- Send customer updates
- View sales reports

---

## 📞 Need Help?

**Documentation:**
- [WOOCOMMERCE_CHECKOUT_GUIDE.md](WOOCOMMERCE_CHECKOUT_GUIDE.md) - Detailed setup
- [WOOCOMMERCE_INTEGRATION_SUMMARY.md](WOOCOMMERCE_INTEGRATION_SUMMARY.md) - Overview

**Test Cards:**
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
```

**Support:**
- WooCommerce Docs: https://woocommerce.com/documentation/
- Stripe Docs: https://stripe.com/docs

---

**Estimated Total Time:** 1-1.5 hours  
**Current Status:** Code ready, WordPress setup pending  
**Next Step:** Phase 1, Task 1 (Install Stripe plugin)

🚀 **Ready to start? Begin with Phase 1!**
