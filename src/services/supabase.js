import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://owybcvfzmnbzdjmxfqvn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93eWJjdmZ6bW5iemRqbXhmcXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMzkyODIsImV4cCI6MjA1MDcxNTI4Mn0.kpQc4_cY8QnTT8535bVeuzXQxBwI3NlKyWQvW8BJ9AQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
