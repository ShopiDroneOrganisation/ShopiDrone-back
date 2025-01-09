'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Panier extends Model {
  /**
   * Forcer Lucid à utiliser la table "panier" (singulier)
   * plutôt que "paniers" (pluriel par défaut).
   */
  static get table () {
    return 'panier'
  }

  /**
   * Un panier appartient à un utilisateur.
   * Cela suppose qu'un champ "id_user" existe dans la table "paniers" qui fait référence à "id" dans la table "users".
   */
  user () {
    return this.belongsTo('App/Models/User', 'id_user', 'id')
  }

  /**
   * Un panier a plusieurs articles.
   * Cela suppose qu'un champ "id_panier" existe dans la table "articles" qui fait référence à "id" dans la table "paniers".
   */
  articles () {
    return this.hasMany('App/Models/Article', 'id', 'id_panier')
  }
}

module.exports = Panier
