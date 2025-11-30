# Quick Fix for Login Issue

## The Problem

You're getting "Invalid credentials" because either:
1. The `.env.local` file has placeholder text instead of actual values
2. The server wasn't restarted after creating `.env.local`

---

## Solution - Follow These Steps:

### Step 1: Update Your .env.local File

Open your `.env.local` file and **replace everything** with this:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$cdaiEAjxUxUh1dY5.5BM4.ssChoAWekTko.d92RyXxh82ZgQci2Zi
JWT_SECRET=766232fdc7a87ad32b7e0abac5269d9b41454a29ef45449559ce26201169d759
```

**Important:**
- Copy the hash EXACTLY as shown above
- Make sure there are NO quotes around the values
- Make sure there are NO spaces around the `=` sign
- Each line should be separate

### Step 2: Restart Your Server

**This is CRITICAL!** Environment variables only load when the server starts.

1. Go to your terminal where `npm run dev` is running
2. Press `Ctrl + C` to stop the server
3. Run `npm run dev` again to start it

### Step 3: Try Logging In

1. Go to: `http://localhost:3000/admin/login`
2. Enter:
   - **Username:** `admin`
   - **Password:** `admin`
3. Click Login

---

## If It Still Doesn't Work:

### Option A: Use Default Password (No Hash)

Temporarily remove the password hash line:

```env
ADMIN_USERNAME=admin
# ADMIN_PASSWORD_HASH=$2b$10$...
JWT_SECRET=766232fdc7a87ad32b7e0abac5269d9b41454a29ef45449559ce26201169d759
```

Then restart server and login with username `admin` and password `admin`.

### Option B: Generate Your Own Password

If you want a different password:

1. Run: `node scripts/generate-password.js YourPassword123`
2. Copy the hash it generates
3. Put it in `.env.local` as `ADMIN_PASSWORD_HASH=...`
4. Restart server
5. Login with username `admin` and password `YourPassword123`

---

## Verify .env.local Location

Make sure your `.env.local` file is in the **root directory** of your project:

```
company website/
├── .env.local          ← Should be here!
├── package.json
├── app/
├── public/
└── ...
```

---

## Check Server Console

After restarting, check your terminal for any error messages. You should see the Next.js dev server starting without errors.

---

**Most Common Fix:** Just restart the server after adding `.env.local`!



