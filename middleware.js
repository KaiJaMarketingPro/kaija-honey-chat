// 📁 /middleware.js 

export default async function middleware(req) {
  const url = new URL(req.url);
  const isAdmin = url.pathname.startsWith('/admin/');
  const token = url.searchParams.get('auth');
  const validToken = process.env.ADMIN_SECRET_TOKEN;

  if (isAdmin && token !== validToken) {
    return new Response('Zugriff verweigert – ungültiger Token.', { status: 403 });
  }

  return new Response(null, { status: 200 }); // weiterleiten
}
