import { main } from './deleteprofileworker.js';

// Cloudflare Worker expects a fetch handler
export default {
    async fetch(request, env, ctx) {
        // Pass the actual Request object to main
        const result = await main(request);
        return result;
    }
};
