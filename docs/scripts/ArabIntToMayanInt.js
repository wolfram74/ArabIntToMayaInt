var ArabIntToMayanInt = (function(){
  var API = {}
  var svgNS = 'http://www.w3.org/2000/svg'
  var glyphSize = 100 // everything relative to that, auto-scales
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
    // each row is 25%
    // markings occupy 2/3 of a row
    // bar x is 5%
    // bar y would be .25/6 + y
    // document.createElementNS(, 'circle')
    var terms = mayStr.split('')
    // console.log(terms)
    var index = terms.length-1
    var row = 0
    var col = 0
    var glyph = document.createElementNS(svgNS,'svg')
    var barWidth = '90%'
    var barHeight = '15.6%'
    var dotRad = 7.8
    glyph.setAttribute('height', glyphSize)
    glyph.setAttribute('width', glyphSize)
    var background = document.createElementNS(svgNS, 'rect')
    background.setAttribute('x', '1%')
    background.setAttribute('y', '1%')
    background.setAttribute('rx', '10%')
    background.setAttribute('ry', '10%')
    background.setAttribute('width', '98%')
    background.setAttribute('height', '98%')
    background.setAttribute('fill', 'gray')
    glyph.append(background)
    while(index >=0){
      var type = terms[index]
      var yTop = 2+(3-row)*24
      // console.log(yTop)
      if(type =='b'){
        col = 0
        var el = document.createElementNS(svgNS, 'rect')
        el.setAttribute('x', '5%')
        el.setAttribute('y', `${yTop+25/6}%`)
        el.setAttribute('width', barWidth)
        el.setAttribute('height', barHeight)
        el.setAttribute('rx', '10%')
        el.setAttribute('ry', '50%')
        row += 1
      }
      if(type =='d'){
        var el = document.createElementNS(svgNS, 'circle')
        var dotRoom = (98)/4
        el.setAttribute('cx', `${5+dotRad+col*dotRoom}%`)
        el.setAttribute('cy', `${yTop+25/2}%`)
        el.setAttribute('r', `${dotRad}%`)
        col+=1
      }
      if(type == 'o'){

      }
      glyph.append(el)
      index -= 1
    }
    return glyph
  }

  API.toVGlyph = function(number){
    var stringVal = API.toString(number)
    var stringArray = stringVal.split(',')
    // console.log(stringArray)
    var vertGlyph = document.createElementNS(svgNS,'svg')
    vertGlyph.setAttribute('width', glyphSize)
    vertGlyph.setAttribute('height', glyphSize*stringArray.length)
    for(var index = 0; index < stringArray.length; index++){
      var glyph = API.makeGlyph(stringArray[index])
      glyph.setAttribute('y', glyphSize*index)
      vertGlyph.append(glyph)
    }
    return vertGlyph
  }

  API.toHGlyph = function(number){
    var stringVal = API.toString(number)
    var stringArray = stringVal.split(',')
    // console.log(stringArray)
    var horizontalGlyph = document.createElementNS(svgNS,'svg')
    horizontalGlyph.setAttribute('width', glyphSize*stringArray.length)
    horizontalGlyph.setAttribute('height', glyphSize)
    for(var index = 0; index < stringArray.length; index++){
      var glyph = API.makeGlyph(stringArray[index])
      glyph.setAttribute('x', glyphSize*index)
      horizontalGlyph.append(glyph)
    }
    return horizontalGlyph
  }
  return API
})()
