import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = 'https://ujxeijwxbsrjfzqemtaq.supabase.co';
// const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqeGVpand4YnNyamZ6cWVtdGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODg5NzcsImV4cCI6MjAxODg2NDk3N30.0_8-BVq-dknOVePpg1ZH4vO7U7nnfOYUNFW5qKleDx4';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC_KEY
);
