const { ServiceProvider } = require('@adonisjs/fold')
const { createClient } = require('@supabase/supabase-js')
const Config = use('Config')

class SupabaseProvider extends ServiceProvider {
  register () {
    // Créez un client Supabase à partir des variables d'environnement
    const supabase = createClient(Config.get('supabase.url'), Config.get('supabase.key'))

    // Ajoutez le client Supabase à l'injecteur
    this.app.singleton('Supabase', () => supabase)
  }

  boot () {}
}

module.exports = SupabaseProvider
