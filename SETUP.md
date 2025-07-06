# Setup Guide - Delete Profile Worker

This guide will walk you through setting up the Delete Profile Worker for development, testing, and production deployment.

## Prerequisites

### Required Software
- **Node.js** (v18 or later) - Download from [nodejs.org](https://nodejs.org)
- **Wrangler CLI** - Cloudflare's CLI tool for Workers
- **Git** - For version control
- **Text Editor** - VS Code recommended

### Required Accounts & Services
- **Cloudflare Account** with Workers subscription
- **Backend API** endpoint for user management
- **Authentication System** for token validation

## Installation

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare
```bash
wrangler login
```

### 3. Clone or Download Worker
```bash
# If using git
git clone <repository-url>
cd DeleteProfileWorker

# Or download and extract files
```

### 4. Install Dependencies (Optional)
```bash
npm install
```

## Configuration

### 1. Configure Wrangler
Copy the example configuration file:
```bash
cp wrangler.toml.example wrangler.toml
```

Edit `wrangler.toml` and update:
- `name`: Your worker name (must be unique in your account)
- `compatibility_date`: Current date (YYYY-MM-DD format)
- Any KV namespace bindings if using rate limiting

### 2. Set Up Secrets
Configure required environment variables:
```bash
# Required: Backend API endpoint
wrangler secret put BACKEND_URL
# Enter your backend API URL when prompted

# Optional: Additional secrets as needed
wrangler secret put JWT_SECRET  # If using JWT validation
```

### 3. Backend API Configuration
Ensure your backend API supports:
- DELETE endpoint for profile deletion
- Bearer token authentication
- Proper CORS headers
- JSON response format

Example backend endpoint:
```
DELETE /api/users/{user_id}
Authorization: Bearer <token>
```

## Development Setup

### 1. Development Environment
```bash
# Start development server
wrangler dev

# Or with specific port
wrangler dev --port 8080
```

### 2. Testing Setup
Open `test.html` in your browser and configure:
- Worker URL (from wrangler dev output)
- Valid authentication token
- Test user ID for deletion

### 3. Local Testing
1. Start the development server
2. Open test.html in browser
3. Fill in the form with test data
4. Click "Delete Profile" to test

## Production Deployment

### 1. Pre-Deployment Checklist
- [ ] Backend API is configured and accessible
- [ ] Secrets are properly set
- [ ] Worker name is unique
- [ ] Configuration is validated
- [ ] Testing is completed

### 2. Deploy to Production
```bash
# Deploy worker
wrangler deploy

# Verify deployment
wrangler tail  # View live logs
```

### 3. Post-Deployment Verification
1. Test with production backend
2. Verify authentication flows
3. Check error handling
4. Monitor performance metrics

## Environment Configuration

### Development Environment
```toml
# wrangler.toml for development
name = "delete-profile-worker-dev"
main = "deleteprofileworker.js"
compatibility_date = "2025-07-06"

[env.development]
# Development-specific settings
```

### Production Environment
```toml
# wrangler.toml for production
name = "delete-profile-worker"
main = "deleteprofileworker.js"
compatibility_date = "2025-07-06"

[env.production]
# Production-specific settings
```

## Troubleshooting

### Common Issues

#### Authentication Failures
- Verify BACKEND_URL secret is set correctly
- Check backend API is accessible
- Confirm token format and validity
- Review CORS configuration

#### Deployment Issues
- Ensure worker name is unique
- Check Wrangler authentication
- Verify syntax in wrangler.toml
- Review account limits and quotas

#### Backend Integration
- Test backend API independently
- Verify request format and headers
- Check network connectivity
- Review timeout settings

### Debugging Commands
```bash
# View worker logs
wrangler tail

# Test worker locally
wrangler dev --local

# Check worker status
wrangler status

# View account information
wrangler whoami
```

## Security Considerations

### During Setup
- Never commit wrangler.toml with secrets
- Use environment-specific configurations
- Validate all secrets before deployment
- Review security settings in SECURITY.md

### Production Security
- Rotate secrets regularly
- Monitor for unauthorized access
- Keep dependencies updated
- Review logs for security events

## Integration with Other Workers

This worker integrates with other components in the user management system:

### LoginWorker
- Provides authentication tokens
- Validates user credentials
- Maintains session state

### ProfileInfoWorker
- Retrieves user profile data
- Validates user existence
- Provides user context

### SignUpWorker
- Creates user accounts
- Validates user registration
- Integrates with profile creation

## Monitoring & Maintenance

### Performance Monitoring
- Response times
- Error rates
- Backend integration health
- Resource utilization

### Regular Maintenance
- Update dependencies
- Rotate secrets
- Review logs
- Update documentation

## Getting Help

### Documentation
- README.md - Comprehensive overview
- SECURITY.md - Security guidelines
- CONTRIBUTING.md - Development guidelines
- DEPLOYMENT_CHECKLIST.md - Production deployment

### Support Resources
- Cloudflare Workers Documentation
- Wrangler CLI Documentation
- Community Forums
- Support Tickets

### Common Commands Reference
```bash
# Setup
wrangler login
cp wrangler.toml.example wrangler.toml
wrangler secret put BACKEND_URL

# Development
wrangler dev
wrangler tail

# Deployment
wrangler deploy
wrangler status

# Maintenance
wrangler secret list
wrangler delete
```
