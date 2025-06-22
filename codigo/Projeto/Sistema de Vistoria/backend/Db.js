require('dotenv').config();
// const postgres = require('postgres');

// const sql = postgres(process.env.DATABASE_URL, {
//   ssl: 'require',
// });

// module.exports = sql;


const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;
// Exporta o cliente Supabase para uso em outros módulos