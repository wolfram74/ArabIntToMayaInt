var ArabIntToMayanInt = (function(){
  var API = {}
  API.toString = function(number){
    var power = 1
    if(number===0){return 'o'}
    var output = ''
    while(number > 0){
      var remainder = number%Math.pow(20, power)
      var placeVal = remainder / Math.pow(20, power-1)
      var ones = placeVal % 5
      var fives = (placeVal-ones)/5
      if(ones===0 && fives==0){
        output = ',o' + output
        power+=1
        continue
      }
      output = ','+'d'.repeat(ones)+'b'.repeat(fives)+output
      number -= remainder
      power+=1
    }

    return output.slice(1)
  }

  API.makeGlyph = function(mayStr){
    var svgNS = 'http://www.w3.org/2000/svg'
    // document.createElementNS(, 'circle')
    var glyph = document.createElementNS(svgNS,'svg')
    glyph.setAttribute('height', '100')
    glyph.setAttribute('width', '100')
    var circle = document.createElementNS(svgNS,'circle')
    circle.setAttribute('cx',50)
    circle.setAttribute('cy',50)
    circle.setAttribute('r',25)
    circle.setAttribute('fill','black')
    glyph.append(circle)
    return glyph
  }
  return API
})()
