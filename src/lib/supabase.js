import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ywzoygbfhnognjwwmigk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_PdDMQ_-_pNkk-qb4boid0Q_KtEckQ4O';

export  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);