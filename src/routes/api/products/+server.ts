import type { RequestHandler } from '@sveltejs/kit';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client';

const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN
});

export const GET: RequestHandler = async () => {
  const result = await client.execute('SELECT * FROM products');
  return new Response(JSON.stringify(result.rows), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};