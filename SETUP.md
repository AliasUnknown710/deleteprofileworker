# Setup Guide

This guide will walk you through setting up the Delete Profile Worker from scratch.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Environment Configuration](#environment-configuration)
- [Testing Setup](#testing-setup)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

1. **Node.js** (version 18.0.0 or higher)
   ```bash
   # Check your version
   node --version
   
   # Download from: https://nodejs.org/
   ```

2. **npm** (comes with Node.js)
   ```bash
   # Check your version
   npm --version
   ```

3. **Git** (for version control)
   ```bash
   # Check your version
   git --version
   
   # Download from: https://git-scm.com/
   ```

### Required Accounts

1. **Cloudflare Account**
   - Sign up at: https://cloudflare.com/
   - Enable Workers plan (Free tier available)

2. **Backend API** (your profile deletion service)
   - Must support DELETE requests
   - Must validate Bearer tokens
   - Must accept user_id parameter

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/deleteprofileworker.git
cd deleteprofileworker

# Install dependencies
npm install
```

### 2. Configure Wrangler

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Authenticate with Cloudflare
wrangler auth login

# Copy configuration template
cp wrangler.toml.example wrangler.toml
```

### 3. Set Environment Variables

```bash
# Set your backend URL
wrangler secret put BACKEND_DELETE_URL
# Enter your backend URL when prompted (e.g., https://api.yoursite.com/delete-profile)
```

### 4. Start Development

```bash
# Start local development server
npm run dev

# Test in browser
open test.html
```

## Detailed Setup

### Step 1: Project Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/deleteprofileworker.git
   cd deleteprofileworker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - `@cloudflare/workers-types`: TypeScript types for Workers
   - `wrangler`: Cloudflare's CLI tool
   - `eslint`: Code linting
   - `prettier`: Code formatting

### Step 2: Cloudflare Configuration

1. **Install Wrangler CLI**
   ```bash
   # Install globally
   npm install -g wrangler
   
   # Or use npx (no global install needed)
   npx wrangler --version
   ```

2. **Authenticate with Cloudflare**
   ```bash
   wrangler auth login
   ```
   This opens a browser window for authentication.

3. **Get Your Account ID**
   ```bash
   wrangler whoami
   ```
   Copy the Account ID for the next step.

### Step 3: Configuration File Setup

1. **Create wrangler.toml**
   ```bash
   cp wrangler.toml.example wrangler.toml
   ```

2. **Edit wrangler.toml**
   Open `wrangler.toml` and update:
   ```toml
   name = "your-worker-name"  # Must be unique across Cloudflare
   account_id = "your-account-id-here"
   
   [env.production]
   name = "your-worker-name-prod"
   
   [env.staging]
   name = "your-worker-name-staging"
   ```

### Step 4: Environment Variables

Environment variables store sensitive configuration like API URLs.

1. **Set Backend URL**
   ```bash
   # For development/staging
   wrangler secret put BACKEND_DELETE_URL --env staging
   
   # For production
   wrangler secret put BACKEND_DELETE_URL --env production
   ```
   
   Enter your backend API URL when prompted:
   - Format: `https://api.yoursite.com/delete-profile`
   - Must use HTTPS in production
   - Must be accessible from Cloudflare's network

2. **Verify Secrets**
   ```bash
   wrangler secret list --env production
   ```

## Environment Configuration

### Backend API Requirements

Your backend API must:

1. **Accept DELETE Requests**
   ```http
   DELETE /delete-profile?user_id=123
   Authorization: Bearer your-token-here
   ```

2. **Validate Authorization**
   - Check Bearer token in Authorization header
   - Return 401 if invalid/missing

3. **Handle User ID**
   - Extract user_id from query parameters
   - Return 400 if missing
   - Return 404 if user not found

4. **Return Proper Status Codes**
   - 200: Success
   - 400: Bad request (missing user_id)
   - 401: Unauthorized (invalid token)
   - 404: User not found
   - 500: Server error

### Example Backend Response

```json
// Success (200)
{
  "success": true,
  "message": "User profile deleted successfully"
}

// Error (400)
{
  "error": "Missing user_id parameter"
}
```

## Testing Setup

### Local Testing

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   This starts the worker at `http://localhost:8787`

2. **Use Test Interface**
   - Open `test.html` in your browser
   - Configure the local URL: `http://localhost:8787`
   - Enter test user ID and auth token
   - Test different scenarios

### Test Cases

Test these scenarios:

1. **Valid Request**
   ```http
   DELETE http://localhost:8787/?user_id=test123
   Authorization: Bearer valid-token
   ```

2. **Missing User ID**
   ```http
   DELETE http://localhost:8787/
   Authorization: Bearer valid-token
   ```

3. **Missing Auth Token**
   ```http
   DELETE http://localhost:8787/?user_id=test123
   ```

4. **Wrong HTTP Method**
   ```http
   GET http://localhost:8787/?user_id=test123
   Authorization: Bearer valid-token
   ```

### Using curl for Testing

```bash
# Valid request
curl -X DELETE "http://localhost:8787/?user_id=test123" \
  -H "Authorization: Bearer your-test-token"

# Missing user_id
curl -X DELETE "http://localhost:8787/" \
  -H "Authorization: Bearer your-test-token"

# Missing auth token
curl -X DELETE "http://localhost:8787/?user_id=test123"

# Wrong method
curl -X GET "http://localhost:8787/?user_id=test123" \
  -H "Authorization: Bearer your-test-token"
```

## Deployment

### Staging Deployment

1. **Deploy to Staging**
   ```bash
   wrangler deploy --env staging
   ```

2. **Test Staging**
   - Update test.html with staging URL
   - Run full test suite
   - Verify backend integration

### Production Deployment

1. **Deploy to Production**
   ```bash
   wrangler deploy --env production
   ```

2. **Verify Deployment**
   ```bash
   # Check deployment status
   wrangler status --env production
   
   # View logs
   wrangler tail --env production
   ```

3. **Test Production**
   - Use production URL in test.html
   - Test with production backend
   - Monitor for errors

### Custom Domain (Optional)

1. **Add Domain to Cloudflare**
   - Add your domain to Cloudflare
   - Update DNS to Cloudflare nameservers

2. **Configure Route**
   In `wrangler.toml`:
   ```toml
   [env.production]
   routes = [
     { pattern = "api.yourdomain.com/delete-profile", zone_name = "yourdomain.com" }
   ]
   ```

3. **Deploy with Route**
   ```bash
   wrangler deploy --env production
   ```

## Troubleshooting

### Common Issues

#### 1. Authentication Failed
```
Error: Authentication failed
```
**Solution:**
```bash
wrangler auth login
```

#### 2. Account ID Missing
```
Error: Missing account_id in wrangler.toml
```
**Solution:**
```bash
# Get account ID
wrangler whoami

# Add to wrangler.toml
account_id = "your-account-id"
```

#### 3. Worker Name Taken
```
Error: Worker name already exists
```
**Solution:**
Change the worker name in `wrangler.toml`:
```toml
name = "your-unique-worker-name"
```

#### 4. Backend URL Not Set
```
Backend URL not configured
```
**Solution:**
```bash
wrangler secret put BACKEND_DELETE_URL --env production
```

#### 5. CORS Issues
```
Error: CORS policy blocked request
```
**Solution:**
Configure CORS on your backend to allow Cloudflare Workers:
```javascript
// Backend CORS headers
{
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type'
}
```

### Development Tips

1. **View Logs**
   ```bash
   # Real-time logs
   wrangler tail --env production
   
   # Local development logs
   wrangler tail --local
   ```

2. **Debug Mode**
   Add console.log statements to your code:
   ```javascript
   console.log('Received request:', request.method, request.url);
   ```

3. **Test with Different Tokens**
   Use the test interface to try:
   - Valid tokens
   - Expired tokens
   - Malformed tokens
   - Missing tokens

### Getting Help

1. **Check Documentation**
   - [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
   - [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

2. **Community Support**
   - [Cloudflare Community](https://community.cloudflare.com/)
   - [Discord](https://discord.gg/cloudflaredev)

3. **Project Issues**
   - Create an issue on GitHub
   - Check existing issues first

## Next Steps

After successful setup:

1. **Security Review**
   - Review SECURITY.md
   - Implement rate limiting if needed
   - Set up monitoring

2. **Documentation**
   - Update README with your URLs
   - Document your backend API
   - Create user guides

3. **Monitoring**
   - Set up Cloudflare Analytics
   - Configure error alerts
   - Monitor performance

4. **Maintenance**
   - Schedule regular updates
   - Plan backup procedures
   - Set up CI/CD pipeline

---

## Quick Reference

### Essential Commands
```bash
# Development
npm run dev              # Start local server
npm run deploy           # Deploy to default environment
npm run test            # Run tests

# Wrangler
wrangler auth login      # Authenticate
wrangler deploy          # Deploy worker
wrangler tail           # View logs
wrangler secret put     # Set environment variable
wrangler status         # Check deployment status
```

### File Structure
```
deleteprofileworker/
├── index.js                 # Main worker entry point
├── deleteprofileworker.js   # Core logic
├── package.json            # Dependencies and scripts
├── wrangler.toml           # Cloudflare configuration
├── test.html              # Test interface
├── README.md              # Project documentation
└── SETUP.md              # This file
```

### Environment Variables
- `BACKEND_DELETE_URL`: Your backend API endpoint for profile deletion

For additional help, see [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) and [CONTRIBUTING.md](CONTRIBUTING.md).