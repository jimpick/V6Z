// jQuery loads this when the document is ready 
$(function() {

  // Now that DOM is ready, instantiate views that were registered
  var views = {}
  registeredViews.forEach(function(v) {
    var options = v.options || {}
    options.views = views
    views[v.name] = new (v.klass)(options)
  })

  // router
  var Router = Backbone.Router.extend({

    routes: {
      "": "home"
    , "login": "login"
    }

  , home: function() {
      if (currentView && currentView.hide) currentView.hide()
      currentView = views['home']
      currentView.url = Backbone.history.fragment
      currentView.render()
    }

  , login: function() {
      if (currentView && currentView.hide) currentView.hide()
      currentView = views['login']
      currentView.url = Backbone.history.fragment
      currentView.render()
    }

  })

  // start history to dispatch routes
  router = new Router()

  Backbone.history.start({pushState: true})

})


