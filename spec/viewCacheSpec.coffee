describe "Marowak.ViewCache", ->
  beforeEach ->
    @cache = new Marowak.ViewCache
    @view = new Backbone.View

    @cid = 1
    @cache.add @cid, @view

  describe "#fetch", ->
    it 'retrieves a view by a corresponding id', ->
      expect(@cache.fetch(@cid)).toBe @view

  describe "#remove", ->
    it 'deletes a view from the cache by an id', ->
      @cache.remove @cid

      expect(@cache.fetch(@cid)).toBe undefined

  describe "#clear", ->
    it 'clears the whole cache', ->
      @cache.clear()

      expect(_.isEmpty(@cache.cache)).toBe true
