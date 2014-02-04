# Set up a faux-browser environment in node:
#         (really gross boilerplate, sorry)
global.jsdom = require "jsdom"
global.document = jsdom.jsdom null
global.window = document.createWindow()
global.navigator = window.navigator
global.$ = global.jQuery = require "jquery"
global._ = global.Underscore = require "underscore"
global.Backbone = require "backbone"
global.Backbone.$ = global.$

global.Marowak = require "../src/marowak.js"
