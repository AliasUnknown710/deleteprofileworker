Delete Profile Worker - Secure User Profile Deletion

This is a production-ready Cloudflare Worker designed for secure user profile deletion with proper authentication and backend integration.

KEY FEATURES:
- Bearer token authentication for secure access
- Backend API integration for profile deletion
- Comprehensive input validation and sanitization
- CORS protection with configurable origins
- Detailed error handling without information leakage
- Production-ready deployment configuration

SETUP REQUIREMENTS:
1. Cloudflare Workers account
2. Backend API endpoint for user management
3. Authentication system for token validation
4. Wrangler CLI for deployment

QUICK START:
1. Copy wrangler.toml.example to wrangler.toml
2. Configure your backend URL: wrangler secret put BACKEND_URL
3. Deploy: wrangler deploy
4. Test using the included test.html file

SECURITY FEATURES:
- All requests require valid Bearer token authentication
- Input validation prevents injection attacks
- Error messages sanitized to prevent information disclosure
- Backend communication secured with proper authentication
- Request method validation (DELETE only)

This worker is part of a larger user management system and integrates with:
- LoginWorker (for authentication tokens)
- SignUpWorker (for user registration)
- ProfileInfoWorker (for profile data)
- ForgotPassWorker (for password resets)

For detailed documentation, see README.md
For deployment guidance, see DEPLOYMENT_CHECKLIST.md
For security information, see SECURITY.md
