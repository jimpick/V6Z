// Home view
var HomeView = Backbone.View.extend({

  // root DOM element
  el: "#home-view"

, events: {
    'click a': 'switchView'
  }

  // setup for view 
, initialize: function() {
    this.template = _.template($('#home-template').html())
    _.bindAll(this, 'render', 'hide', 'switchView')
  }

  // populate the view
, render: function() {
    $(this.el).html(this.template({
    }))
    $(this.el).css('display', 'block')
    $('title').text("V6Z")
  }

  // hide the view
, hide: function() {
    $(this.el).css('display', 'none')
  }

  // switch to another view (using pushState)
  // get the target view from the href attribute
, switchView: function(e) {
    var href = $(e.currentTarget).attr("href").replace(/^\//,'')
    e.preventDefault()
    router.navigate(href, true)
  }

})

// Register view name for later instantiation
registeredViews.push({
  name: 'home'
, klass: HomeView
, options: {
  }
})

