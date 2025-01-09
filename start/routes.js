'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('test-supabase', 'TestSupabaseController.index')

//Panier routes

Route.get('/paniers', 'PanierController.index')
Route.get('/paniers/create', 'PanierController.create')
Route.post('/paniers', 'PanierController.store')
Route.get('/paniers/:id', 'PanierController.show')
Route.get('/paniers/:id/edit', 'PanierController.edit')
Route.put('/paniers/:id', 'PanierController.update')
Route.delete('/paniers/:id', 'PanierController.destroy')

//Article routes

Route.get('articles', 'ArticleController.index')
Route.get('articles/create', 'ArticleController.create')
Route.post('articles', 'ArticleController.store')
Route.get('articles/:id', 'ArticleController.show')
Route.get('articles/:id/edit', 'ArticleController.edit')
Route.put('articles/:id', 'ArticleController.update')
Route.patch('articles/:id', 'ArticleController.update')
Route.delete('articles/:id', 'ArticleController.destroy')


//User routes

Route.post('register', 'UserController.register')
Route.post('login', 'UserController.login')
Route.post('logout', 'UserController.logout')
Route.get('user', 'UserController.user').middleware(['auth'])
