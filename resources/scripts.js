// eslint-disable max-statements

window.onbeforeunload = function () {
    // reset scroll position on reload
    window.scrollTo(0, 0);
}

window.onload = function() {

    var windowObj = $(window),
    w = 0,h = 0,
    rgb = [],
    offset = [],
    getWidth = function() {
        w = windowObj.width();
        h = windowObj.height();
    };


    /*
        canvas params
    */
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    /*
        element definitions
    */
    const logo = document.getElementById('logo')
    const firstName = document.getElementById('firstName')
    const middleName = document.getElementById('middleName')
    const lastName = document.getElementById('lastName')

    const buttonLinks = document.getElementById('buttons')
    const arrowBounce = document.getElementById('arrowBounce')
    const whatIamIcon = document.getElementById('whatIamIcon')

    const whiteLine = $('#whiteLine')

    windowObj.resize(getWidth).mousemove(function(e) {
        var mouseX = e.pageX
        var mouseY = e.pageY

        rgb = [
            Math.round(mouseX/w * 255),
            Math.round(mouseY/h * 255),
            180
        ];
        
        const MAX_MOVE = 15
        // console.log("fomrula ",Math.round((mouseX/w)*15))
        // console.log("w & h",w,h)
        // console.log("MouseX & mousey",mouseX,mouseY)
        // var XdW = mouseX/w
        // var YdH = mouseY/h
        // var moveX = (XdW)>=.5 ? '' : '-';
        // var moveY = (YdH)>=.5 ? '' : '-';
        // moveX = moveX + Math.round(XdW * MAX_MOVE) + "px"
        // moveY = moveY + Math.round(YdH * MAX_MOVE) + "px"
        // offset = [ moveX, moveY ]
        offset = [
            Math.round(mouseX/w * MAX_MOVE)+"px",
            Math.round(mouseY/h * MAX_MOVE)+"px"
        ]
        // $('#firstName').css('color', 'rgb('+rgb.join(',')+')');
        $('#firstName,#middleName,#lastName').css('text-shadow',''+offset.join(' ')+' rgb('+rgb.join(',')+')');
        // $('#firstName,#middleName,#lastName').css('text-shadow','4px 4px rgb('+rgb.join(',')+')');
        // $('.header>h1').css('text-shadow','4px 4px rgb('+rgb.join(',')+')');
        
        
    }).resize();

    // meteors
    // const meteor1 = document.getElementById('meteor1')

    /*
        animation params
    */
    const nameStart = {
        // rotation: -90,
        opacity: 0, // from state
        // color: 'black',
        x: -80,
        y: -20
    }

    const nameEnd = {
        x: 20,
        color: 'white',
        opacity: 1 // to end state
    }


    /*
        initial animations
    // */
    // // TweenMax.set(firstName, {rotation: -45})
    // const one = new TweenMax(firstName, 3, nameEnd)
    // const two = new TweenMax(middleName, 2, nameEnd).delay(1)
    // const three = new TweenMax(lastName, 2, nameEnd).delay(2)


    var nameScale = new TimelineMax();
    // nameScale.add(TweenMax(lastName, 2, nameEnd).delay(2)], 'start', 0.5)
    // TweenLite.to(firstName, 3, {left:100});
    // TweenLite.to(firstName, 3, {top:50, delay:1});
    // TweenLite.to(firstName, 3, {opacity:0, delay:2});
    TweenMax.from(firstName, 3, nameStart)
    TweenMax.from(middleName, 2, nameStart).delay(1)
    TweenMax.from(lastName, 2, nameStart).delay(2)

    // icon 3d
    // TweenMax.from(whatIamIcon, 4, {rotationY:360, opacity: 0, repeat: -1, yoyo: true}).delay(4)
    var spinner
    const spinWho = () => {
        spinner = new TimelineMax({repeat:-1, repeatDelay:0, yoyo: true});
        spinner.to(whatIamIcon, 8, {rotationY: 360, ease: Power2.easeInOut})
    }
    
    TweenMax.from(whatIamIcon, 4, {rotationY:360, opacity: 0, onComplete: spinWho}).delay(4)
    // spinner.add( TweenMax.to(whatIamIcon, 4, {rotationZ:360}) )
    // spinner.repeat(-1)

    // commet :
    // var meteor1Animation = TweenMax.fromTo(meteor1, 60, { right: -300, top: 400}, { left: -100, top: 300, rotation: -360 })

    TweenMax.from(buttonLinks, 4, { opacity: 0 }).delay(10)
    var arrBounceAnimation
    const bounceStart = () => {
        arrBounceAnimation = new TimelineMax({yoyo: true, repeat:-1, clearProps:"all" });
        // const up = new TweenMax(arrowBounce, 3, {y: '+=50px', opacity: .25, yoyo: true, repeat:-1 }).delay(14)
        // const up = new .delay(14)
        // const down = new TweenMax(arrowBounce, 0, {clearProps:"all"})
        // arrBounceAnimation.from(arrowBounce,1, {opacity: 0} )
        arrBounceAnimation.to(arrowBounce, 5, {y: '-=50px', opacity: .25, scale:1})
        // arrBounceAnimation.add(down)
        // arrBounceAnimation.repeat(-1)
    }
    TweenMax.fromTo(arrowBounce, 2, { opacity: 0 },{ opacity: .1, scale:1, onComplete: bounceStart }).delay(10)
    arrBounceAnimation = new TimelineMax({yoyo: true, repeat:-1, clearProps:"all" });
    arrBounceAnimation.to(arrowBounce, 5, {y: '-=50px', opacity: .25, scale:1})
    /*
        bounce animation
    */

    console.log('here')

    /*
        tester
    */    

    const arrowScroll = () => {
        let y = window.scrollY
        if (y > 115) {
            // hide the arrow indicator we are heading to bottom!
            arrBounceAnimation.pause()
            TweenMax.to(arrowBounce, 2, { opacity: 0, y: '-=50px' })
        } else {
            // show the arrow indicator we are coming back up
            // TweenMax.to(arrowBounce, 1, { opacity: 1, scale: 1, clearProps:"transform"})
            // arrBounceAnimation.to()
            arrBounceAnimation.play()
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
    
    const whatIamIconScroll = () => {
        let y = window.scrollY
        if (y > 200) {
            TweenMax.to(whatIamIcon, 2, {opacity: 0, rotation:-90 })
            spinner.pause()
        } else {
            TweenMax.to(whatIamIcon, 2, {opacity: 1, rotation:0 })
            spinner.play()
        }
    }

    // const whiteLineScroll = () => {
    //     let y = window.scrollY
    //     console.log("--------->",whiteLine.offset().top-300)
    //     if (y > 500 && y < whiteLine.offset().top-300) {
    //         TweenMax.to(whiteLine, 1, { opacity: 1 })
    //     } else {
    //         TweenMax.to(whiteLine, 1, { opacity: 0})
    //     }
    // }

    // function dropMeteor1 () {
    //     console.log("meteorclicked")
    //     // meteor1Animation.pause()
    //     console.log(meteor1Animation)
    //     // TweenMax.to(meteor1, 10, { bottom: -200})
    //     meteor1Animation.kill({right: true, top: true, left: true})
    //     meteor1Animation.updateTo({ x: "-=300"}, true)
    //     // meteor1Animation.play()
    // }

    // meteor1.addEventListener("click", dropMeteor1);

    window.addEventListener("scroll", () => {
        console.log("yoooooooooo",window.scrollY)
        arrowScroll()
        nameScroll()
        whatIamIconScroll()
        // whiteLineScroll()
    });

    
}



// $(document).ready(function(){
//     let ticking = false;
//     // $(window).on('scroll', scrollActions)
//     // // $(window).on('scroll resize', scrollActions)
//     // $(window).trigger('scroll');

//     var $animation_elements = $('li')
//     // console.log($animation_elements)

//     function scrollActions() {
//         var window_height = $(window).height()
//         var window_top_position = $(window).scrollTop()
//         var window_bottom_position = (window_top_position + window_height)


//         console.log("top::::", $(window).scrollTop())

//         $.each($animation_elements, function() {
//             var $element = $(this)
//             var element_height = $element.outerHeight()
//             var element_top_position = $element.offset().top
//             var element_bottom_position = (element_top_position + element_height)

//             console.log("element top", element_top_position)
//             console.log("element bottom", element_bottom_position)
//             //check to see if this current container is within viewport
//             if ((element_bottom_position <= window_bottom_position) &&
//               (element_top_position >= window_top_position)) {
//               $element.addClass('in-view')
//             } else {
//               $element.removeClass('in-view')
//             }
//         })
//     }

//     $("button").click(function(){
//         $("li").animate({
//             height: '+=500px',
//             width: '+=500px'
//         })
//     })

//     window.addEventListener("scroll", () => {
//         // console.log("scroll")

//         scrollActions()
//         // if (!ticking) {
//         //   window.requestAnimationFrame(scrollActions)
//         //   ticking = true
//         // }
//     })
//     scrollActions()
// })

