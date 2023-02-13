let mapY = 0
let y = 0
let x = 0
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
basic.forever(function () {
    x = pins.analogReadPin(AnalogPin.P1)
    mapX = Math.map(x, 0, 1023, 0, 45)
    radio.sendValue("x", mapX)
    serial.writeValue("x", x)
    serial.writeValue("mapX", mapX)
    y = pins.analogReadPin(AnalogPin.P2)
    mapY = Math.map(y, 0, 1023, 0, 255)
    radio.sendValue("y", mapY)
    serial.writeValue("y", y)
    serial.writeValue("mapY", mapY)
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
