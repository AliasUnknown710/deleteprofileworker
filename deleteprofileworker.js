// Interact with a backend API to delete a user profile, using a secret backend URL from env

async function deleteUserProfile(user_id, authToken, backendUrl) {
    // Send DELETE request to backend API with user_id and auth token
    const response = await fetch(`${backendUrl}?user_id=${encodeURIComponent(user_id)}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${errorText}`);
    }

    return true;
}

export async function handleRequest(request, env) {
    if (request.method !== 'DELETE') {
        return new Response(
            "Method Not Allowed",
            { status: 405 }
        );
    }

    let user_id = null;
    let authToken = null;

    try {
        const url = new URL(request.url);
        user_id = url.searchParams.get('user_id');
    } catch (e) {
        user_id = null;
    }

    // Extract auth token from Authorization header
    authToken = request.headers.get('Authorization');
    if (authToken && authToken.startsWith('Bearer ')) {
        authToken = authToken.slice(7);
    }

    if (!user_id) {
        return new Response(
            "Missing user_id",
            { status: 400 }
        );
    }

    if (!authToken) {
        return new Response(
            "Missing Authorization token",
            { status: 401 }
        );
    }

    // Get backend URL from environment variable (secret)
    const backendUrl = env.BACKEND_DELETE_URL;
    if (!backendUrl) {
        return new Response(
            "Backend URL not configured",
            { status: 500 }
        );
    }

    try {
        await deleteUserProfile(user_id, authToken, backendUrl);
    } catch (error) {
        return new Response(
            `Failed to delete user profile: ${error.message || error}`,
            { status: 500 }
        );
    }

    // Clear auth cookie (if using cookies) and redirect
    return new Response(null, {
        status: 303,
        headers: {
            'Location': '/', // Main landing page
            // Uncomment and adjust the line below if you use cookies for auth
            // 'Set-Cookie': 'auth=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict'
        }
    });
}

export async function main(request, env) {
    return await handleRequest(request, env);
}