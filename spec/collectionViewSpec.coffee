describe "Bifida.CollectionView", ->

  describe "#render", ->

    beforeEach ->
      @memberView = Backbone.View
      @collection = new Backbone.Collection(
        [ { "foo": "bar"}, {"bar": "baz"} ]
      )
      @cv = new Bifida.CollectionView
        memberView: @memberView
        collection: @collection

    it "instantiates a @memberView for each member of @collection", ->

    it "renders each @memberView instance", ->

    it "appends each @memberView's el to a document fragment", ->

    it "appends the document fragment to its own el", ->
