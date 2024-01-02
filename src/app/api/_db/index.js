const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = 'https://ujxeijwxbsrjfzqemtaq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Connected to supabase.');


module.exports = supabase;