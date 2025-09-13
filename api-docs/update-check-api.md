# Update Check API

## Overview
Check for app updates and get download information for the MS Bridge Flutter application.

## Endpoints
```
GET /api/update-check?version=X.X.X&buildNumber=XX&apiKey=xxx
POST /api/update-check
```

## Authentication
✅ **API Key Required** - Send via `x-api-key` header (POST) or `apiKey` query param (GET)

## Request

### GET Method
```
GET /api/update-check?version=7.8.0&buildNumber=15&apiKey=your-api-key
```

### POST Method
```json
POST /api/update-check
Content-Type: application/json
x-api-key: your-api-key-here

{
  "version": "7.8.0",
  "buildNumber": 15
}
```

### Parameters
- `version` (optional): Current app version (e.g., "7.8.0")
- `buildNumber` (optional): Current build number (e.g., 15)

## Response

### Success (200)
```json
{
  "status": "live",
  "latestVersion": {
    "version": "7.9.0",
    "buildNumber": 16,
    "downloadUrl": "https://your-domain.com/downloads/ms-bridge-7.9.0.apk",
    "changelog": "Defines your note-taking flow with a refreshed UI...",
    "releaseDate": "2025-09-12"
  },
  "updateAvailable": true,
  "currentVersion": {
    "version": "7.8.0",
    "buildNumber": 15
  },
  "message": "New version 7.9.0 is available!"
}
```

### Error (401)
```json
{
  "error": "Invalid or missing API key"
}
```

### Error (500)
```json
{
  "error": "No versions available"
}
```

## Response Scenarios

### 1. Update Available
```json
{
  "updateAvailable": true,
  "message": "New version 7.9.0 is available!"
}
```

### 2. Already Latest Version
```json
{
  "updateAvailable": false,
  "message": "You are running the latest version."
}
```

### 3. Invalid Version
```json
{
  "updateAvailable": true,
  "message": "Invalid version detected. Please download the latest version."
}
```

### 4. Newer Version
```json
{
  "updateAvailable": false,
  "message": "Your app is already updated to the latest version."
}
```

## Usage Examples

### cURL (GET)
```bash
curl -X GET "https://your-domain.com/api/update-check?version=7.8.0&buildNumber=15&apiKey=your-api-key"
```

### cURL (POST)
```bash
curl -X POST "https://your-domain.com/api/update-check" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{"version":"7.8.0","buildNumber":15}'
```

### Flutter/Dart
```dart
final response = await http.post(
  Uri.parse('https://your-domain.com/api/update-check'),
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your-api-key-here',
  },
  body: json.encode({
    'version': '7.8.0',
    'buildNumber': 15,
  }),
);

if (response.statusCode == 200) {
  final data = json.decode(response.body);
  if (data['updateAvailable']) {
    // Show update dialog
    final downloadUrl = data['latestVersion']['downloadUrl'];
    // Download and install update
  }
}
```

## Version Validation Logic

1. **Invalid Version**: Version doesn't exist in versions list → Force update
2. **Older Version**: Build number < latest → Show update available
3. **Same Version**: Build number = latest → No update needed
4. **Newer Version**: Build number > latest → Already updated

## Use Cases
- Automatic update checking on app startup
- Manual update checking from settings
- Version validation and integrity checking
