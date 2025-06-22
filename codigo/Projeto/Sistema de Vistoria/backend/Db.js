// db.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Criar o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, // A URL do seu Supabase
  process.env.SUPABASE_ANON_KEY // A chave Anônima do seu Supabase
);

module.exports = supabase;
