'use strict'

const Database = use('Database')

class TestSupabaseController {
  async index({ response }) {
    try {
      // Exemple : récupérer toutes les données de la table 'users'
      const users = await Database.from('users').select('*')

      // Si la requête réussit, retourner les données
      return response.json(users)
    } catch (error) {
      // Si une erreur survient, retourner l'erreur
      return response.status(500).json({
        message: 'Erreur lors de la connexion à la base de données',
        error: error.message,
      })
    }
  }
}

module.exports = TestSupabaseController

