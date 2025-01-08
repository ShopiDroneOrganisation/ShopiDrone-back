const { createClient } = require('@supabase/supabase-js')

// Récupérer les variables d'environnement
const { SUPABASE_URL, SUPABASE_KEY } = process.env

// Créer et exporter le client Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

module.exports = supabase
