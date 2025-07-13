# 🛡️ Firestore Security Rules Guide - BAF Trust

## 🚀 Quick Deploy Rules

### Step 1: Copy Rules
1. Open Firebase Console → Your Project → **Firestore Database** → **Rules** tab
2. Copy the rules from `firestore-rules-simple.txt` and paste them
3. Click **Publish**

### Step 2: Test Rules
1. Go to **Rules playground** tab
2. Test different scenarios (see testing section below)

---

## 📋 Rules Overview

### **Simple Rules** (`firestore-rules-simple.txt`)
- ✅ **Recommended for getting started**
- ✅ **Covers all core collections**
- ✅ **Easy to understand and modify**

### **Comprehensive Rules** (`firestore.rules`)
- 🔧 **Advanced features**
- 🔧 **Additional collections (analytics, logs, notifications)**
- 🔧 **More granular permissions**

---

## 🔐 Security Model

### **Role-Based Access Control**
- **`user`**: Default role, limited access
- **`admin`**: Can manage content and inquiries
- **`super_admin`**: Full access to all features

### **Collection Permissions**

| Collection | Public Read | Public Write | Admin Read | Admin Write |
|------------|-------------|--------------|------------|-------------|
| `users` | ❌ | ❌ | ✅ | ✅ |
| `inquiries` | ❌ | ✅ Create only | ✅ | ✅ |
| `testimonials` | ✅ Published only | ❌ | ✅ | ✅ |
| `gallery` | ✅ Published only | ❌ | ✅ | ✅ |
| `content` | ✅ Published only | ❌ | ✅ | ✅ |
| `settings` | ❌ | ❌ | ✅ | ✅ |

---

## 🧪 Testing Your Rules

### **In Firebase Console Rules Playground:**

#### Test 1: Public User Reading Published Content
```
Auth: Not signed in
Operation: get
Path: /testimonials/test-doc
Resource data: {"isPublished": true, "name": "Test"}
```
**Expected**: ✅ **Allow**

#### Test 2: Public User Reading Unpublished Content
```
Auth: Not signed in
Operation: get
Path: /testimonials/test-doc
Resource data: {"isPublished": false, "name": "Test"}
```
**Expected**: ❌ **Deny**

#### Test 3: Admin User Reading All Content
```
Auth: Signed in as admin user
Operation: get
Path: /testimonials/test-doc
Resource data: {"isPublished": false, "name": "Test"}
```
**Expected**: ✅ **Allow**

#### Test 4: Public User Creating Inquiry
```
Auth: Not signed in
Operation: create
Path: /inquiries/new-inquiry
Request data: {"name": "John", "email": "john@example.com", "phone": "123", "program": "goat", "message": "Hello", "status": "pending"}
```
**Expected**: ✅ **Allow**

#### Test 5: Non-Admin User Accessing Admin Data
```
Auth: Signed in as regular user
Operation: get
Path: /users/another-user-id
```
**Expected**: ❌ **Deny**

---

## 🔧 How to Apply Rules

### **Method 1: Firebase Console (Recommended)**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database** → **Rules**
4. Copy and paste the rules
5. Click **Publish**

### **Method 2: Firebase CLI**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

---

## ⚠️ Important Notes

### **Before Applying Rules:**
1. **Backup your current rules** (if any)
2. **Test in development environment first**
3. **Ensure you have at least one admin user** created

### **After Applying Rules:**
1. **Test admin login** at `/admin`
2. **Test contact form** submission
3. **Verify public pages** still load correctly

### **Common Issues:**
- **"Permission denied"**: Check user has correct role in `users` collection
- **"User not found"**: Ensure user document exists with proper structure
- **"Function not found"**: Check helper functions are defined correctly

---

## 📝 Rule Structure Explained

### **Helper Functions**
```javascript
// Check if user is authenticated
function isAuthenticated() {
  return request.auth != null;
}

// Check if user has admin role
function isAdmin() {
  return isAuthenticated() && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super_admin'];
}

// Check if user owns the document
function isOwner(userId) {
  return isAuthenticated() && request.auth.uid == userId;
}
```

### **Collection Rules Pattern**
```javascript
match /collection/{document} {
  allow read: if [condition];
  allow write: if [condition];
  allow create: if [condition];
  allow update: if [condition];
  allow delete: if [condition];
}
```

---

## 🚨 Emergency Rules (Development Only)

If you need to temporarily allow all access for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ WARNING**: Never use these rules in production!

---

## 📞 Support

If you encounter issues:
1. Check the **Rules playground** in Firebase Console
2. Verify your user document has the correct `role` field
3. Check browser console for error messages
4. Test individual rule conditions

**Remember**: Security rules are not filters - they're validators. They allow or deny entire operations. 