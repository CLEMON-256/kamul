# Custom Domain Setup Guide

Getting a custom domain name (like `www.juniorsrestaurant.com`) for your web application involves two main parts: **Buying the domain** and **Connecting it to your hosting provider**.

---

## Step 1: Purchase a Domain Name

You need to buy a domain from a **Domain Registrar**. Popular options include:

- **Namecheap**: Highly recommended for ease of use and fair pricing.
- **GoDaddy**: Very popular but watch out for upsells.
- **Google Domains**: Simple and integrates well if you use Google Workspace.
- **Cloudflare**: Excellent if you want built-in security and performance features.

### How to buy:
1. Visit a registrar (e.g., [namecheap.com](https://namecheap.com)).
2. Search for your desired name (e.g., "juniorsrestaurant").
3. Choose an extension (e.g., `.com`, `.net`, `.shop`). `.com` is best for restaurants.
4. Complete the checkout process.

---

## Free & Low-Cost Options

If you are not ready to pay for a domain yet, here are some alternatives:

### 1. Free Subdomains (Recommended)
Most hosting providers give you a free subdomain. Since you are using Render, you already have a free address like:
`juniors-restaurant.onrender.com`
- **Pros**: 100% free forever, easy to set up, SSL included.
- **Cons**: Long and looks less professional.

### 2. GitHub Student Developer Pack
If you have a student email (`.edu`), you can get the **GitHub Student Pack**. It includes:
- **1 free `.me` domain** for 1 year from Namecheap.
- **1 free `.tech` domain** for 1 year.
- **Pros**: Real TLD (.me, .tech) for free.
- **Cons**: Only free for the 1st year; requires student verification.

### 3. "Truly Free" TLDs (Not Recommended)
Services like **Dot.tk** used to offer free `.tk`, `.ml`, and `.cf` domains.
- **Warning**: These are currently **extremely unreliable** and often get taken away without notice or used for spam. For a restaurant business, I suggest avoiding these as they can hurt your brand's reputation.

---

## Step 2: Add the Domain to Render

Assuming you are using [Render](https://render.com) for deployment (based on your current setup):

1. Log in to your **Render Dashboard**.
2. Select your **Web Service** (the frontend or backend app you want to link).
3. In the left menu, click on **Settings**.
4. Scroll down to the **Custom Domains** section.
5. Click **Add Custom Domain**.
6. Enter your domain (e.g., `juniorsrestaurant.com`) and click **Save**.

---

## Step 3: Update DNS Settings

After adding the domain to Render, you need to tell your **Registrar** to point the domain to Render's servers.

Render will provide you with specific **DNS Records** that look like this:

| Type | Name | Value |
| :--- | :--- | :--- |
| **CNAME** | `www` | `your-app-name.onrender.com` |
| **A** | `@` (or leave blank) | `216.24.57.1` (Render's Load Balancer IP) |

### How to update (Example: Namecheap):
1. Log in to your registrar account.
2. Find your domain and click **Manage**.
3. Go to **Advanced DNS** or **DNS Settings**.
4. Click **Add New Record**.
5. Add the **CNAME** record and the **A** record provided by Render.
6. **Save Changes**.

> [!NOTE]
> DNS changes can take anywhere from **5 minutes to 24 hours** to spread across the internet (this is called propagation).

---

## Step 4: Verify and Secure (SSL)

Once the DNS settings are active:

1. Render will automatically detect the connection.
2. Render provides **Free SSL certificates** (HTTPS). It will automatically generate one for your new domain.
3. Once the status in the Render dashboard turns green/active, your site will be live at your new custom domain!

---

## Summary Checklist
- [ ] Buy domain name from a registrar.
- [ ] Add domain to Render settings.
- [ ] Copy the DNS records from Render.
- [ ] Paste those records into your registrar's DNS settings.
- [ ] Wait for propagation and check the SSL status.
