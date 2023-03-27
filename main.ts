let x = 0
let right = 0
let left = 0
let y = 0
let mapY = 0
basic.showLeds(`
    # # # # #
    . . # . .
    . . # . .
    . . # . .
    . . # . .
    `)
radio.setGroup(1)
let button = 90
let mapX = 90
let forward = true
basic.forever(function () {
    mapY = 0
    y = pins.analogReadPin(AnalogPin.P1)
    forward = y > 512
    if (y < 510) {
        y = 512 - y
    } else if (y > 514) {
        y = y - 512
    } else {
        y = 0
    }
    mapY = Math.map(y, 0, 512, 0, 255)
    mapY = forward ? mapY : -1 * mapY;
left = mapY
    right = mapY
    x = pins.analogReadPin(AnalogPin.P2)
    if (x > 512) {
        left += 0 - Math.map(x, 512, 1023, 0, 255)
    }
    if (x < 512) {
        right += 0 - Math.map(x, 0, 512, 0, 255)
    }
    serial.writeValue("left", left)
    radio.sendValue("left", left)
    radio.sendValue("right", right)
    radio.sendValue("steering", x)
})
