# How to Add Products to AM Global Hub

## Overview

Products are managed through the Admin Dashboard at `/admin`. No coding required — just fill out a form and the product appears live on the `/products` page immediately.

---

## Prerequisites

Before adding a product, make sure you have:

- A **product image** hosted online (e.g. uploaded to Supabase Storage, Cloudinary, or any public URL)
- The **category** the product belongs to already created in Supabase
- Access to the admin page at `http://localhost:3000/admin` (or your live domain `/admin`)

---

## Step-by-Step Instructions

### 1. Open the Admin Dashboard

Navigate to `/admin` in your browser. You'll see the **Add Product** form on the left and existing products on the right.

---

### 2. Fill Out the Product Form

| Field | Description | Required |
|---|---|---|
| **Product Name** | Full display name of the product (e.g. "Executive Leather Notebook") | ✅ Yes |
| **Slug** | URL-friendly identifier, lowercase with hyphens (e.g. `executive-leather-notebook`) | ✅ Yes |
| **Description** | Short description shown on the product card and detail page | No |
| **Image URL** | Full public URL to the product image (e.g. `https://...supabase.co/storage/...`) | No |
| **Category** | Select from the dropdown — this links the product to a category | No |
| **MOQ** | Minimum Order Quantity (e.g. `50`) | No |
| **Price Range** | Display price string (e.g. `₹999 – ₹1,499`) | No |

---

### 3. Slug Rules

The slug is used in the product URL: `/products/<slug>`

- Use only **lowercase letters, numbers, and hyphens**
- No spaces or special characters
- Must be **unique** — two products cannot share the same slug

✅ Good: `wireless-charger-pro`  
❌ Bad: `Wireless Charger Pro`, `wireless_charger`, `wireless charger`

---

### 4. Click "Add Product"

Hit the **Add Product** button. You'll see a success toast notification at the top right. The product will immediately appear in:

- The product grid on `/products`
- The relevant category page at `/categories/<category-slug>`
- The admin dashboard product list

---

### 5. Verify the Product

After adding:

1. Go to `/products` and confirm the product appears in the grid
2. Click the product card — it should open `/products/<your-slug>`
3. If you assigned a category, visit `/categories/<category-slug>` to confirm it appears there too

---

## Deleting a Product

On the Admin Dashboard, each product card has a **Delete Product** button. Clicking it will ask for confirmation, then permanently remove the product from the database.

> ⚠️ This action cannot be undone.

---

## Uploading Images

The admin form accepts any public image URL. The recommended workflow:

1. Go to your **Supabase project → Storage**
2. Upload the image to the `products` bucket (or create one if it doesn't exist)
3. Set the bucket to **Public**
4. Copy the public URL and paste it into the **Image URL** field

Recommended image specs:
- **Format:** JPG or PNG
- **Aspect ratio:** 1:1 (square) — product cards display images in a square crop
- **Size:** Under 500KB for fast loading

---

## Tips

- Always fill in a **description** — it appears on both the card and the detail page
- Use a **price range string** like `₹500 – ₹1,200` rather than a number, since pricing is display-only
- If a product isn't showing up, double-check the slug for spaces or uppercase letters
- The `/admin` page has **no login protection** — keep the URL private until auth is added
