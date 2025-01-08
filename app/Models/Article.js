'use strict'

const Model = use('Model')

class Article extends Model {
     user () {
     return this.belongsTo('App/Models/User', 'id_user', 'id')
   }
}

module.exports = Article
