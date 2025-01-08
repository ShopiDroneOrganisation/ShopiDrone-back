'use strict'

const Schema = use('Schema')

class ArticleSchema extends Schema {
  up () {
    this.create('article', (table) => {
      // PK auto-incrémentée (entier)
      table.increments('id')

      table.string('nom').notNullable()
      table.integer('stock').defaultTo(0)

      /**
       * Supabase Auth stocke l'ID de l'utilisateur dans auth.users.id (UUID)
       * Donc on déclare cette colonne en uuid :
       */
      table.uuid('id_user')
        .notNullable()
        .references('id')
        .inTable('auth.users') // On pointe le schéma "auth" et la table "users"
        .onDelete('CASCADE')   // Si l'utilisateur est supprimé, on supprime ses articles

      table.string('description')
      table.decimal('prix', 12, 2).notNullable()
      table.string('categorie')
      table.string('image')
      table.string('compatibilite')

      // date_post (timestamp)
      table.timestamp('date_post', { useTz: true }).notNullable()

      // Timestamps (created_at, updated_at)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('article')
  }
}

module.exports = ArticleSchema
