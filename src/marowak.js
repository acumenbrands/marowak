var Marowak = { }

Marowak.ViewCache = (function() {

  function ViewCache() {
    this.cache = {}
  }

  ViewCache.prototype = {
    add: function(id, view) {
      if (this.cache[id] === undefined) {
        this.cache[id] = view
      }
    },

    fetch: function(id) {
      return this.cache[id]
    },

    remove: function(id) {
      delete this.cache[id]
    },

    clear: function(){
      this.cache = {}
    }
  }

  return ViewCache;
})();

Marowak.CollectionView = Backbone.View.extend({
  tagName: "ul",

  initialize: function(options) {
    if(typeof options.view != "undefined"){
      this.view = options.view;
    }
    this._cache = new Marowak.ViewCache()
    this.listenTo(this.collection, "add", function(model){
      this.append(model)
    })
    this.listenTo(this.collection, "remove", function(model){
      this.render()
    })
  },

  append: function(model) {
    this.el.appendChild(
      this._viewFor(model).render().el
    )
  },

  render: function() {
    this.el.innerHTML = ""
    this._cache.clear()
    this.el.appendChild(this._membersFragment())
    return this
  },

  _viewFor: function(model) {
    view = new this.view({model: model})
    this._cache.add(model.cid, view)

    return view
  },

  _membersFragment: function() {
    fragment = document.createDocumentFragment()

    this.cache = {}
    _.each(this._memberElements(), function(el){
      fragment.appendChild(el)
    })

    return fragment
  },

  _memberElements: function() {
    return _.pluck(this._views(), "el")
  },

  _views: function() {
    var _this = this

    return this.collection.map(function(model) {
        return _this._viewFor(model).render()
      }
    )
  }

})

if (typeof module != "undefined" && module.exports) {
  module.exports = Marowak
}
