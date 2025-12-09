
import { createClient } from '@supabase/supabase-js';

// Substitua estas variáveis pelas suas credenciais reais do painel do Supabase
// Configurações > API
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qhjzpsbaxfdaaublqgnk.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoanpwc2JheGZkYWF1YmxxZ25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMzI1OTQsImV4cCI6MjA4MDYwODU5NH0.NmronkoaSw1JVyv-bEWLYNthYCGv3ZZLb9g_UAvb9F4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
