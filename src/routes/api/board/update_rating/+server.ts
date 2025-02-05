import type { RequestHandler } from './$types';
import update_rating from './update_rating';

export const POST: RequestHandler = async ({ request }) => {
  const { user_id } = await request.json();
  const j = update_rating(user_id);
  return j
}