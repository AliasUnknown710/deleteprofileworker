# Delete Profile Worker

A secure Cloudflare Worker for handling user profile deletion requests with proper authentication and backend integration.

## Features

- 🔒 **Secure Authentication**: Bearer token validation
- 🛡️ **Input Validation**: Comprehensive request validation
- 🌐 **Backend Integration**: Secure communication with backend API
- 📊 **Error Handling**: Detailed error responses and logging
- 🚀 **CORS Support**: Proper cross-origin request handling
- ⚡ **High Performance**: Optimized for Cloudflare Edge

## Quick Setup

### 1. Set Your Backend URL

```bash
wrangler secret put BACKEND_URL
```

### 2. Deploy

```bash
wrangler deploy
```

## API Endpoint

### DELETE /

Deletes a user profile from the system.

**Headers:**
- `Authorization: Bearer <token>` (required)
- `Content-Type: application/json` (required)

**Request Body:**
```json
{
    "user_id": "user123"
}
```

**Response:**
- `200 OK`: Profile deleted successfully
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found
- `405 Method Not Allowed`: Non-DELETE request
- `500 Internal Server Error`: Backend error

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BACKEND_URL` | Backend API endpoint for profile deletion | Yes |

## Security Features

- Bearer token authentication
- Input sanitization and validation
- Secure backend communication
- Error message sanitization
- Request method validation

## Development

1. Copy `wrangler.toml.example` to `wrangler.toml`
2. Configure your environment variables
3. Test using `test.html`
4. Deploy with `wrangler deploy`

## Testing

Use the provided `test.html` file to test the worker functionality locally or after deployment.
