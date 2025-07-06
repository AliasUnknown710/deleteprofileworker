# Delete Profile Worker

A secure Cloudflare Worker for deleting user profiles via a backend API. This worker provides a safe endpoint for profile deletion requests with proper authentication and error handling.

## Features

- 🔐 **Secure Authentication**: Requires Bearer token authentication
- 🚀 **Fast & Lightweight**: Built as a Cloudflare Worker for global edge deployment
- ⚡ **Error Handling**: Comprehensive error handling and logging
- 🔒 **Environment Variables**: Backend URL stored securely as environment variable
- 📋 **HTTP Method Validation**: Only accepts DELETE requests
- 🎯 **User ID Validation**: Validates required user_id parameter

## API Usage

### Delete User Profile

```http
DELETE /?user_id={user_id}
Authorization: Bearer {your_auth_token}
```

**Parameters:**
- `user_id` (required): The ID of the user profile to delete
- `Authorization` header (required): Bearer token for authentication

**Responses:**
- `200 OK`: Profile deleted successfully (redirects to `/`)
- `400 Bad Request`: Missing user_id parameter
- `401 Unauthorized`: Missing or invalid authorization token
- `405 Method Not Allowed`: Non-DELETE request method
- `500 Internal Server Error`: Backend configuration or deletion error

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/deleteprofileworker.git
   cd deleteprofileworker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Wrangler**
   - Copy `wrangler.toml.example` to `wrangler.toml`
   - Update the configuration with your Cloudflare account details

4. **Set Environment Variables**
   ```bash
   wrangler secret put BACKEND_DELETE_URL
   ```
   Enter your backend API URL when prompted.

5. **Deploy**
   ```bash
   npm run deploy
   ```

## Development

### Local Development
```bash
npm run dev
```

### Testing
Use the included `test.html` file to test the worker locally:
```bash
npm run test
```

## Environment Variables

- `BACKEND_DELETE_URL`: The URL of your backend API endpoint for profile deletion

## Security Considerations

- Always use HTTPS in production
- Validate auth tokens on your backend
- Implement rate limiting if needed
- Consider logging deletion requests for audit purposes
- Use secure cookie settings if implementing cookie-based auth

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment Checklist

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for a complete deployment checklist.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.