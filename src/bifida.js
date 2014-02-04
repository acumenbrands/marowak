var Marowak = { }

Marowak.CollectionView = Backbone.View.extend({

  initialize: function(options) {
    this.memberView = options.memberView;
  },

  render: function() {
    this.el.innerHTML = ""
    this.el.appendChild(this._membersFragment())
    return this
  },

  _membersFragment: function() {
    fragment = document.createDocumentFragment()
    _.each(this._memberElements(), function(el){
      fragment.appendChild(el)
    })
    return fragment
  },

  _memberElements: function() {
    return _.pluck(this._memberViews(), "el")
  },

  _memberViews: function() {
    return this.collection.map( function(model){
        return (new this.memberView({ model: model })).render()
      }.bind(this)
    )
  }

})

if (module && module.exports) {
  module.exports = Marowak
}
