# ✅ Vercel Deployment Checklist

Quick checklist before deploying to Vercel.

---

## Pre-Deployment

- [x] **Project builds successfully** (`npm run build` - ✅ Passed)
- [ ] **All changes committed to Git**
- [ ] **Project pushed to GitHub/GitLab/Bitbucket**

---

## Environment Variables to Add in Vercel

Before deploying, add these in Vercel Dashboard → Settings → Environment Variables:

### Required:
- [ ] `ADMIN_USERNAME` = `admin` (or your preferred username)
- [ ] `ADMIN_PASSWORD_HASH` = (generate with: `node scripts/generate-password.js your_password`)
- [ ] `JWT_SECRET` = (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://your-project.vercel.app` (update after first deployment)

### Optional (for email):
- [ ] `RESEND_API_KEY` = (if using Resend for contact form emails)

---

## Quick Commands

### Generate Password Hash:
```bash
node scripts/generate-password.js your_secure_password
```

### Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Deployment Steps

1. [ ] Go to [vercel.com](https://vercel.com) and sign in
2. [ ] Click "Add New Project" or "Import Project"
3. [ ] Connect your Git repository
4. [ ] Select your repository
5. [ ] **Add environment variables** (see above)
6. [ ] Click "Deploy"
7. [ ] Wait for build to complete
8. [ ] Test your live site!

---

## Post-Deployment

- [ ] Update `NEXT_PUBLIC_SITE_URL` with actual domain
- [ ] Test contact form
- [ ] Test admin login (`/admin/login`)
- [ ] Verify all pages load correctly
- [ ] Check sitemap: `https://your-domain.com/sitemap.xml`
- [ ] Test on mobile devices

---

## Need Help?

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**Status:** ✅ Build successful - Ready to deploy!


