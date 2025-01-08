'use strict'

const supabase = use('App/Config/supabase')

class Auth {
  async handle ({ request, response }, next) {
    const token = request.header('Authorization')

    if (!token) {
      return response.status(401).json({
        message: 'No token provided'
      })
    }

    try {
      const { user, error } = await supabase.auth.api.getUser(token)

      if (error) {
        return response.status(401).json({
          message: 'Invalid or expired token',
        })
      }

      // Attache l'utilisateur au contexte
      request.user = user

      await next()
    } catch (error) {
      return response.status(500).json({
        message: 'Error verifying token',
        error: error.message,
      })
    }
  }
}

module.exports = Auth

