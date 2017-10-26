// reset scroll position on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

/*
    get and set window variables
*/
var windowObj = $(window),
w = 0,h = 0,
windowWidth = window.innerWidth,
windowHeight = window.innerHeight
rgb = [],
offset = [],
getWidth = function() {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    w = windowObj.width()
    h = windowObj.height()
}


$(window).resize(getWidth).mousemove(function(e) {
    var mouseX = e.pageX
    var mouseY = e.pageY

    rgb = [
        Math.round(mouseX/w * 255),
        Math.round(mouseY/h * 255),
        180
    ];
    
    const MAX_MOVE = 15
    offset = [
        Math.round(mouseX/w * MAX_MOVE)+"px",
        Math.round(mouseY/h * MAX_MOVE)+"px"
    ]
    
    $('#firstName,#middleName,#lastName').css('text-shadow',''+offset.join(' ')+' rgb('+rgb.join(',')+')');
    
}).resize();

window.onload = function() {
    var typed2 = new Typed('#typed', {
        strings: [
            'knock knock'
        ],
        typeSpeed: 100,
        backSpeed: 0,
        fadeOut: true,
        loop: false,

    });

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


    /*
        initial animations
    */

    var intro = new TimelineMax({ repeat: 0, delay: 3 })
    intro.to(curtain, 3, { opacity: 0, 'z-index': -13})
    intro.addLabel('nameFade')
    intro.from(firstName, 3, nameStart)
    intro.from(middleName, 2, nameStart)
    intro.from(lastName, 2, nameStart)
    intro.addLabel('buttons')
    intro.from(buttonLinks, 4, { opacity: 0, delay:2 })

    var spinIcon = new TimelineMax({ delay: 8 })
    spinIcon.from(whatIamIcon, 4, {rotationY:360, opacity: 0 })
    spinIcon.to(whatIamIcon, 8, {rotationY: 360, yoyo: true, repeat: -1})

    // intro.addLabel('arrows')
    // intro.fromTo(arrowBounce, 2, { opacity: 0 },{ opacity: .1, scale:1})

    var arrow = new TimelineMax({ delay: 10, yoyo: true, repeat:-1  })
    arrow.fromTo(arrowBounce, 5, { opacity: 0 }, { y: '-=50px', opacity: .5, clearProps:"all" })

    /*
        tester
    */    

    const arrowScroll = () => {
        let y = window.scrollY
        if (y > 115) {
            // hide the arrow indicator we are heading to bottom!
            // arrBounceAnimation.pause()
            TweenMax.to(arrowBounce, 2, { opacity: 0 })
        } else {
            // show the arrow indicator we are coming back up
            TweenMax.to(arrowBounce, 2, { opacity: .5 })
            // arrBounceAnimation.to()
            // arrBounceAnimation.play()
        }
    }

    const nameScroll = () => {
        let y = window.scrollY
        if (y > 60) {
            // lets make the name fade
            TweenMax.to(firstName, 3, { opacity: 0, x:'-=40px'})
            TweenMax.to(middleName, 2, { opacity: 0, x:'-=40px'})
            TweenMax.to(lastName, 1, { opacity: 0, x:'-=40px'})
        } else {
            // lets bring the name back
            TweenMax.to(firstName, 2, nameEnd)
            TweenMax.to(middleName, 2, nameEnd)
            TweenMax.to(lastName, 2, nameEnd)
        }
    }
    
    const iconScroll = () => {
        let y = window.scrollY
        if (y > 200) {
            TweenMax.to(whatIamIcon, 2, {opacity: 0, rotation:-90 })
        } else {
            TweenMax.to(whatIamIcon, 2, {opacity: 1, rotation:0 })
        }
    }

    window.addEventListener("scroll", () => {
        console.log("yoooooooooo",window.scrollY)
        arrowScroll()
        nameScroll()
        iconScroll()
        // whiteLineScroll()
    });
}