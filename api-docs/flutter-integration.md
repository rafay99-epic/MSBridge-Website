# Flutter Integration Guide

Complete guide for integrating MS Bridge APIs with your Flutter application.

## 🔒 **Security Setup**

### Environment Variable
Create `.env.local` file in your project root:
```bash
MS_BRIDGE_API_KEY=your-super-secret-api-key-here-make-it-long-and-random
```

Generate a secure API key:
```bash
# Generate a secure API key
openssl rand -hex 32
```

## 📱 **Dependencies**

Add these to your `pubspec.yaml`:

```yaml
dependencies:
  http: ^1.1.0
  package_info_plus: ^8.0.0
  url_launcher: ^6.2.0
```

## 🛠️ **Implementation**

### 1. Update Service Class

Create `lib/services/update_service.dart`:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';

class UpdateService {
  static const String _baseUrl = 'https://your-domain.com/api';
  static const String _apiKey = 'your-super-secret-api-key-here'; // Store securely
  
  /// Check if the system is live
  static Future<bool> isSystemLive() async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/health'),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': _apiKey, // Add API key to headers
        },
      ).timeout(const Duration(seconds: 10));
      
      return response.statusCode == 200;
    } catch (e) {
      print('Health check failed: $e');
      return false;
    }
  }
  
  /// Check for app updates
  static Future<UpdateCheckResult> checkForUpdates() async {
    try {
      // Get current app version info
      final packageInfo = await PackageInfo.fromPlatform();
      final currentVersion = packageInfo.version;
      final buildNumber = int.tryParse(packageInfo.buildNumber) ?? 0;
      
      final response = await http.post(
        Uri.parse('$_baseUrl/update-check'),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': _apiKey, // Add API key to headers
        },
        body: json.encode({
          'version': currentVersion,
          'buildNumber': buildNumber,
        }),
      ).timeout(const Duration(seconds: 15));
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return UpdateCheckResult.fromJson(data);
      } else if (response.statusCode == 401) {
        return UpdateCheckResult.error('Invalid API key');
      } else {
        throw Exception('Failed to check for updates: ${response.statusCode}');
      }
    } catch (e) {
      print('Error checking for updates: $e');
      return UpdateCheckResult.error('Failed to check for updates: $e');
    }
  }
}

/// Model class for update check results
class UpdateCheckResult {
  final bool isLive;
  final bool updateAvailable;
  final String? message;
  final AppVersion? latestVersion;
  final AppVersion? currentVersion;
  final String? error;
  
  UpdateCheckResult({
    required this.isLive,
    required this.updateAvailable,
    this.message,
    this.latestVersion,
    this.currentVersion,
    this.error,
  });
  
  factory UpdateCheckResult.fromJson(Map<String, dynamic> json) {
    return UpdateCheckResult(
      isLive: json['status'] == 'live',
      updateAvailable: json['updateAvailable'] ?? false,
      message: json['message'],
      latestVersion: json['latestVersion'] != null 
          ? AppVersion.fromJson(json['latestVersion']) 
          : null,
      currentVersion: json['currentVersion'] != null 
          ? AppVersion.fromJson(json['currentVersion']) 
          : null,
    );
  }
  
  factory UpdateCheckResult.error(String errorMessage) {
    return UpdateCheckResult(
      isLive: false,
      updateAvailable: false,
      error: errorMessage,
    );
  }
  
  bool get hasError => error != null;
}

/// Model class for app version information
class AppVersion {
  final String version;
  final int buildNumber;
  final String downloadUrl;
  final String? changelog;
  final String releaseDate;
  
  AppVersion({
    required this.version,
    required this.buildNumber,
    required this.downloadUrl,
    this.changelog,
    required this.releaseDate,
  });
  
  factory AppVersion.fromJson(Map<String, dynamic> json) {
    return AppVersion(
      version: json['version'] ?? '',
      buildNumber: json['buildNumber'] ?? 0,
      downloadUrl: json['downloadUrl'] ?? '',
      changelog: json['changelog'],
      releaseDate: json['releaseDate'] ?? '',
    );
  }
}
```

### 2. Update Dialog Widget

Create `lib/widgets/update_dialog.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/update_service.dart';

class UpdateDialog extends StatelessWidget {
  final UpdateCheckResult updateResult;
  final VoidCallback? onDismiss;
  
  const UpdateDialog({
    Key? key,
    required this.updateResult,
    this.onDismiss,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Row(
        children: [
          Icon(Icons.system_update, color: Colors.blue),
          SizedBox(width: 8),
          Text('Update Available'),
        ],
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'A new version of MS Bridge is available!',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 16),
          if (updateResult.latestVersion != null) ...[
            _buildVersionInfo('Current Version', updateResult.currentVersion),
            const SizedBox(height: 8),
            _buildVersionInfo('Latest Version', updateResult.latestVersion),
            const SizedBox(height: 16),
            if (updateResult.latestVersion!.changelog != null) ...[
              const Text(
                'What\'s New:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                updateResult.latestVersion!.changelog!,
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ],
        ],
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
            onDismiss?.call();
          },
          child: const Text('Later'),
        ),
        ElevatedButton(
          onPressed: () => _downloadUpdate(context),
          child: const Text('Download Update'),
        ),
      ],
    );
  }
  
  Widget _buildVersionInfo(String label, AppVersion? version) {
    if (version == null) return const SizedBox.shrink();
    
    return Row(
      children: [
        Text(
          '$label: ',
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
        Text('${version.version} (${version.buildNumber})'),
      ],
    );
  }
  
  Future<void> _downloadUpdate(BuildContext context) async {
    if (updateResult.latestVersion?.downloadUrl != null) {
      final url = Uri.parse(updateResult.latestVersion!.downloadUrl);
      
      try {
        if (await canLaunchUrl(url)) {
          await launchUrl(url, mode: LaunchMode.externalApplication);
          Navigator.of(context).pop();
        } else {
          _showErrorDialog(context, 'Could not launch download URL');
        }
      } catch (e) {
        _showErrorDialog(context, 'Error downloading update: $e');
      }
    }
  }
  
  void _showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Download Error'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}
```

### 3. Update Manager Service

Create `lib/services/update_manager.dart`:

```dart
import 'package:flutter/material.dart';
import 'update_service.dart';
import '../widgets/update_dialog.dart';

class UpdateManager {
  static const Duration _checkInterval = Duration(hours: 6);
  static DateTime? _lastCheck;
  
  /// Check for updates on app startup
  static Future<void> checkForUpdatesOnStartup(BuildContext context) async {
    // Only check if enough time has passed since last check
    if (_lastCheck != null && 
        DateTime.now().difference(_lastCheck!) < _checkInterval) {
      return;
    }
    
    await _performUpdateCheck(context);
  }
  
  /// Manually check for updates
  static Future<void> checkForUpdatesManually(BuildContext context) async {
    await _performUpdateCheck(context, showLoading: true);
  }
  
  static Future<void> _performUpdateCheck(
    BuildContext context, {
    bool showLoading = false,
  }) async {
    try {
      if (showLoading) {
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => const Center(
            child: CircularProgressIndicator(),
          ),
        );
      }
      
      // First check if system is live
      final isLive = await UpdateService.isSystemLive();
      if (!isLive) {
        if (showLoading) Navigator.of(context).pop();
        _showErrorDialog(context, 'Unable to connect to update server');
        return;
      }
      
      // Check for updates
      final updateResult = await UpdateService.checkForUpdates();
      
      if (showLoading) Navigator.of(context).pop();
      
      if (updateResult.hasError) {
        _showErrorDialog(context, updateResult.error!);
        return;
      }
      
      if (updateResult.updateAvailable) {
        _showUpdateDialog(context, updateResult);
      } else if (showLoading) {
        _showNoUpdateDialog(context, updateResult.message ?? 'You are up to date!');
      }
      
      _lastCheck = DateTime.now();
      
    } catch (e) {
      if (showLoading) Navigator.of(context).pop();
      _showErrorDialog(context, 'Error checking for updates: $e');
    }
  }
  
  static void _showUpdateDialog(BuildContext context, UpdateCheckResult result) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => UpdateDialog(
        updateResult: result,
        onDismiss: () {
          // Optionally save user preference to not show again for this version
        },
      ),
    );
  }
  
  static void _showNoUpdateDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Check for Updates'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
  
  static void _showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Update Check Failed'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}
```

### 4. Integration in Main App

Update your `lib/main.dart` or main app widget:

```dart
import 'package:flutter/material.dart';
import 'services/update_manager.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MS Bridge',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    super.initState();
    // Check for updates after the widget is built
    WidgetsBinding.instance.addPostFrameCallback((_) {
      UpdateManager.checkForUpdatesOnStartup(context);
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('MS Bridge'),
        actions: [
          IconButton(
            icon: const Icon(Icons.system_update),
            onPressed: () => UpdateManager.checkForUpdatesManually(context),
            tooltip: 'Check for Updates',
          ),
        ],
      ),
      body: const Center(
        child: Text('Your app content here'),
      ),
    );
  }
}
```

### 5. Settings Screen Integration

Add update check option in your settings screen:

```dart
ListTile(
  leading: const Icon(Icons.system_update),
  title: const Text('Check for Updates'),
  subtitle: const Text('Check for the latest version'),
  onTap: () => UpdateManager.checkForUpdatesManually(context),
),
```

## 📋 **Usage Examples**

### Basic Update Check
```dart
// Check if system is live
bool isLive = await UpdateService.isSystemLive();

// Check for updates
UpdateCheckResult result = await UpdateService.checkForUpdates();

if (result.updateAvailable) {
  // Show update dialog
  showDialog(
    context: context,
    builder: (context) => UpdateDialog(updateResult: result),
  );
}
```

### Manual Update Check with Loading
```dart
// Show loading and check for updates
UpdateManager.checkForUpdatesManually(context);
```

### Auto Check on App Start
```dart
// In your main widget's initState
@override
void initState() {
  super.initState();
  WidgetsBinding.instance.addPostFrameCallback((_) {
    UpdateManager.checkForUpdatesOnStartup(context);
  });
}
```

## 🔧 **Error Handling**

The implementation includes comprehensive error handling for:
- Network connectivity issues
- Server unavailability
- Invalid responses
- Timeout errors
- URL launch failures
- API key authentication errors

## 💡 **Best Practices**

1. **Check on App Start**: Automatically check for updates when the app starts
2. **Respect Check Interval**: Don't check too frequently (implemented 6-hour interval)
3. **User Choice**: Allow users to dismiss update dialogs
4. **Error Feedback**: Show clear error messages when updates can't be checked
5. **Loading States**: Show loading indicators for manual update checks
6. **External Downloads**: Use external browser for APK downloads

## 🧪 **Testing**

Test the implementation with:
- Network connectivity on/off
- Invalid server responses
- Different app versions
- Update available scenarios
- No update available scenarios
- API key authentication errors

This implementation provides a complete, production-ready update checking system for your MS Bridge Flutter app!
