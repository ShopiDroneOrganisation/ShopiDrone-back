'use strict'

const Model = use('Model')

class Article extends Model {
  /**
   * Spécifie explicitement que ce modèle pointe vers la table "article" (singulier)
   */
  static get table () {
    return 'article'
  }

  /**
   * Définir les champs autorisés pour l'insertion
   * Ceci est important pour la méthode `create` de Lucid
   */
  static get fillable () {
    return [
      'nom',
      'stock',
      'id_user',
      'description',
      'prix',
      'categorie',
      'image',
      'compatibilite',
      'date_post'
    ]
  }

  /**
   * Relation avec l'utilisateur
   */
  user () {
    return this.belongsTo('App/Models/User', 'id_user', 'id')
  }
}

module.exports = Article
