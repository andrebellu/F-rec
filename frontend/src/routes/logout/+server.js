export async function GET({ cookies }) {
    cookies.delete('token')
    return new Response('Logged out', { status: 302, headers: { 'Location': '/' } });
};