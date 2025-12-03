# Admin Portfolio Management System - Setup Guide

## 🚀 Quick Start

Follow these steps to set up the admin panel for managing your portfolio:

### **Step 1: Generate Password Hash**

1. Generate a password hash for your admin password:
   ```bash
   node scripts/generate-password.js your_secure_password
   ```

2. This will output a hash like: `$2a$10$...`
   Copy this hash value.

### **Step 2: Create Environment Variables**

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add the following variables:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$your_generated_hash_here
JWT_SECRET=your_random_secret_key_min_32_characters_long
```

**Important Notes:**
- Replace `your_generated_hash_here` with the hash from Step 1
- Replace `your_random_secret_key_min_32_characters_long` with a random secret (use a password generator or random string)
- Keep `.env.local` secure and never commit it to git

### **Step 3: Default Password (Initial Setup)**

For initial setup, if `ADMIN_PASSWORD_HASH` is not set, you can log in with:
- **Username:** `admin`
- **Password:** `admin`

⚠️ **IMPORTANT:** Change this immediately after first login by updating `.env.local` with a proper password hash!

### **Step 4: Start the Development Server**

```bash
npm run dev
```

### **Step 5: Access Admin Panel**

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter your credentials:
   - Username: `admin` (or whatever you set in ADMIN_USERNAME)
   - Password: Your password (or `admin` for initial setup)

---

## 📁 File Structure

```
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Dashboard
│   │   └── projects/       # Project management
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── projects/       # Project CRUD endpoints
│   │   └── upload/         # Image upload endpoint
│   └── portfolio/          # Public portfolio page
├── data/
│   └── projects.json       # Projects database (editable)
├── lib/
│   ├── auth.ts            # Authentication utilities
│   └── projects.ts        # Project management utilities
├── public/
│   └── portfolio/         # Uploaded project images
└── scripts/
    └── generate-password.js  # Password hash generator
```

---

## 🔐 Security Best Practices

1. **Change Default Password:**
   - Never use the default `admin` password in production
   - Generate a strong password hash using the script

2. **Secure JWT Secret:**
   - Use a long, random string (at least 32 characters)
   - Generate using: `openssl rand -hex 32` or an online generator

3. **Environment Variables:**
   - Never commit `.env.local` to version control
   - It's already in `.gitignore`

4. **Production Deployment:**
   - Set environment variables in your hosting platform
   - Use secure, production-ready secrets
   - Enable HTTPS for secure cookie transmission

---

## 📝 Using the Admin Panel

### **Dashboard**
- View statistics (total projects, featured, categories)
- Quick access to add/manage projects

### **Manage Projects**
- View all projects in a grid/list
- Click "Edit" to modify a project
- Click "Delete" to remove a project
- Click "Add Project" to create new

### **Add/Edit Project Form**
- **Title:** Project name
- **Category:** Select from dropdown (Villas, Palaces, Restaurants, Hotels, Commercial)
- **Description:** Project description text
- **Images:** Upload multiple images (drag & drop or click to browse)
  - First image becomes the main/thumbnail image
  - Max file size: 10MB per image
  - Supported formats: JPEG, PNG, WebP
- **Featured:** Checkbox to mark as featured (appears on home page)
- **Display Order:** Number to control sorting order

---

## 🖼️ Image Upload Guidelines

- **Max file size:** 10MB per image
- **Supported formats:** JPEG, JPG, PNG, WebP
- **Storage location:** `public/portfolio/`
- **Naming:** Files are automatically renamed with unique IDs
- **Multiple images:** Upload multiple images per project

---

## 🔄 How It Works

1. **Authentication:**
   - Login creates a JWT token stored in HTTP-only cookie
   - Token expires after 24 hours
   - All admin routes check authentication

2. **Data Storage:**
   - Projects stored in `data/projects.json`
   - Images stored in `public/portfolio/`
   - No database required!

3. **Portfolio Page:**
   - Reads projects from `/api/projects` endpoint
   - Automatically displays all projects
   - No code changes needed to update portfolio

---

## 🛠️ Troubleshooting

### **Can't log in:**
- Check `.env.local` exists and has correct values
- Verify password hash was generated correctly
- Check browser console for errors

### **Images not uploading:**
- Ensure `public/portfolio/` directory exists
- Check file size (max 10MB)
- Verify file format (JPEG, PNG, WebP only)

### **Projects not showing:**
- Check `data/projects.json` exists
- Verify JSON format is valid
- Check API routes are working (`/api/projects`)

### **Changes not saving:**
- Ensure you're logged in as admin
- Check file permissions on `data/projects.json`
- Verify API routes are accessible

---

## 🚀 Production Deployment

### **Environment Variables on Hosting:**
Set these in your hosting platform (Vercel, Netlify, etc.):

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD_HASH=your_hashed_password
JWT_SECRET=your_secret_key
```

### **File System Considerations:**
- Some hosting platforms have read-only file systems
- For production, consider migrating to a database:
  - SQLite (file-based, no server needed)
  - PostgreSQL (requires hosting)
  - MongoDB (cloud service)

### **Backup:**
- Regularly backup `data/projects.json`
- Backup `public/portfolio/` folder
- Store backups securely

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review the main plan document: `ADMIN_PORTFOLIO_SYSTEM_PLAN.md`
3. Check console for error messages

---

## ✅ Next Steps

1. ✅ Set up environment variables
2. ✅ Log in to admin panel
3. ✅ Add your first project
4. ✅ Test image upload
5. ✅ Verify portfolio page displays correctly

**Happy managing! 🎉**




