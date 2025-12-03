# 🚀 Quick Vercel Deployment Steps

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub
```bash
# When your network connection is available, run:
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (or create account)
2. Click **"Add New Project"** or **"Import Project"**
3. Connect your GitHub account if not already connected
4. Select repository: **`Amrellawah/CSC`**
5. Click **"Import"**

### Step 3: Configure Environment Variables
**⚠️ CRITICAL:** Add these in Vercel before deploying:

1. Go to **Settings** → **Environment Variables**
2. Add each variable:

#### Required Variables:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<your_password_hash>
JWT_SECRET=<random_32_char_string>
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

#### Optional (for email):
```
RESEND_API_KEY=re_your_key_here
```

### Step 4: Generate Values

**Generate Password Hash:**
```bash
node scripts/generate-password.js your_secure_password
```

**Generate JWT Secret:**
```bash
node scripts/generate-secret.js
```

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-5 minutes
3. Your site will be live! 🎉

---

## Option 2: Deploy via Vercel CLI (Alternative)

If you can't push to GitHub right now:

### Install Vercel CLI:
```bash
npm i -g vercel
```

### Deploy:
```bash
cd "C:\Users\amrel\CSC\company website"
vercel
```

Follow the prompts and add environment variables when asked.

---

## 📝 Environment Variables Checklist

- [ ] `ADMIN_USERNAME` - Your admin username (default: `admin`)
- [ ] `ADMIN_PASSWORD_HASH` - Generated password hash
- [ ] `JWT_SECRET` - Random secret (min 32 characters)
- [ ] `NEXT_PUBLIC_SITE_URL` - Your Vercel URL (update after first deploy)
- [ ] `RESEND_API_KEY` - Optional, for contact form emails

---

## ✅ After Deployment

1. **Update `NEXT_PUBLIC_SITE_URL`** with your actual Vercel URL
2. **Test admin login** at `/admin/login`
3. **Test contact form** at `/contact`
4. **Verify all pages** load correctly

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Your Repository: https://github.com/Amrellawah/CSC
- Vercel Docs: https://vercel.com/docs

