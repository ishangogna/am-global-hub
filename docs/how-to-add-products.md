# AM Global Hub — Admin Dashboard Guide

## Overview

The admin dashboard at `/admin` is the control centre for the entire website. It requires login and covers three areas: **Products**, **Categories**, and **Featured Products**. No coding required for any of these tasks.

---

## Logging In

Navigate to `/admin` in your browser. You will be automatically redirected to `/admin/login`.

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `AmGlobalHub@123` |

After a successful login you are redirected to the dashboard. The session lasts **7 days** — you won't need to log in again on the same device within that window.

To log out, click the **Sign Out** button in the top-right corner of the dashboard.

> If you visit `/admin/login` while already logged in, you are automatically redirected to the dashboard.

---

## Dashboard Tabs

The dashboard has three tabs accessible from the tab bar at the top of the page.

---

## Tab 1 — Products

### Adding a Product

Fill in the form on the left side of the Products tab.

| Field | Description | Required |
|---|---|---|
| **Image URL** | Full public URL to the product image. A live preview appears above the field as you type. | No |
| **Product Name** | Full display name (e.g. "Executive Leather Notebook") | ✅ Yes |
| **Slug** | URL-safe identifier used in `/products/<slug>`. Auto-generated from the name — click **Manual** to override. | ✅ Yes |
| **Description** | Shown on the product card and detail page | No |
| **Category** | Select from the dropdown. Categories are managed in the Categories tab. | No |
| **MOQ** | Minimum Order Quantity as a number (e.g. `50`) | No |
| **Price Range** | Display price string (e.g. `₹999–₹1,499`) | No |
| **Featured toggle** | If enabled, the product appears in the Featured Products section on the homepage | No |

Click **Add Product**. A success toast appears and the product is immediately visible in the grid on the right.

### Slug Rules

The slug is used in the product URL: `/products/<slug>`

- Lowercase letters, numbers, and hyphens only
- No spaces or special characters
- Must be unique — two products cannot share the same slug

✅ Good: `wireless-charger-pro`  
❌ Bad: `Wireless Charger`, `wireless_charger`, `wireless charger`

The slug is auto-generated from the product name as you type. Switch to **Manual** mode if you need to set a custom slug.

### Viewing a Product

Each product card in the grid has a **View Page** button that opens the live `/products/<slug>` page in a new tab.

### Deleting a Product

Each product card has a **Delete** button. This permanently removes the product from the database.

> ⚠️ Deletion is permanent and cannot be undone.

---

## Tab 2 — Categories

Categories control two things simultaneously:
- The **filter pills** on the `/products` page
- The **Categories grid** on the homepage

### Adding a Category

| Field | Description | Required |
|---|---|---|
| **Image URL** | Used as the category card image on the homepage. Live preview shown. | No |
| **Category Name** | Display name (e.g. "Executive Kits") | ✅ Yes |
| **Slug** | URL-safe identifier used in `/categories/<slug>` and the products filter. Auto-generated from the name. | ✅ Yes |
| **Description** | Shown on the homepage category card | No |

Click **Add Category**. It immediately appears on the `/products` filter bar and the homepage Categories section.

### Viewing a Category

Each category card has a **View Page** button that opens `/categories/<slug>` in a new tab.

### Deleting a Category

Click **Delete** on the category card. This removes the category from the filter bar and the homepage.

> ⚠️ Deleting a category does **not** reassign products. Any product linked to that category will show no category label until manually reassigned via the Products tab.

---

## Tab 3 — Featured

This tab lets you control exactly which products appear in the **Featured Products** section on the homepage.

Every product in the database is shown as a card here. Featured products are highlighted with a gold border.

| Action | Effect |
|---|---|
| **Add to Featured** | Sets `featured = true` — product appears on the homepage on next visit |
| **Remove from Featured** | Sets `featured = false` — product is removed from the homepage section |

Changes take effect immediately in the database and are visible on the homepage on the next page load. There is no upper limit on how many products can be featured.

> If no products are featured, the Featured Products section on the homepage is hidden automatically.

---

## Uploading Images

The admin forms accept any public image URL. Recommended workflow:

1. Go to your **Supabase project → Storage**
2. Upload the image to the `products` (or `categories`) bucket — create it if it doesn't exist
3. Set the bucket to **Public**
4. Copy the public URL and paste it into the **Image URL** field

Recommended image specs:

| Use | Format | Aspect Ratio | Max Size |
|---|---|---|---|
| Product images | JPG or PNG | 1:1 (square) | 500 KB |
| Category images | JPG or PNG | 16:9 or 4:3 | 500 KB |

---

## Tips

- Always add a **description** — it appears on both the product card and the detail page
- Use a **price range string** like `₹500–₹1,200` rather than a number, since pricing is display-only
- If a product isn't showing up on `/products`, double-check the slug for spaces or uppercase letters
- The **Featured** tab is the fastest way to refresh what appears on the homepage — no re-publishing needed
- Category and product changes are **live immediately** — no deployment required
