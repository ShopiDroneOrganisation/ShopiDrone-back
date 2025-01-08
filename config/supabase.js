// config/supabase.js

const { SUPABASE_URL, SUPABASE_KEY } = process.env

module.exports = {
  url: SUPABASE_URL,
  key: SUPABASE_KEY,
}
