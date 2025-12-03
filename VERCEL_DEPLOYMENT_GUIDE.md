# 🚀 Vercel Deployment Guide

Complete guide to deploy your Creative Sparking Contracting website to Vercel.

---

## 📋 Prerequisites

1. **GitHub/GitLab/Bitbucket account** (for connecting to Vercel)
2. **Vercel account** (sign up at [vercel.com](https://vercel.com) - free tier available)
3. **Your project pushed to a Git repository**

---

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Project

1. **Make sure your project builds successfully:**
   ```bash
   npm run build
   ```
   
   If there are any build errors, fix them before deploying.

2. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   ```

3. **Push to your Git repository:**
   ```bash
   git push origin main
   ```
   (Replace `main` with your branch name if different)

---

### Step 2: Connect to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in (or create an account)

2. **Click "Add New Project"** or "Import Project"

3. **Import your Git repository:**
   - Connect your GitHub/GitLab/Bitbucket account if not already connected
   - Select your repository: `company website` or `csc-furniture-website`
   - Click "Import"

---

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js, but verify these settings:

- **Framework Preset:** Next.js (should be auto-detected)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

---

### Step 4: Add Environment Variables

**⚠️ IMPORTANT:** Add these environment variables in Vercel before deploying:

1. **In Vercel project settings, go to "Environment Variables"**

2. **Add the following variables:**

#### Required Environment Variables:

```env
# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_password_hash_here
JWT_SECRET=your_random_secret_key_min_32_characters

# Site URL (replace with your actual domain)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### Optional Environment Variables (for email):

```env
# Email Service (Resend) - Optional
RESEND_API_KEY=re_your_resend_api_key_here
```

**How to add environment variables in Vercel:**
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Click "Add New"
4. Enter variable name and value
5. Select environments (Production, Preview, Development)
6. Click "Save"

---

### Step 5: Generate Password Hash (if needed)

If you haven't generated a password hash yet:

```bash
node scripts/generate-password.js your_secure_password
```

Copy the output hash and use it as `ADMIN_PASSWORD_HASH` in Vercel.

**Generate JWT Secret:**
You can use any random string (minimum 32 characters). You can generate one using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 6: Deploy

1. **Click "Deploy"** in Vercel
2. **Wait for build to complete** (usually 2-5 minutes)
3. **Your site will be live!** 🎉

Vercel will provide you with a URL like: `https://your-project.vercel.app`

---

## 🔧 Post-Deployment Configuration

### 1. Update Site URL

After deployment, update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables with your actual domain:

```env
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

### 2. Custom Domain (Optional)

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Update robots.txt

Update `public/robots.txt` with your actual domain:

```
Sitemap: https://your-domain.com/sitemap.xml
```

---

## 📧 Email Service Setup (Optional but Recommended)

To enable contact form email sending:

### Option 1: Resend (Recommended)

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Add to Vercel environment variables:**
   ```
   RESEND_API_KEY=re_your_key_here
   ```
4. **Uncomment email code** in `app/api/contact/route.ts`:
   - Remove the `/* */` comments around the Resend code
   - Update email addresses (`from` and `to`)

### Option 2: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Install: `npm install @sendgrid/mail`
4. Update contact route to use SendGrid

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Website loads correctly
- [ ] All pages work (Home, About, Services, Portfolio, Contact)
- [ ] Contact form submits (check Vercel function logs)
- [ ] Admin login works (`/admin/login`)
- [ ] Images load correctly
- [ ] Sitemap accessible: `https://your-domain.com/sitemap.xml`
- [ ] robots.txt accessible: `https://your-domain.com/robots.txt`
- [ ] Dark mode toggle works
- [ ] Mobile responsive design works

---

## 🐛 Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Common issues:**
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies

### Contact Form Not Working

1. **Check Vercel function logs:**
   - Go to your project → "Functions" tab
   - Check `/api/contact` logs
2. **Verify environment variables** are set
3. **Check rate limiting** (max 5 submissions per 15 minutes)

### Admin Login Not Working

1. **Verify environment variables:**
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
   - `JWT_SECRET`
2. **Check Vercel function logs** for `/api/auth/login`
3. **Regenerate password hash** if needed

### Images Not Loading

1. **Check image paths** are correct
2. **Verify images are in `public/` folder**
3. **Check file names** match exactly (case-sensitive)

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to Git (already in `.gitignore`)
2. **Use strong passwords** for admin account
3. **Rotate JWT_SECRET** periodically
4. **Enable Vercel password protection** for preview deployments (optional)
5. **Set up rate limiting** (already implemented for contact form)

---

## 📊 Monitoring

### Vercel Analytics (Optional)

1. Go to project settings
2. Enable "Analytics"
3. View traffic and performance metrics

### Function Logs

- View API route logs in Vercel dashboard
- Monitor contact form submissions
- Check for errors

---

## 🔄 Updating Your Site

After making changes:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Vercel automatically deploys** on push to main branch
3. **Preview deployments** are created for other branches

---

## 📝 Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD_HASH` | Yes | Hashed admin password |
| `JWT_SECRET` | Yes | Secret for JWT tokens (min 32 chars) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site URL (for sitemap, OG tags) |
| `RESEND_API_KEY` | No | For email sending (optional) |

---

## 🎉 You're Done!

Your website should now be live on Vercel. Share your URL and start receiving inquiries!

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Check Vercel dashboard for detailed logs

---

**Deployment Date:** [Fill in after deployment]  
**Live URL:** [Your Vercel URL]  
**Custom Domain:** [If applicable]



