let x = 0
let m2 = 0
let m1 = 0
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
m1 = mapY
    m2 = mapY
    x = pins.analogReadPin(AnalogPin.P2)
    if (x > 512) {
        m1 += 0 - Math.map(x, 512, 1023, 0, 255)
    }
    if (x < 512) {
        m2 += 0 - Math.map(x, 0, 512, 0, 255)
    }
    serial.writeValue("m1", m1)
    radio.sendValue("m1", m1)
    radio.sendValue("m2", m2)
})
