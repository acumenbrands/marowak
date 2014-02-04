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
    }
  }

  return ViewCache;
})();

Marowak.CollectionView = Backbone.View.extend({

  initialize: function(options) {
    this.memberView = options.memberView;
    this._cache = new Marowak.ViewCache()
  },

  append: function(model) {
    this.el.appendChild(
      this._memberViewFor(model).render().el
    )
  },

  removeChild: function(model) {
    var id = model.cid

    this._cache.fetch(id).$el.remove()
    this._cache.remove(id)
  },

  render: function() {
    this.el.innerHTML = ""
    this.el.appendChild(this._membersFragment())
    return this
  },

  _memberViewFor: function(model) {
    view = new this.memberView({model: model})
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
    return _.pluck(this._memberViews(), "el")
  },

  _memberViews: function() {
    var _this = this

    return this.collection.map(function(model) {
        return _this._memberViewFor(model).render()
      }
    )
  }

})

if (module && module.exports) {
  module.exports = Marowak
}
