'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

/**
 * Resourceful controller for interacting with paniers
 */
const Panier = use('App/Models/Panier')

class PanierController {
  /**
   * GET /paniers
   * Récupère la liste de tous les paniers.
   */
  async index ({ response }) {
    try {
      const paniers = await Panier.all()
      return response.json(paniers)
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la récupération des paniers',
        error: error.message,
      })
    }
  }

  /**
   * GET /paniers/create
   * (Facultatif) Formulaire de création si vous faites un rendu HTML.
   */
  async create ({ response }) {
    return response.json({ message: 'Formulaire de création (optionnel).' })
  }

  /**
   * POST /paniers
   * Crée un nouveau panier.
   */
  async store ({ request, response }) {
    try {
      // Récupère les champs utiles depuis la requête
      const data = request.only([
        'id_user',
        'id_article', // Un tableau d'articles
        'total', // Le montant total
        'paye', // Le statut du panier (ex : "en attente", "validé", etc.)
      ])

      // Création du panier via Lucid
      const panier = await Panier.create(data)
      return response.status(201).json(panier)
    } catch (error) {
      return response.status(400).json({
        message: "Erreur lors de la création du panier",
        error: error.message,
      })
    }
  }

  /**
   * GET /paniers/:id
   * Affiche un panier précis par son ID.
   */
  async show ({ params, response }) {
    try {
      const panier = await Panier.find(params.id)
      if (!panier) {
        return response.status(404).json({ message: 'Panier introuvable' })
      }
      return response.json(panier)
    } catch (error) {
      return response.status(500).json({
        message: "Erreur lors de la récupération du panier",
        error: error.message,
      })
    }
  }

  /**
   * GET /paniers/:id/edit
   * (Facultatif) Formulaire d’édition si vous faites un rendu HTML.
   */
  async edit ({ params, response }) {
    return response.json({ message: `Formulaire d'édition (optionnel) pour le panier #${params.id}` })
  }

  /**
   * PUT ou PATCH /paniers/:id
   * Met à jour un panier existant.
   */
  async update ({ params, request, response }) {
    try {
      const panier = await Panier.find(params.id)
      if (!panier) {
        return response.status(404).json({ message: 'Panier introuvable' })
      }

      // Récupère les champs utiles
      const data = request.only([
        'id_user',
        'articles', // Un tableau d'articles
        'total', // Le montant total
        'status', // Le statut du panier
      ])

      // Merge les nouvelles données et sauvegarde
      panier.merge(data)
      await panier.save()

      return response.json(panier)
    } catch (error) {
      return response.status(400).json({
        message: "Erreur lors de la mise à jour du panier",
        error: error.message,
      })
    }
  }

  /**
   * DELETE /paniers/:id
   * Supprime un panier.
   */
  async destroy ({ params, response }) {
    try {
      const panier = await Panier.find(params.id)
      if (!panier) {
        return response.status(404).json({ message: 'Panier introuvable' })
      }

      await panier.delete()
      // 204 = No Content, typique pour un succès sans renvoyer de body
      return response.status(204).json()
    } catch (error) {
      return response.status(500).json({
        message: "Erreur lors de la suppression du panier",
        error: error.message,
      })
    }
  }
}

module.exports = PanierController

