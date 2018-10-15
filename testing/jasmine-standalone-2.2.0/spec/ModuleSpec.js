describe("Meta module", function() {
  it("should run tests",function(){
    expect(true).toEqual(true)
  })
});

describe('ArabIntToMayanInt', function(){
  describe('string mode', function(){
    it("should accept integers and return a set of strings", function(){
      expect( ArabIntToMayanInt.toString(7)).toEqual('ddb')
      expect( ArabIntToMayanInt.toString(4*20+7)).toEqual('dddd,ddb')
      expect( ArabIntToMayanInt.toString(11*400+4*20+7)).toEqual('dbb,dddd,ddb')
      expect( ArabIntToMayanInt.toString(11*400)).toEqual('dbb,o,o')
    })
  })

});

