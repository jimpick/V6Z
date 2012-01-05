var fs = require('fs')
  , _ = require('underscore')
  , util = require('util')
  , frontendDir = 'frontend'
  , jsFilesHTML = ''

// Returns a list of names for a specific directory and extension
// Synchronous
var dirMatch = function(dir, extension) {
  var matcher = new RegExp('\.' + extension + '$')
  var files = _.filter(fs.readdirSync(dir), function(n) {
    return n.match(matcher)
  })
  return _.map(files, function(n) {
    return n.replace('.' + extension, '')
  })
}

// Load templates in memory
var loadTemplates = function() {
  var templateNames = dirMatch(frontendDir + '/templates', 'html')
  var templates = ''
  templateNames.forEach(function(n) {
    templates += '\n<script type="text/template" id="' + n + '-template">\n'
      + fs.readFileSync(frontendDir + '/templates/' + n + '.html') + '\n'
      + '</script>\n'
  })
  return templates
}

// Main HTML file for backbone app
//  - mounted at several URL locations
var renderBackboneApp = function(req, res) {
  res.render(
    'index'
  , {
      layout: false
    , err: null
    , templates: loadTemplates()
    , jsFilesHTML: jsFilesHTML
    }
  )
}

// Backbone App

backboneApp = function(options) {

  var app = options.app

  var viewNames = dirMatch(frontendDir + '/views', 'js')
  var jsFiles = ['application']
      .concat(_.map(viewNames, function(n) { return "views/" + n }))
      .concat(['main'])
  jsFiles.forEach( function(scriptName) {
    jsFilesHTML += '<script src="/' + scriptName + '.js" '
      +'type="text/javascript" charset="utf-8"></script>' + '\n'
    app.get('/' + scriptName + '.js', function(req, res) {
      var path = frontendDir + '/' + scriptName + '.js'
      fs.stat(path, function(err, stat) {
        res.setHeader('Content-Type', 'application/javascript')
        var stream = fs.createReadStream(path)
        stream.pipe(res)
      })
    })
  })

  var routes = [
    ''
  , 'login'
  ]

  routes.forEach(function(route) {
    app.get('/' + route, renderBackboneApp)
  })

}

module.exports = backboneApp


