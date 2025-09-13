# Shared Notes API

## Overview
Retrieve shared notes via secure, time-bound links for view-only access.

## Endpoint
```
GET /api/shared-notes/{shareId}
```

## Authentication
❌ **No API Key Required** - Uses Firebase Firestore for data access

## Request

### URL Structure
```
GET /api/shared-notes/abc123def456
```

### Parameters
- `shareId` (path parameter): Unique identifier for the shared note

## Response

### Success (200)
```json
{
  "title": "My Shared Note",
  "content": "# Note Content\n\nThis is the content of the shared note...",
  "updatedAt": 1694567890123,
  "viewOnly": true
}
```

### Error (400)
```json
{
  "error": "Invalid share ID"
}
```

### Error (404)
```json
{
  "error": "Note not found"
}
```

### Error (403)
```json
{
  "error": "Note not viewable"
}
```

### Error (500)
```json
{
  "error": "Internal server error"
}
```

## Usage Examples

### cURL
```bash
curl -X GET "https://your-domain.com/api/shared-notes/abc123def456"
```

### JavaScript/Fetch
```javascript
fetch('https://your-domain.com/api/shared-notes/abc123def456')
  .then(response => response.json())
  .then(data => {
    if (data.title) {
      console.log('Note title:', data.title);
      console.log('Note content:', data.content);
    } else {
      console.error('Error:', data.error);
    }
  });
```

### Flutter/Dart
```dart
final response = await http.get(
  Uri.parse('https://your-domain.com/api/shared-notes/abc123def456'),
);

if (response.statusCode == 200) {
  final data = json.decode(response.body);
  final title = data['title'];
  final content = data['content'];
  final updatedAt = data['updatedAt'];
  
  // Display the shared note
  showSharedNote(title, content, updatedAt);
} else {
  final error = json.decode(response.body)['error'];
  print('Error: $error');
}
```

## Data Structure

### Note Document in Firestore
```json
{
  "title": "My Shared Note",
  "content": "# Note Content\n\nThis is the content...",
  "viewOnly": true,
  "updatedAt": "2025-09-13T08:51:30.197Z",
  "createdAt": "2025-09-13T08:50:30.197Z"
}
```

## Security Features

- ✅ **View-Only Access**: Notes can only be viewed, not edited
- ✅ **Time-Bound Links**: Share links can expire automatically
- ✅ **Unique IDs**: Each share has a unique, unguessable identifier
- ✅ **Firebase Security**: Backed by Firebase Firestore security rules

## Use Cases
- Share notes with colleagues or friends
- Create public note links
- Embed notes in external websites
- View-only note access without authentication

## Error Handling

| Status Code | Error | Description |
|-------------|-------|-------------|
| 400 | Invalid share ID | Missing or malformed shareId parameter |
| 404 | Note not found | ShareId doesn't exist in database |
| 403 | Note not viewable | Note exists but is not marked as viewable |
| 500 | Internal server error | Server-side error (Firebase connection, etc.) |

## Notes
- This API doesn't require authentication as it's designed for public sharing
- The `viewOnly` flag ensures notes can only be viewed, not modified
- Content is returned as-is from the database (supports Markdown formatting)
