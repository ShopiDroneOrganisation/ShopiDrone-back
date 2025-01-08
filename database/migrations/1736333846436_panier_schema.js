'use strict'

const Schema = use('Schema')

class PanierSchema extends Schema {
  up () {
    this.create('panier', (table) => {
      table.increments('id') // PK auto-incrémentée

      // Clé étrangère vers Supabase Auth (users), qui stocke un UUID
      table.uuid('id_user')
        .notNullable()
        .references('id')
        .inTable('auth.users')
        .onDelete('CASCADE')

      // Clé étrangère vers la table "article"
      table.integer('id_article').unsigned().notNullable()
        .references('id')
        .inTable('article')
        .onDelete('CASCADE')

      // Montant total du panier
      table.decimal('total', 12, 2).notNullable().defaultTo(0)

      // "payé" (booléen)
      table.boolean('paye').notNullable().defaultTo(false)

      // Timestamps (created_at, updated_at)
      table.timestamps(true, true)
    })
  }

  down () {
    this.drop('panier')
  }
}

module.exports = PanierSchema
