// reset scroll position on reload
window.onbeforeunload = () => {
  window.scrollTo(0, 0)
}

/*
    get and set window variables
*/
var windowWidth = window.innerWidth,
  windowHeight = window.innerHeight,
  wPercent,
  hPercent,
  rgb = [],
  offset = [],
  getWidth = () => {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  }
const MAX_MOVE = 15

/*
element definitions
*/
const curtain = document.getElementById('curtain')

const logo = document.getElementById('logo')
const firstName = document.getElementById('firstName')
const middleName = document.getElementById('middleName')
const lastName = document.getElementById('lastName')

const buttonLinks = document.getElementById('buttons')
const whatIam = document.getElementById('whatIam')

/*
    animation params
*/
const nameStart = {
  opacity: 0,
  x: -80,
  y: -20
}

const nameEnd = {
  x: 20,
  color: 'white',
  opacity: 1
}

const updateLogo = () => {
  offset = [
    Math.round(wPercent * MAX_MOVE) + 'px',
    Math.round(hPercent * MAX_MOVE) + 'px'
  ]

  rgb = [Math.round(wPercent * 255), Math.round(hPercent * 255), 180]

  $('#firstName,#middleName,#lastName').css(
    'text-shadow',
    '' + offset.join(' ') + ' rgb(' + rgb.join(',') + ')'
  )
}

/*
    ON window resize
*/

$(window)
  .resize(getWidth)
  .mousemove(function(e) {
    var mouseX = e.pageX
    var mouseY = e.pageY

    wPercent = mouseX / windowWidth
    hPercent = mouseY / windowHeight

    updateLogo()
  })
  .resize()

/*
    window onload
*/

window.onload = () => {
  var intro = new TimelineMax({ repeat: 0, delay: 1 })
  intro.to(curtain, 3, { opacity: 0, 'z-index': -13 })
  intro.addLabel('nameFade')
  intro.from(firstName, 2, nameStart)
  intro.from(middleName, 2, nameStart)
  intro.from(lastName, 2, nameStart)
  intro.addLabel('buttons')
  intro.from(buttonLinks, 2, { opacity: 0 })
  intro.from(whatIam, 3, { opacity: 0, rotationX: -90 })
}
