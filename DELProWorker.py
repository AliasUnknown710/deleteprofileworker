import json

async def handle_request(request):
    if request.method != 'DELETE':
        return Response(
            "Method Not Allowed",
            status=405
        )

    try:
        url = request.url
        # Cloudflare Workers for Python provide request.url as a string
        from urllib.parse import urlparse, parse_qs
        parsed_url = urlparse(url)
        params = parse_qs(parsed_url.query)
        user_id = params.get('user_id', [None])[0]
    except Exception:
        user_id = None

    if not user_id:
        return Response(
            "Missing user_id",
            status=400
        )

    # TODO: Add logic to delete user profile from your data store
    # For demonstration, we just return success
    return Response(
        f"User profile {user_id} deleted",
        status=200
    )

async def main(request):
    return await handle_request(request)