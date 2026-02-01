# Google Visibility & SEO Guide

Making your website "known" to Google involves two main things: **Indexing** (telling Google your site exists) and **SEO** (making sure you show up when people search for "Restaurant in Kampala").

---

## 1. Google Search Console (Indexing)
This is the most important step to get your site on Google quickly.

1. Go to [Google Search Console](https://search.google.com/search-console/).
2. Add your website URL (e.g., `https://juniors-restaurant.onrender.com` or your new custom domain).
3. **Verify Ownership**: Google will give you a "Meta Tag" or "HTML file".
   - If using a Meta Tag: Add it to the `<head>` of your `index.html` in the Frontend.
4. **Submit a Sitemap**: Once verified, submit your sitemap URL (usually `yourdomain.com/sitemap.xml`) to help Google find all your pages.

---

## 2. Google Business Profile (Local SEO)
**Crucial for Restaurants!** This makes you show up on Google Maps and the sidebar when people search for your name.

1. Go to [Google Business Profile](https://www.google.com/business/).
2. Create a profile for "Junior's Restaurant".
3. Add your **Location**, **Phone Number (0701126433)**, and **Opening Hours**.
4. Add high-quality photos of your food and interior.
5. Add a link to your website.

---

## 3. Basic On-Page SEO
Google reads your code to understand what your site is about. Make sure your `index.html` (and React components) have:

### Title and Meta Tags
In your `Frontend/public/index.html` or using `react-helmet`:
```html
<title>Junior's Restaurant & Lounge | Best Food in Kampala</title>
<meta name="description" content="Delicious breakfast, lunch, pastries and fast foods at Junior's Restaurant. Located in Kasangati, Kampala. Order now: 0701126433.">
<meta name="keywords" content="Restaurant Kampala, Junior's Restaurant, Food Delivery Kampala, Breakfast Kasangati">
```

### Semantic HTML
- Use `<h1>` for your main heading (e.g., "Welcome to Junior's Restaurant").
- Use `<h2>` for section titles (e.g., "Our Lunch Menu").
- Use `alt` tags on all images (e.g., `<img src="..." alt="Delicious Pizza Verde">`).

---

## 4. Social Media & Backlinks
Google trusts websites that are mentioned elsewhere.
- Link to your website from your **TikTok**, **WhatsApp**, and **Instagram** profiles.
- Ask customers to leave reviews on your Google Business Profile.

---

## 5. Check Your "Robots.txt"
Ensure your site doesn't have a file blocking Google. Create a file in `Frontend/public/robots.txt`:
```txt
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Summary Checklist
- [ ] Sign up for Google Search Console.
- [ ] Add the verification meta tag to your code.
- [ ] Create a Google Business Profile (for Maps).
- [ ] Update `<title>` and `<meta description>` in your app.
- [ ] Link your website on social media (TikTok/WhatsApp).
