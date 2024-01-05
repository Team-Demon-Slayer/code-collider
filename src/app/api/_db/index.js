const { createClient } = require("@supabase/supabase-js");
const getProject = require("./_queries/getProject");
require("dotenv").config();
const supabaseUrl = "https://ujxeijwxbsrjfzqemtaq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
