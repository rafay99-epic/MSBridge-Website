# MS Bridge API Documentation

This folder contains all API documentation for the MS Bridge application.

## 📋 **Available APIs**

### 1. **Health Check API**
- **Purpose**: Check if the system is live and responsive
- **Documentation**: [health-api.md](./health-api.md)

### 2. **Update Check API**
- **Purpose**: Check for app updates and get download information
- **Documentation**: [update-check-api.md](./update-check-api.md)

### 3. **Shared Notes API**
- **Purpose**: Retrieve shared notes via secure links
- **Documentation**: [shared-notes-api.md](./shared-notes-api.md)

## 🔒 **Security**

All APIs (except shared-notes) require API key authentication via the `x-api-key` header.

### **API Key Setup**
```bash
# In your .env.local file
MS_BRIDGE_API_KEY=your-super-secret-api-key-here
```

### **Flutter Integration**
```dart
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'your-api-key-here',
}
```

## 📱 **Flutter Implementation**
Complete Flutter integration guide: [flutter-integration.md](./flutter-integration.md)

## 🚀 **Quick Start**

1. Set up your API key in `.env.local`
2. Use the health check API to verify connectivity
3. Implement update checking in your Flutter app
4. Test with the provided examples

## 📞 **Support**
For API issues or questions, refer to the individual API documentation files.
