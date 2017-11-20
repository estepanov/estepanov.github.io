// reset scroll position on reload
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
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
const arrowBounce = document.getElementById('arrowBounce')
const whatIamIcon = document.getElementById('whatIamIcon')

const whiteLine = $('#whiteLine')

const portfolioItems = $('[id=portfolio-item]').toArray()

// meteors
// const meteor1 = document.getElementById('meteor1')

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

    rgb = [
        Math.round(wPercent * 255),
        Math.round(hPercent * 255),
        180
    ]

    $('#firstName,#middleName,#lastName').css('text-shadow', '' + offset.join(' ') + ' rgb(' + rgb.join(',') + ')')
}
// not working
// const updateIcon = () => {
//     var direction, amount
//     if (wPercent >= 0.5) {
//         direction = 'left'
//     } else {
//         direction = 'right'
//     }
//     if (direction === 'left') {
//         amount = '-=' + (wPercent-0.5)*2*MAX_MOVE*10
//     } else {
//         amount = '+=' + wPercent*2*MAX_MOVE*10
//     }
//     console.log("direction:",direction,"amount",amount)
//     aniObj = {}
//     aniObj[direction] = amount
//     $('#whatIamIconWrapper').css(aniObj)
// }

/*
    ON window resize 
*/

$(window).resize(getWidth).mousemove(function(e) {
    var mouseX = e.pageX
    var mouseY = e.pageY

    wPercent = mouseX / windowWidth
    hPercent = mouseY / windowHeight

    updateLogo()
    // updateIcon()

})
.resize()

/*  
    window onload 
*/

window.onload = () => {

    var typed2 = new Typed('#typed', {
        strings: [
            // 'Dwell on the beauty of life.',
            // 'Watch the stars,',
            // 'and see yourself running with them.',
            '<i>― Marcus Aurelius (AD 180)</i>'
        ],
        typeSpeed: 80,
        backSpeed: 0,
        fadeOut: true,
        loop: false,
        onComplete: (self) => {
            // play the intro animation 
            intro.play()
        }
    })

    var spinIcon = new TimelineMax({onStart: () => {arrow.play()} })
    spinIcon.from(whatIamIcon, 4, {rotationY: 360, opacity: 0, rotation: 10 })
    spinIcon.to(whatIamIcon, 8, {rotationY: 360, yoyo: true, repeat: -1 })

    var arrow = new TimelineMax({ delay: 3, yoyo: true, repeat: -1}).pause()
    arrow.fromTo(arrowBounce, 5, { opacity: 0 }, { y: '-=50px', opacity: 0.5, clearProps: 'all' })

    var intro = new TimelineMax({ repeat: 0, delay: 1 })
    intro.pause()
    intro.to(curtain, 3, { opacity: 0, 'z-index': -13})
    intro.addLabel('nameFade')
    intro.from(firstName, 2, nameStart)
    intro.from(middleName, 2, nameStart)
    intro.from(lastName, 2, nameStart)
    intro.addLabel('buttons')
    intro.from(buttonLinks, 2, { opacity: 0 })
    intro.add(spinIcon)
}

/*
    scroll events
*/

const arrowScroll = () => {
    let y = window.scrollY
    if (y > 115) {
        // hide arrow on scorll down 
        TweenMax.to(arrowBounce, 2, { opacity: 0 })
    } else {
        // show arrow on scroll up
        TweenMax.to(arrowBounce, 2, { opacity: 0.5 })
    }
}

const nameScroll = () => {
    let y = window.scrollY
    if (y > 60) {
        // lets make the name fade
        TweenMax.to(firstName, 3, { opacity: 0, x: '-=40px'})
        TweenMax.to(middleName, 2, { opacity: 0, x: '-=40px'})
        TweenMax.to(lastName, 1, { opacity: 0, x: '-=40px'})

        // lets make the buttons drop and fade out
        TweenMax.to(buttonLinks, 3, { opacity: 0, y: '80'})
    } else {
        // lets bring the name back
        TweenMax.to(firstName, 2, nameEnd)
        TweenMax.to(middleName, 2, nameEnd)
        TweenMax.to(lastName, 2, nameEnd)

        // lets make the buttons fly up and fade in
        TweenMax.to(buttonLinks, 3, { opacity: 1, y: '20'})
    }
}

const iconScroll = () => {
    let y = window.scrollY
    if (y > 200) {
        // hide the icon and rotate it downwards
        TweenMax.to(whatIamIcon, 2, {opacity: 0, rotation: -180 } )
    } else {
        TweenMax.to(whatIamIcon, 2, {opacity: 1, rotation: 0 } )
    }
}

const portfolioItemsScroll = () => {
    let y = window.screenY
    console.log(portfolioItems)
    portfolioItems.forEach(item => {

        item = $(item)
        const top = item.position().top
        const bottom = top + item.height()
        const bufferArea = windowHeight * 0.1

        if(top >= y + windowHeight - bufferArea) {
            console.log("trigger",item[0])
            TweenMax.from(item[0], 10, { rotationY: 180 })
        } 


        console.log("windowWidth",)
        console.log('items top', top)
        console.log('items bottom', bottom)
    })
}

window.addEventListener('scroll', () => {
    console.log('yoooooooooo top of window', window.scrollY)
    arrowScroll()
    nameScroll()
    iconScroll()
    portfolioItemsScroll()
    // whiteLineScroll()
})
