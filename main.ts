input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showNumber(numtimes)
    basic.pause(2000)
    showDots()
})
input.onSound(DetectedSound.Loud, function () {
    if (input.lightLevel() < 50) {
        numtimes += 1
        showDots()
    }
})
input.onButtonPressed(Button.B, function () {
    numtimes = 0
    showDots()
})
function showDots () {
    basic.clearScreen()
    numLines = Math.floor(numtimes / 5)
    serial.writeValue("numtimes", numtimes)
    serial.writeValue("numLines", numLines)
    serial.writeValue("remainder", numtimes % 5)
    if (numLines != 0) {
        for (let Y = 0; Y <= numLines - 1; Y++) {
            for (let index = 0; index <= 4; index++) {
                led.plot(index, Y)
            }
        }
    }
    for (let X = 0; X <= numtimes % 5 - 1; X++) {
        led.plot(X, numLines)
    }
}
let numLines = 0
let numtimes = 0
input.setSoundThreshold(SoundThreshold.Loud, 75)
numtimes = 0
basic.forever(function () {
    serial.writeValue("light", input.lightLevel())
})
