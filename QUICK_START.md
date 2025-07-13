# 🚀 Quick Start - BAF Trust Firebase Setup

## ⚡ Fast Setup (5 minutes)

### 1. Create `.env.local` file
Copy and paste this into a new file called `.env.local` in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 2. Get Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create/Select your project
3. **Project Settings** → **General** → **Your apps**
4. Click Web icon (`</>`) → Register app
5. Copy the config values and replace them in `.env.local`

### 3. Enable Services
In Firebase Console:
- **Authentication** → **Sign-in method** → Enable **Email/Password**
- **Firestore Database** → **Create database** → **Test mode**

### 4. Create Admin User
1. **Authentication** → **Users** → **Add user**
2. Email: `admin@baftrust.com`, Password: `your-password`
3. Copy the **User UID**

### 5. Set Admin Role
1. **Firestore Database** → Create collection: `users`
2. Document ID: Use the User UID from step 4
3. Add fields:
```json
{
  "email": "admin@baftrust.com",
  "role": "super_admin",
  "permissions": ["view_dashboard", "manage_users", "manage_content", "manage_inquiries", "manage_testimonials", "manage_gallery", "view_analytics", "manage_settings"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastLoginAt": "2024-01-01T00:00:00.000Z"
}
```

### 6. Test
```bash
npm run dev
```
Go to `http://localhost:3000/admin` and login!

## 🔧 Set Security Rules
In **Firestore Database** → **Rules**, paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin']);
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
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
    
    match /inquiries/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    match /settings/{document} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
  }
}
```

## 🚨 Need Help?
- Check `FIREBASE_SETUP.md` for detailed instructions
- Verify `.env.local` values are correct
- Ensure user document has `role: "admin"` or `role: "super_admin"`

That's it! 🎉 