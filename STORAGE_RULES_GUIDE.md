# Firebase Storage Security Rules Guide

## Overview
This guide explains how to set up and deploy Firebase Storage security rules for the BAF Trust application.

## Storage Rules Structure

### Directory Structure
```
/qr-codes/          - QR code images (Admin upload, Public read)
/gallery/           - Gallery images (Admin upload, Public read)
/profiles/{userId}/ - User profile images (User/Admin upload, Public read)
/training-programs/ - Training program images (Admin upload, Public read)
/documents/         - Documents (Admin only access)
/temp/{userId}/     - Temporary uploads (User specific)
/backups/           - Backup files (Super admin only)
```

### Permission Levels
- **Public Read**: Anyone can view/download files
- **Admin Upload**: Only admins can upload/modify files
- **User Upload**: Users can upload to their own directories
- **Super Admin**: Full access to all directories

### File Restrictions
- **Size Limit**: 10MB per file
- **Image Types**: Only image files allowed for image directories
- **Authentication**: Users must be authenticated for uploads

## Deployment Instructions

### 1. Deploy Storage Rules Only
```bash
firebase deploy --only storage
```

### 2. Deploy Both Firestore and Storage Rules
```bash
firebase deploy --only firestore,storage
```

### 3. Deploy All Rules and Indexes
```bash
firebase deploy
```

## Security Features

### Admin Validation
- Rules check user role in Firestore `/users/{uid}` collection
- Supports both `admin` and `super_admin` roles

### File Validation
- Validates file size (10MB limit)
- Validates image file types for image directories
- Prevents unauthorized access to sensitive directories

### User-Specific Access
- Profile images: Users can manage their own files
- Temp uploads: Isolated per user
- Documents: Admin-only access

## Testing Storage Rules

### Test Admin Upload
```javascript
// This should work for admin users
const storageRef = ref(storage, 'qr-codes/test-qr.png');
await uploadBytes(storageRef, file);
```

### Test Public Read
```javascript
// This should work for everyone
const downloadURL = await getDownloadURL(ref(storage, 'qr-codes/test-qr.png'));
```

### Test User Profile Upload
```javascript
// This should work for the file owner
const storageRef = ref(storage, `profiles/${userId}/avatar.jpg`);
await uploadBytes(storageRef, file);
```

## Troubleshooting

### Permission Denied (403)
1. Check if user is authenticated
2. Verify user has correct role in Firestore
3. Ensure file is being uploaded to correct directory
4. Check file size and type restrictions

### Rules Not Applied
1. Ensure rules are deployed: `firebase deploy --only storage`
2. Check Firebase console for rule deployment status
3. Verify firebase.json configuration is correct

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `storage/unauthorized` | User lacks permission | Check user role and target directory |
| `storage/quota-exceeded` | File too large | Reduce file size or increase limit |
| `storage/invalid-format` | Wrong file type | Use supported image formats |
| `storage/unauthenticated` | User not logged in | Ensure user is authenticated |

## Related Files
- `storage.rules` - Storage security rules
- `firestore.rules` - Firestore security rules
- `firebase.json` - Firebase configuration
- `firestore.indexes.json` - Firestore indexes

## Support
For issues with storage rules, check the Firebase console logs and ensure all rules are properly deployed. 