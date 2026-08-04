import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).send({ error: 'Supabase not configured on server' });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY as string);

  try {
    const payload = req.body;
    if (!payload || !payload.name || !payload.email) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const insert = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      location: payload.location || null,
      service: payload.service || null,
      preferredDate: payload.preferredDate || null,
      message: payload.message || null,
      deposit: payload.deposit ? Number(payload.deposit) : null,
      createdAt: payload.createdAt || new Date().toISOString(),
    };

    const { error } = await supabase.from('bookings').insert([insert]);
    if (error) {
      console.error('Supabase insert error', error);
      return res.status(500).send({ error: 'Failed to save booking' });
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server error' });
  }
}
