'use strict'

const supabase = use('App/Config/supabase')

class UserController {
  /**
   * Inscription d'un utilisateur
   * POST /register
   */
  async register({ request, response }) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Appel de Supabase pour créer un utilisateur
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return response.status(400).json({
          message: error.message,
        })
      }

      return response.status(201).json({
        message: 'User registered successfully',
        user,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error registering user',
        error: error.message,
      })
    }
  }

  /**
   * Connexion d'un utilisateur
   * POST /login
   */
  async login({ request, response }) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Appel de Supabase pour connecter l'utilisateur
      const { user, error, session } = await supabase.auth.signIn({
        email,
        password,
      })

      if (error) {
        return response.status(400).json({
          message: error.message,
        })
      }

      return response.status(200).json({
        message: 'User logged in successfully',
        user,
        session,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error logging in user',
        error: error.message,
      })
    }
  }

  /**
   * Déconnexion d'un utilisateur
   * POST /logout
   */
  async logout({ response }) {
    try {
      await supabase.auth.signOut()

      return response.status(200).json({
        message: 'User logged out successfully',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error logging out user',
        error: error.message,
      })
    }
  }

  /**
   * Obtenir l'utilisateur authentifié
   * GET /user
   */
  async user({ response }) {
    try {
      const user = supabase.auth.user()

      if (!user) {
        return response.status(401).json({
          message: 'No user logged in',
        })
      }

      return response.status(200).json({
        user,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error retrieving user',
        error: error.message,
      })
    }
  }
}

module.exports = UserController
