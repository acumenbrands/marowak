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

  initialize: function(options) {
    this.memberView = options.memberView;
    this._cache = new Marowak.ViewCache()
    this.listenTo(this.collection, "add", function(model){
      this.append(model)
    })
    this.listenTo(this.collection, "remove", function(model){
      this.removeChild(model)
    })
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
    this._cache.clear()
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

if (typeof module != "undefined" && module.exports) {
  module.exports = Marowak
}
