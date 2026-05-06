const SUPABASE_URL = 'https://kkkkclplygstjnlaumrh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtra2tjbHBseWdzdGpubGF1bXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDc3MzEsImV4cCI6MjA5MzQ4MzczMX0.VLjO2n5pSeG1r7kTr1_D6Z0wEG8GIpSPSJwKyNt9TCo';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window._supabase = _supabase;
