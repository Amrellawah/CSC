# 🔧 Fix .env.local File Format

## The Problem

The password hash is being truncated because the `$` signs in the hash might be causing parsing issues.

## ✅ Solution

You need to **wrap the hash in quotes** in your `.env.local` file.

### Update your `.env.local` file to:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH="$2b$10$IN25d.SI16whREjMN/B7Iu/cereaR9SSdXt7V4E3P7ehHV8pn/6Ku"
JWT_SECRET=766232fdc7a87ad32b7e0abac5269d9b41454a29ef45449559ce26201169d759
```

**Note:** The password hash is now in quotes!

## Steps:

1. Open `.env.local`
2. Change the ADMIN_PASSWORD_HASH line to have quotes around the hash value
3. Save the file
4. **RESTART** your server (Ctrl+C, then `npm run dev`)

## Alternative: Escape the $ signs

Or you can escape each `$` sign with a backslash:

```env
ADMIN_PASSWORD_HASH=\$2b\$10\$IN25d.SI16whREjMN/B7Iu/cereaR9SSdXt7V4E3P7ehHV8pn/6Ku
```

But **quotes are easier** and more reliable.


