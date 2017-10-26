/**
Write a function that takes a string of braces, and determines if the order of the braces is valid. It should return true if the string is valid, and false if it's invalid.

This Kata is similar to the Valid Parentheses Kata, but introduces new characters: brackets [], and curly braces {}. Thanks to @arnedag for the idea!

All input strings will be nonempty, and will only consist of parentheses, brackets and curly braces: ()[]{}.

What is considered Valid?

A string of braces is considered valid if all braces are matched with the correct brace.

Examples

"(){}[]"   =>  True
"([{}])"   =>  True
"(}"       =>  False
"[(])"     =>  False
"[({})](]" =>  False
*/


function validBraces(braces) {
    let passed = true
    const openers = "({["
    const closers = ")}]"
    let nowOpen = []
    let workingArr = braces.split("")
    workingArr.forEach(brace => {
        console.log("===========================")
        console.log("now looking at brace:",brace)
        if (openers.indexOf(brace) >= 0) {
            console.log(brace,"is an opener and has been pushed")
            nowOpen.push(brace)
        } else {
            console.log(brace,"is a closer and should match the last opened brace")
            const lastOpener = nowOpen[nowOpen.length - 1]
            console.log("--> our last opened brace:", lastOpener)
            const expectedCloser = closers[openers.indexOf(lastOpener)]
            console.log("--> our expected closer brace:", expectedCloser)
            if (brace !== expectedCloser) {
                console.log("current brace DID NOT EQUAL expectedCloser")
                passed = false
            } else {
                console.log("current brace is the expectedCloser and the currentOpen brace has been removed")
                nowOpen.pop()
            }
        }
    })
    if (nowOpen.length) passed = false
    return passed
}

console.log('() === true :', validBraces( '()' ) === true)
console.log('[(]) === false :', validBraces( '[(])' ) === false)
