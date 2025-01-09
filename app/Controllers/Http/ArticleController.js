'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Article = use('App/Models/Article')

class ArticleController {
  /**
   * GET /articles
   * Récupère la liste de tous les articles.
   */
  async index ({ response }) {
    try {
      const articles = await Article.all()
      return response.json(articles)
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la récupération des articles',
        error: error.message,
      })
    }
  }

  /**
   * POST /articles
   * Crée un nouvel article avec upload d'image.
   */
  async store ({ request, response }) {
    try {
      // Récupère les champs utiles depuis la requête
      const data = request.only([
        'nom',
        'stock',
        'id_user',
        'description',
        'prix',
        'categorie',
        'compatibilite',
        'date_post',
      ])

      // Gérer l'upload de l'image
      const image = request.file('image', {
        types: ['image'],
        size: '2mb'
      })

      if (image) {
        // Définir le chemin de stockage des images
        await image.move('public/uploads', {
          name: `${new Date().getTime()}.${image.subtype}`, // Nom unique
          overwrite: true
        })

        if (!image.moved()) {
          return image.error()
        }

        // Enregistrer le chemin de l'image dans les données
        data.image = `/uploads/${image.fileName}`
      }

      // Si pas de date_post fournie, on met la date du jour
      if (!data.date_post) {
        data.date_post = new Date()
      }

      // Création via Lucid
      const article = await Article.create(data)
      return response.status(201).json(article)
    } catch (error) {
      return response.status(400).json({
        message: "Erreur lors de la création de l'article",
        error: error.message,
      })
    }
  }

  /**
   * GET /articles/:id
   * Affiche un article précis par son ID.
   */
  async show ({ params, response }) {
    try {
      const article = await Article.find(params.id)
      if (!article) {
        return response.status(404).json({ message: 'Article introuvable' })
      }
      return response.json(article)
    } catch (error) {
      return response.status(500).json({
        message: "Erreur lors de la récupération de l'article",
        error: error.message,
      })
    }
  }

  /**
   * PUT ou PATCH /articles/:id
   * Met à jour un article existant.
   */
  async update ({ params, request, response }) {
    try {
      const article = await Article.find(params.id)
      if (!article) {
        return response.status(404).json({ message: 'Article introuvable' })
      }

      // Récupère les champs
      const data = request.only([
        'nom',
        'stock',
        'id_user',
        'description',
        'prix',
        'categorie',
        'compatibilite',
        'date_post',
      ])

      // Gérer l'upload de l'image si présente
      const image = request.file('image', {
        types: ['image'],
        size: '2mb'
      })

      if (image) {
        await image.move('public/uploads', {
          name: `${new Date().getTime()}.${image.subtype}`,
          overwrite: true
        })

        if (!image.moved()) {
          return image.error()
        }

        data.image = `/uploads/${image.fileName}`
      }

      // Merge les nouvelles données et sauvegarde
      article.merge(data)
      await article.save()

      return response.json(article)
    } catch (error) {
      return response.status(400).json({
        message: "Erreur lors de la mise à jour de l'article",
        error: error.message,
      })
    }
  }

  /**
   * DELETE /articles/:id
   * Supprime un article.
   */
  async destroy ({ params, response }) {
    try {
      const article = await Article.find(params.id)
      if (!article) {
        return response.status(404).json({ message: 'Article introuvable' })
      }

      await article.delete()
      return response.status(204).json()
    } catch (error) {
      return response.status(500).json({
        message: "Erreur lors de la suppression de l'article",
        error: error.message,
      })
    }
  }
}

module.exports = ArticleController
