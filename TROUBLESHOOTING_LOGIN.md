# Troubleshooting Login Issues

## Common Issues and Solutions

### Issue: "Invalid credentials" error

**Possible causes:**

1. **Environment variables not loaded**
   - ✅ **Solution:** Restart your development server
   - Stop: `Ctrl + C`
   - Start: `npm run dev`

2. **Password hash not properly set**
   - Check your `.env.local` file
   - Make sure you replaced `your_generated_hash` with the actual hash
   - The hash should look like: `$2b$10$FW6Q0BJN9Ygu8DcaLws9.ukbOD8SA.QsEkNifMFhZV2KgJCGGXq4a`

3. **Using wrong password**
   - If you generated a hash for password "admin", use "admin" to login
   - If you generated a hash for a different password, use that password

4. **Hash format issue**
   - The hash should start with `$2a$` or `$2b$`
   - No extra spaces or quotes around the hash

---

## Quick Fix Steps

### Step 1: Verify .env.local file

Open `.env.local` and check it looks like this:

```env
ADMIN_USERNAME=admin

ADMIN_PASSWORD_HASH=$2b$10$FW6Q0BJN9Ygu8DcaLws9.ukbOD8SA.QsEkNifMFhZV2KgJCGGXq4a

JWT_SECRET=766232fdc7a87ad32b7e0abac5269d9b41454a29ef45449559ce26201169d759
```

**Important:**
- No quotes around values
- No spaces before/after the `=` sign
- Each variable on its own line
- No trailing spaces

### Step 2: Generate a fresh password hash

Run this command to generate a new hash for your password:

```bash
node scripts/generate-password.js admin
```

Copy the output hash and update `.env.local`

### Step 3: Restart the server

**Important:** You MUST restart the dev server after changing `.env.local`

1. Stop server: `Ctrl + C` in terminal
2. Start server: `npm run dev`

### Step 4: Try logging in

- Username: `admin`
- Password: `admin` (or whatever password you hashed)

---

## Test with Default Password (Temporary)

If you want to test quickly, you can temporarily remove the password hash:

**In `.env.local`, comment out or remove the hash:**
```env
ADMIN_USERNAME=admin
# ADMIN_PASSWORD_HASH=$2b$10$...
JWT_SECRET=766232fdc7a87ad32b7e0abac5269d9b41454a29ef45449559ce26201169d759
```

Then restart server and login with:
- Username: `admin`
- Password: `admin`

**⚠️ Remember to add the hash back for security!**

---

## Debug Steps

1. Check server console for error messages
2. Check browser console (F12) for network errors
3. Verify `.env.local` is in the root directory (same level as `package.json`)
4. Make sure you're using the correct password that matches the hash

---

## Still Not Working?

1. Double-check the hash was generated correctly
2. Make sure server was restarted
3. Clear browser cookies and try again
4. Check server terminal for error messages




