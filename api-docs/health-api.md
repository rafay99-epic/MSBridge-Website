# Health Check API

## Overview
Simple health check endpoint to verify the system is live and responsive.

## Endpoint
```
GET /api/health
```

## Authentication
✅ **API Key Required** - Send via `x-api-key` header

## Request

### Headers
```
Content-Type: application/json
x-api-key: your-api-key-here
```

## Response

### Success (200)
```json
{
  "status": "healthy",
  "timestamp": "2025-09-13T08:51:30.197Z",
  "uptime": 384.6979805,
  "version": "1.0.0"
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
  "error": "Health check failed"
}
```

## Usage Examples

### cURL
```bash
curl -X GET "https://your-domain.com/api/health" \
  -H "x-api-key: your-api-key-here"
```

### Flutter/Dart
```dart
final response = await http.get(
  Uri.parse('https://your-domain.com/api/health'),
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your-api-key-here',
  },
);

if (response.statusCode == 200) {
  final data = json.decode(response.body);
  print('System is healthy: ${data['status']}');
}
```

## Use Cases
- Verify server connectivity before making other API calls
- Monitor system health
- Check if the update service is available
