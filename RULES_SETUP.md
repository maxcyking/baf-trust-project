# 🛡️ Firestore Security Rules Setup

## 🚀 Quick Setup

### Copy These Rules to Firebase Console

1. Go to Firebase Console → Firestore Database → Rules
2. Copy and paste the rules below
3. Click **Publish**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create, update: if isAdmin();
      allow update: if isOwner(userId) && 
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['lastLoginAt', 'updatedAt']);
    }
    
    // Inquiries collection
    match /inquiries/{document} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }
    
    // Testimonials collection
    match /testimonials/{document} {
      allow read: if resource.data.isPublished == true;
      allow read, write: if isAdmin();
    }
    
    // Gallery collection
    match /gallery/{document} {
      allow read: if resource.data.isPublished == true;
      allow read, write: if isAdmin();
    }
    
    // Content collection
    match /content/{document} {
      allow read: if resource.data.isPublished == true;
      allow read, write: if isAdmin();
    }
    
    // Training Programs collection
    match /trainingPrograms/{document} {
      allow read: if resource.data.isActive == true;
      allow read, write: if isAdmin();
    }
    
    // Settings collection
    match /settings/{document} {
      allow read, write: if isAdmin();
    }
  }
}
```

## 🔐 What These Rules Do

- **Users**: Can read own data, admins can read all
- **Inquiries**: Anyone can create, only admins can manage
- **Testimonials**: Public can read published, admins can manage all
- **Gallery**: Public can read published, admins can manage all
- **Content**: Public can read published, admins can manage all
- **Training Programs**: Public can read active programs, admins can manage all
- **Settings**: Admin access only

## ✅ After Setting Rules

1. Test admin login at `/admin`
2. Test contact form submission
3. Verify public pages load correctly

## 🚨 Important

Make sure you have at least one user in the `users` collection with `role: "admin"` or `role: "super_admin"` before applying these rules! 