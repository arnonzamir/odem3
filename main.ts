let y = 0
let x = 0
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
    x = pins.analogReadPin(AnalogPin.P1)
    mapX = Math.map(x, 0, 1023, 0, 255)
    radio.sendValue("x", mapX)
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
    serial.writeValue("mapY", mapY)
    radio.sendValue("y", mapY)
    if (input.buttonIsPressed(Button.A)) {
        button += 5
        serial.writeValue("button_state", button)
        radio.sendValue("b", button)
        if (button > 180) {
            button = 180
        }
    }
    if (input.buttonIsPressed(Button.B)) {
        button += -5
        serial.writeValue("button_state", button)
        radio.sendValue("b", button)
        if (button < 0) {
            button = 0
        }
    }
})
