Delete Profile Worker - Quick Start Guide
==========================================

This is a Cloudflare Worker for securely deleting user profiles via a backend API.

QUICK START:
-----------
1. Install Node.js (18.0.0+) and npm
2. Clone this repository
3. Run: npm install
4. Copy wrangler.toml.example to wrangler.toml
5. Set your Cloudflare account ID in wrangler.toml
6. Install Wrangler: npm install -g wrangler
7. Authenticate: wrangler auth login
8. Set backend URL: wrangler secret put BACKEND_DELETE_URL
9. Start development: npm run dev
10. Test with test.html in your browser

IMPORTANT FILES:
---------------
- index.js                 : Main worker entry point
- deleteprofileworker.js   : Core deletion logic
- package.json             : Dependencies and scripts
- wrangler.toml.example    : Configuration template
- test.html                : Testing interface
- README.md                : Full documentation
- SETUP.md                 : Detailed setup guide
- SECURITY.md              : Security information

API USAGE:
----------
DELETE /?user_id={user_id}
Authorization: Bearer {your_token}

ENVIRONMENT VARIABLES:
---------------------
BACKEND_DELETE_URL : Your backend API endpoint for profile deletion

DEPLOYMENT:
-----------
Development: npm run dev
Staging:     wrangler deploy --env staging
Production:  wrangler deploy --env production

SECURITY:
---------
- Requires Bearer token authentication
- Only accepts DELETE requests
- Validates all input parameters
- Uses HTTPS for all communications
- Backend URL stored as secure environment variable

SUPPORT:
--------
- See README.md for complete documentation
- See SETUP.md for step-by-step setup
- See SECURITY.md for security information
- See CONTRIBUTING.md for development guidelines

For issues or questions, please check the documentation or create an issue on GitHub.

Last updated: July 6, 2025