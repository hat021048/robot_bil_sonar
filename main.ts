function SvingV () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    pins.analogWritePin(AnalogPin.P8, Hastighet / 1)
    pins.analogWritePin(AnalogPin.P12, Hastighet / 8)
}
function Sonar3 () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(100)
    Avstand_H = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 3.5
}
function Sonar () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(100)
    Avstand_M = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 3.5
}
function Stopp () {
    pins.analogWritePin(AnalogPin.P8, 0)
    pins.analogWritePin(AnalogPin.P12, 0)
}
function Avstands_Mlng () {
    Sonar()
    pins.servoWritePin(AnalogPin.P0, 135)
    basic.pause(Frekvens)
    Sonar3()
    pins.servoWritePin(AnalogPin.P0, 45)
    basic.pause(Frekvens)
    Sonar2()
    pins.servoWritePin(AnalogPin.P0, 90)
    basic.pause(Frekvens)
}
function Fram () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.analogWritePin(AnalogPin.P8, Hastighet - HastighetsKorreksjon)
    pins.analogWritePin(AnalogPin.P12, Hastighet + HastighetsKorreksjon)
}
function SvingH () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    pins.analogWritePin(AnalogPin.P8, Hastighet / 8)
    pins.analogWritePin(AnalogPin.P12, Hastighet / 1)
}
function Sonar2 () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(100)
    Avstand_V = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 3.5
}
let MinsteMlteAvstand = 0
let Avstand_V = 0
let Avstand_M = 0
let Avstand_H = 0
let Frekvens = 0
let HastighetsKorreksjon = 0
let Hastighet = 0
basic.showIcon(IconNames.Yes)
Hastighet = 1023
HastighetsKorreksjon = 0
pins.servoWritePin(AnalogPin.P0, 90)
Frekvens = 1000
let MinstTlltAvstand = 200
basic.forever(function () {
    for (let index = 0; index < 6000; index++) {
        Fram()
    }
    Stopp()
    Avstands_Mlng()
    MinsteMlteAvstand = Math.min(Avstand_M, Math.min(Avstand_V, Avstand_H))
    if (MinsteMlteAvstand < MinstTlltAvstand) {
        if (Avstand_V < Avstand_H) {
            for (let index = 0; index < 3000; index++) {
                SvingH()
            }
            Stopp()
        } else {
            for (let index = 0; index < 3000; index++) {
                SvingV()
            }
            Stopp()
        }
    }
})
