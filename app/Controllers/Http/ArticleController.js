'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

/**
 * Resourceful controller for interacting with articles
 */

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
   * GET /articles/create
   * (Facultatif) Formulaire de création si vous faites un rendu HTML.
   */
  async create ({ response }) {
    return response.json({ message: 'Formulaire de création (optionnel).' })
  }

  /**
   * POST /articles
   * Crée un nouvel article.
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
        'image',
        'compatibilite',
        'date_post',
      ])

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
   * GET /articles/:id/edit
   * (Facultatif) Formulaire d’édition si vous faites un rendu HTML.
   */
  async edit ({ params, response }) {
    return response.json({ message: `Formulaire d'édition (optionnel) pour l'article #${params.id}` })
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
        'image',
        'compatibilite',
        'date_post',
      ])

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
      // 204 = No Content, typique pour un succès sans renvoyer de body
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
