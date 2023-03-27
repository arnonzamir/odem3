let m1m3 = 0
let y = 0
basic.showLeds(`
    # # # # #
    . . # . .
    . . # . .
    . . # . .
    . . # . .
    `)
radio.setGroup(1)
let x = 0
basic.forever(function () {
    let right = 0
    y = pins.analogReadPin(AnalogPin.P1)

    m1m3 = Math.map(y, 0, 1023, -255, 255)

    x = pins.analogReadPin(AnalogPin.P2)
    x = Math.map(x, 0, 1023, -255, 255); 
    let m2 = m1m3+x
    let m4 = m1m3-x
    
    serial.writeValue("y", m1m3)
    serial.writeValue("m2", m2)
    serial.writeValue("m4", m4)
    radio.sendValue("m1m3", m1m3)
    radio.sendValue("m2", m2)
    radio.sendValue("m4", m4)
   
    radio.sendValue("steering", x)
})
