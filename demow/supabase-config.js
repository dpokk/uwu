// Supabase Configuration
const SUPABASE_URL = 'https://vcnaxzbyqdbmtcqvhcux.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbmF4emJ5cWRibXRjcXZoY3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDE0MDAsImV4cCI6MjA1ODU3NzQwMH0.xvCaKN5R4Wt_BdgPJnWpAwJ0wDmPoLRFIKYlwQ2HCgk';

// Initialize Supabase Client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);