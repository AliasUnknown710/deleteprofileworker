# Delete Profile Worker

A secure Cloudflare Worker for handling user profile deletion requests through a backend API with comprehensive authentication and security features.

## Features

- **DELETE /?user_id={user_id}** - Securely deletes user profiles via backend API
- **Bearer token authentication** - Ensures only authorized requests are processed
- **Input validation** - Validates user IDs and request parameters
- **Rate limiting** - Prevents abuse and protects backend services
- **CORS enabled** - Supports cross-origin requests with proper restrictions
- **Security headers** - Comprehensive security headers for all responses
- **Error handling** - Graceful error handling with secure error messages
- **Audit logging** - Logs deletion requests for compliance and monitoring

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure wrangler.toml:**
   ```bash
   # Copy the example configuration
   cp wrangler.toml.example wrangler.toml
   ```

3. **Set up authentication:**
   ```bash
   # Set backend URL as a secret (required)
   wrangler secret put BACKEND_DELETE_URL
   
   # Set API key as a secret (required)
   wrangler secret put API_KEY
   ```

4. **Configure your backend endpoint:**
   Your backend delete endpoint should accept DELETE requests and return appropriate responses:
   
   ```javascript
   // Expected backend response for successful deletion
   {
     "success": true,
     "message": "Profile deleted successfully",
     "user_id": "user123"
   }
   
   // Expected backend response for failure
   {
     "success": false,
     "message": "User not found or deletion failed",
     "error_code": "USER_NOT_FOUND"
   }
   ```

## Development

1. **Run locally:**
   ```bash
   npm run dev
   ```

2. **Test the endpoint:**
   Open `test.html` in your browser to test the deletion functionality with the interactive form.

3. **Deploy to Cloudflare:**
   ```bash
   npm run deploy
   ```

## API Endpoint

### DELETE /?user_id={user_id}
Deletes a user profile by forwarding the request to your backend service.

**Headers:**
```
Authorization: Bearer your-api-key-here
```

**Query Parameters:**
- `user_id` (required): The unique identifier for the user profile to delete

**Example Request:**
```bash
curl -X DELETE "https://your-worker.workers.dev/?user_id=user123" \
  -H "Authorization: Bearer your-api-key"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile deleted successfully",
  "user_id": "user123"
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "success": false,
  "message": "User ID is required"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized: Invalid or missing API key"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "User not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Environment Variables

Configure these in your `wrangler.toml` or Cloudflare dashboard:

- `BACKEND_DELETE_URL` - Backend API endpoint for profile deletion (set as secret)
- `API_KEY` - API key for authentication (set as secret)

**Setting Secrets:**
```bash
# For production (recommended)
wrangler secret put BACKEND_DELETE_URL
wrangler secret put API_KEY
```

## Security Features

- **Authentication**: Bearer token required for all requests
- **Method Validation**: Only DELETE requests are accepted
- **Input Validation**: User ID validation with strict patterns
- **Rate Limiting**: Built-in protection against abuse
- **CORS Restrictions**: Controlled cross-origin access
- **Security Headers**: Comprehensive security headers including:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security: max-age=31536000`
- **Error Sanitization**: Generic error messages to prevent information disclosure
- **Audit Logging**: Secure logging of deletion events

## Backend Requirements

Your backend delete endpoint must:

### Accept DELETE Requests
```javascript
// Expected request format
DELETE /api/users/{user_id}
Authorization: Bearer {backend_token}
Content-Type: application/json
```

### Return JSON Response
```javascript
// Success response (HTTP 200)
{
  "success": true,
  "message": "Profile deleted successfully",
  "user_id": "user123",
  "deleted_at": "2024-01-01T00:00:00Z"
}

// User not found (HTTP 404)
{
  "success": false,
  "message": "User not found",
  "error_code": "USER_NOT_FOUND"
}

// Deletion failed (HTTP 400)
{
  "success": false,
  "message": "Profile deletion failed",
  "error_code": "DELETION_FAILED",
  "reason": "User has active subscriptions"
}

// Server error (HTTP 500)
{
  "success": false,
  "message": "Internal server error",
  "error_code": "INTERNAL_ERROR"
}
```

### Example Backend Implementation (Node.js/Express)
```javascript
app.delete('/api/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  
  try {
    // Validate user exists
    const user = await findUserById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error_code: "USER_NOT_FOUND"
      });
    }
    
    // Check for dependencies (subscriptions, etc.)
    const hasActiveSubscriptions = await checkActiveSubscriptions(user_id);
    if (hasActiveSubscriptions) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user with active subscriptions",
        error_code: "HAS_DEPENDENCIES"
      });
    }
    
    // Perform deletion
    await deleteUserProfile(user_id);
    
    // Log the deletion
    await logDeletion(user_id, req.user.id);
    
    res.json({
      success: true,
      message: "Profile deleted successfully",
      user_id: user_id,
      deleted_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Deletion error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error_code: "INTERNAL_ERROR"
    });
  }
});
```

## Testing

Use the included `test.html` file to test the worker functionality:

1. Open `test.html` in your browser
2. Start the development server: `npm run dev`
3. Enter a test user ID
4. Click "Delete Profile" to test the functionality

**Manual Testing with curl:**
```bash
# Test successful deletion
curl -X DELETE "http://localhost:8787/?user_id=test123" \
  -H "Authorization: Bearer your-api-key"

# Test missing user ID
curl -X DELETE "http://localhost:8787/" \
  -H "Authorization: Bearer your-api-key"

# Test unauthorized request
curl -X DELETE "http://localhost:8787/?user_id=test123"

# Test wrong method
curl -X GET "http://localhost:8787/?user_id=test123" \
  -H "Authorization: Bearer your-api-key"
```

## Error Handling

The worker includes comprehensive error handling:

- **Input validation errors** return 400 status with descriptive messages
- **Authentication errors** return 401 status
- **User not found errors** return 404 status
- **Backend service errors** are caught and return 500 responses
- **Network errors** are logged but don't expose sensitive information

## Deployment

1. **Configure your Cloudflare account:**
   ```bash
   wrangler login
   ```

2. **Update wrangler.toml with your settings:**
   ```toml
   name = "delete-profile-worker"
   main = "index.js"
   compatibility_date = "2024-01-01"
   
   # Optional: Custom domain
   # [[routes]]
   # pattern = "api.yourdomain.com/delete-profile"
   # zone_name = "yourdomain.com"
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Monitoring and Logging

### Built-in Logging

The worker logs the following events:
- Profile deletion requests (successful and failed)
- Authentication attempts
- Rate limiting events
- Backend service errors

### Cloudflare Analytics

Monitor your worker performance through:
- Cloudflare Workers dashboard
- Real-time logs with `wrangler tail`
- Custom analytics and metrics

### Example Log Monitoring
```bash
# View real-time logs
wrangler tail --format pretty

# View logs with filters
wrangler tail --format pretty --status error
```

## Rate Limiting

The worker implements rate limiting to prevent abuse:

- **Per IP**: 10 requests per minute
- **Global**: 1000 requests per minute
- **Configurable**: Adjust limits in the worker code

```javascript
// Rate limiting configuration (in worker code)
const rateLimits = {
  perIP: {
    requests: 10,
    window: 60000 // 1 minute
  },
  global: {
    requests: 1000,
    window: 60000 // 1 minute
  }
};
```

## Compliance and Data Protection

### GDPR Compliance

When handling EU user data:
- Ensure proper consent for deletion
- Implement proper data retention policies
- Log deletion events for compliance
- Provide deletion confirmation to users

### Audit Trail

The worker maintains an audit trail including:
- Timestamp of deletion requests
- User ID being deleted
- IP address of requester
- Success/failure status
- Error details (if applicable)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following our coding standards
4. Test thoroughly including security testing
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md).

**Important Security Considerations:**
- Always use HTTPS in production
- Regularly rotate API keys
- Monitor deletion patterns for suspicious activity
- Implement proper backend authentication
- Review audit logs regularly

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: Check [SETUP.md](SETUP.md) for detailed setup instructions
- **Security**: See [SECURITY.md](SECURITY.md) for security guidelines
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and community support
