# 🔥 Firebase Setup Guide - BAF Trust

## 📋 Quick Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name: `baf-trust-website`
4. Enable Google Analytics (optional)

### 2. Enable Authentication
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Save settings

### 3. Enable Firestore Database
1. Go to **Firestore Database**
2. Create database in **test mode** (for development)
3. Choose your preferred location

### 4. Configure Environment Variables
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Get these values from:**
Firebase Console → Project Settings → General → Your apps → Web app

### 5. Set Up Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data and admins can read all users
    match /users/{userId} {
      allow read: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin']);
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    // Public read access to published content
    match /testimonials/{document} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    match /gallery/{document} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    match /content/{document} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    // Allow public inquiry creation, admin management
    match /inquiries/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    // Settings - admin only
    match /settings/{document} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
  }
}
```

### 6. Create First Admin User

#### Method 1: Firebase Console (Recommended)
1. **Authentication** → **Users** → **Add user**
2. Email: `admin@baftrust.com`
3. Password: Choose a secure password
4. Copy the generated **User UID**

#### Method 2: Registration through app
1. Start your app: `npm run dev`
2. Go to `http://localhost:3000/admin`
3. Try to login (will fail initially)
4. This creates a user document with default 'user' role

### 7. Set Admin Role in Firestore
1. Go to **Firestore Database**
2. Find the `users` collection
3. Find the document with your User UID
4. Edit the document and set:
```json
{
  "email": "admin@baftrust.com",
  "role": "super_admin",
  "permissions": [
    "view_dashboard",
    "manage_users",
    "manage_content",
    "manage_inquiries",
    "manage_testimonials",
    "manage_gallery",
    "view_analytics",
    "manage_settings"
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastLoginAt": "2024-01-01T00:00:00.000Z"
}
```

### 8. Test Your Setup
1. Run: `npm run dev`
2. Go to: `http://localhost:3000/admin`
3. Login with your admin credentials
4. Verify dashboard loads correctly

## 🚨 Common Issues & Solutions

### "Missing or insufficient permissions"
**Solution:** Check your Firestore security rules match the ones above

### "You do not have admin privileges"
**Solution:** 
1. Ensure user document exists in `users` collection
2. Verify `role` field is set to `admin` or `super_admin`

### "Firebase configuration is incomplete"
**Solution:** Check all environment variables in `.env.local` are set correctly

## 🔒 User Roles

- **user**: Default role, no admin access
- **admin**: Can manage content, inquiries, testimonials, gallery
- **super_admin**: Full access to all features

## 🛠️ Development Tips

1. **Different environments**: Use separate Firebase projects for dev/prod
2. **Security**: `.env.local` is already in `.gitignore`
3. **Testing**: Create test users with different roles
4. **Monitoring**: Check Firebase Console for auth/firestore usage

## 📞 Need Help?

1. Check browser console for JavaScript errors
2. Check Firebase Console for authentication/firestore errors
3. Verify user document exists with correct role
4. Ensure security rules allow your operations

---

**🔐 Security Note:** Keep your Firebase credentials secure and never commit them to version control. 