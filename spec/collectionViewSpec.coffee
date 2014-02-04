describe "Marowak.CollectionView", ->

  beforeEach ->
    @memberView = Backbone.View.extend({
      tagName: "li"
      render: ->
        @$el.data("cid": @model.cid)
        @el.innerHTML = @model.get "foo"
        @
    })
    @rawModelJson = [ { "foo": "bar" }, { "foo": "baz" } ]
    @collection = new Backbone.Collection(@rawModelJson)
    @cv = new Marowak.CollectionView
      memberView: @memberView
      collection: @collection

  describe "#append", ->

    it "renders a single view for a given model", ->
      @cv.append new Backbone.Model foo: 'New Item'

      expect(@cv.el.innerHTML).toMatch(/New Item/)

  describe "#removeChild", ->

    it "remove the view from the dom", ->
      model = new Backbone.Model foo: 'kung'
      @cv.append model
      @cv.removeChild(model)

      expect(@cv.el.innerHTML).not.toMatch(/kung/)


  describe "#render", ->

    it "appends the document fragment to its own el", ->
      expectedMembers = @cv._memberElements()
      @cv.render()
      children = (child.outerHTML for child in @cv.el.children)

      for expectedChild, childIdx in expectedMembers
        expect(children).toContain(expectedChild.outerHTML)

    it "returns a reference the view", ->
      expect(@cv.render()).toEqual(@cv)

  describe "#_membersFragment", ->

    it "returns a document fragment", ->
      membersFragment = @cv._membersFragment()
      expect(membersFragment instanceof window.DocumentFragment).toBeTruthy()

    it "contains each of the #_memberElements", ->
      children = @cv._membersFragment().children
      memberElements = (child.outerHTML for child in @cv._memberElements())

      for child, childIdx in children
        expect(memberElements).toContain(child.outerHTML)

  describe "#_memberElements", ->

    it "returns a collection of DOM elements", ->
      memberElements = @cv._memberElements()
      expect(memberElements[0] instanceof window.HTMLElement).toBeTruthy()

  describe "#_memberViews", ->

    it "returns an array entry for each model in the collection", ->
      memberViews = @cv._memberViews()
      expect(memberViews.length).toEqual(@rawModelJson.length)

    it "renders each member view", ->
      render_spy = spyOn(@memberView.prototype, "render").andCallThrough()
      memberViews = @cv._memberViews()
      expect(render_spy.calls.length).toEqual(@rawModelJson.length)

    it "returns an array of @memberViews", ->
      memberViews = @cv._memberViews()
      expect(memberViews[0] instanceof @memberView).toBeTruthy()
