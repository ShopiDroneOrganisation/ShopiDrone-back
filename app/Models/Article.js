'use strict'

const Model = use('Model')

class Article extends Model {
  /**
   * Forcer Lucid à utiliser la table "article" (singulier)
   * plutôt que "articles" (pluriel par défaut).
   */
  static get table () {
    return 'article'
  }

  /**
   * Exemple de relation : un article appartient à un user,
   * si vous avez un champ "id_user" qui référence la colonne "id" de la table "users".
   */
  user () {
    return this.belongsTo('App/Models/User', 'id_user', 'id')
  }
}

module.exports = Article
