// Seeed XIAO
//
// This came from [kleeb](https://github.com/crides/kleeb/blob/master/mcu.pretty/xiao-ble-smd-cutout.kicad_mod)
//
// Params
//  orientation: default is up
//    if down, power led will face the pcb
//    if up, power led will face away from pcb
//  smd_cutouts: default is false
//    if true, cutouts will be added for the backside pins on the XIAO BLE. May
//    only be used with `orientation: 'up'`
//  pogo_pins: default is false
//    if true, pogo pins will be added for the backside reset and bat+ pins on
//    the XIAO BLE. May only be used with `orientation: up`

module.exports = {
  params: {
    designator: 'MCU',
    orientation: 'up',
    smd_cutouts: false,
    pogo_pins: false,
    P0: {type: 'net', value: 'P0'},
    P1: {type: 'net', value: 'P1'},
    P2: {type: 'net', value: 'P2'},
    P3: {type: 'net', value: 'P3'},
    P4: {type: 'net', value: 'P4'},
    P5: {type: 'net', value: 'P5'},
    P6: {type: 'net', value: 'P6'},
    VUSB: {type: 'net', value: 'VUSB'},
    GND: {type: 'net', value: 'GND'},
    VCC: {type: 'net', value: 'VCC'},
    P10: {type: 'net', value: 'P10'},
    P9: {type: 'net', value: 'P9'},
    P8: {type: 'net', value: 'P8'},
    P7: {type: 'net', value: 'P7'},
    RST: {type: 'net', value: 'RST'},
    BATP: {type: 'net', value: 'BAT+'},
  },
  body: p => {
    const is_up = p.orientation == 'up'
    const {def_neg, def_pos} = is_up ? { def_neg: '-', def_pos: ''} : { def_neg: '', def_pos: '-' }

    if (!is_up) {
      if (p.smd_cutouts) { throw "!! error - seeed_xiao: smd_cutouts must be used with orientation: up" }
      if (p.pogo_pins) { throw "!! error - seeed_xiao: pogo_pins must be used with orientation: up" }
    }
    if (p.smd_cutouts && p.pogo_pins) { throw "!! error - seeed_xiao: pogo_pins and smd_cutouts cannot be used at the same time" }

    const standard = `
      (module xiao-ble (layer F.Cu) (tedit 5B307E4C)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at -19.3989 -11.28268) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* notes */}
      (fp_text user "SEEED XIAO BLE\\nSEEED XIAO RP2040\\nFACE ${is_up ? 'UP' : 'DOWN'}" (at ${def_pos}3 -4.5 ${p.rot - 90} unlocked) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify left)))

      ${''/* illustration of the (possible) USB port overhang */}
      (fp_line (start -3.81 -12.02) (end -3.81 -6.94) (layer Dwgs.User) (width 0.15))
      (fp_line (start 3.81 -12.02) (end -3.81 -12.02) (layer Dwgs.User) (width 0.15))
      (fp_line (start 3.81 -6.94) (end 3.81 -12.02) (layer Dwgs.User) (width 0.15))
      (fp_line (start -3.81 -6.94) (end 3.81 -6.94) (layer Dwgs.User) (width 0.15))

      ${''/* component outline */}
      (fp_line (start 8.89 3.545) (end 8.89 4.075) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 0.995) (end 8.89 1.525) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 6.085) (end 8.89 6.615) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 3.535) (end -8.89 4.065) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 -10.5) (end 8.89 -10.5) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 -8.6) (end -8.89 -10.5) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 -4.075) (end 8.89 -3.545) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 -6.625) (end -8.89 -6.095) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 10.5) (end -8.89 8.6) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 -10.49) (end 8.89 -8.65) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 -1.535) (end 8.89 -1.005) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 6.075) (end -8.89 6.605) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 -1.545) (end -8.89 -1.015) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 -4.085) (end -8.89 -3.555) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 -6.61) (end 8.89 -6.08) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 8.61) (end 8.89 10.5) (layer "F.SilkS") (width 0.12))
      (fp_line (start 8.89 10.5) (end -8.89 10.5) (layer "F.SilkS") (width 0.12))
      (fp_line (start -8.89 0.995) (end -8.89 1.525) (layer "F.SilkS") (width 0.12))
      (fp_rect (start -8.89 10.5) (end 8.89 -10.5) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start 3.350197 -6.785813) (end 5.128197 -4.118813) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start -3.507811 -8.182813) (end -5.285811 -10.849813) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start 3.350197 -10.849813) (end 5.128197 -8.182813) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start -5.285811 -6.785813) (end -3.507811 -4.118813) (layer "Dwgs.User") (width 0.12) (fill none))
      `
    function pins(def_neg, def_pos) {
      return `
        ${''/* extra border around pin 1, in case the rectangular shape is not distinctive enough */}
        (fp_line (start ${def_pos}6.35 -6.35) (end ${def_pos}6.35 -3.81) (layer F.SilkS) (width 0.15))
        (fp_line (start ${def_pos}6.35 -6.35) (end ${def_pos}8.89 -6.35) (layer F.SilkS) (width 0.15))
        (fp_line (start ${def_pos}6.35 -3.81) (end ${def_pos}8.89 -3.81) (layer F.SilkS) (width 0.15))

        ${''/* pin names */}
        (fp_text user "${p.P0.name}" (at ${def_neg}6.5 -7.62 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))
        (fp_text user "${p.P1.name}" (at ${def_neg}6.5 -5.08 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))
        (fp_text user "${p.P2.name}" (at ${def_neg}6.5 -2.54 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))
        (fp_text user "${p.P3.name}" (at ${def_neg}6.5 -0 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))
        (fp_text user "${p.P4.name}" (at ${def_neg}6.5 2.54 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))
        (fp_text user "${p.P5.name}" (at ${def_neg}6.5 5.08 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))
        (fp_text user "${p.P6.name}" (at ${def_neg}6.5 7.62 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'right' : 'left'} mirror)))

        (fp_text user "${p.VUSB.name}" (at ${def_pos}6.5 -7.62 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))
        (fp_text user "${p.GND.name}" (at ${def_pos}6.5 -5.08 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))
        (fp_text user "${p.VCC.name}" (at ${def_pos}6.5 -2.54 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))
        (fp_text user "${p.P10.name}" (at ${def_pos}6.5 0 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))
        (fp_text user "${p.P9.name}" (at ${def_pos}6.5 2.54 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))
        (fp_text user "${p.P8.name}" (at ${def_pos}6.5 5.08 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))
        (fp_text user "${p.P7.name}" (at ${def_pos}6.5 7.62 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify ${is_up ? 'left' : 'right'} mirror)))

        ${''/* and now the actual pins */}
        (pad 1 thru_hole oval (at ${def_neg}7.62 -7.62 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P0.str})
        (pad 2 thru_hole oval (at ${def_neg}7.62 -5.08 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P1.str})
        (pad 3 thru_hole oval (at ${def_neg}7.62 -2.54 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P2.str})
        (pad 4 thru_hole oval (at ${def_neg}7.62 0 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P3.str})
        (pad 5 thru_hole oval (at ${def_neg}7.62 2.54 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P4.str})
        (pad 6 thru_hole oval (at ${def_neg}7.62 5.08 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P5.str})
        (pad 7 thru_hole oval (at ${def_neg}7.62 7.62 ${p.rot}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P6.str})

        (pad 8 thru_hole oval (at ${def_pos}7.62 7.62 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P7.str})
        (pad 9 thru_hole oval (at ${def_pos}7.62 5.08 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P8.str})
        (pad 10 thru_hole oval (at ${def_pos}7.62 2.54 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P9.str})
        (pad 11 thru_hole oval (at ${def_pos}7.62 0 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.P10.str})
        (pad 12 thru_hole oval (at ${def_pos}7.62 -2.54 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.VCC.str})
        (pad 13 thru_hole rect (at ${def_pos}7.62 -5.08 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.GND.str})
        (pad 14 thru_hole oval (at ${def_pos}7.62 -7.62 ${p.rot + 180}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers *.Cu *.SilkS *.Mask) ${p.VUSB.str})
      `
    }

    function maybe_smd_cutouts(smd_cutouts, def_neg, def_pos) {
      return smd_cutouts ? `
        ${''/* edge cuts */}
        (fp_line (start ${def_neg}0.8382 -8.826) (end ${def_pos}0.8382 -8.826) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_neg}0.8382 -5.778) (end ${def_pos}0.8382 -5.778) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_pos}1.524 -6.4638) (end ${def_pos}1.524 -8.1402) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_neg}4.0132 -2.476) (end ${def_neg}2.413 -2.476) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_neg}2.413 -0.063) (end ${def_neg}4.0132 -0.063) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_neg}4.699 -0.7488) (end ${def_neg}4.699 -1.7902) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_neg}2.032 -2.095) (end ${def_neg}2.032 -0.444) (layer "Edge.Cuts") (width 0.12))
        (fp_line (start ${def_neg}1.524 -6.4638) (end ${def_neg}1.524 -8.1402) (layer "Edge.Cuts") (width 0.12))

        ${''/* fp_arc changed definition in kicad 5 vs 6. Ergogen is still using the v5 syntax, while the footprint uses v6 syntax. If ergogen updates to the 6 syntax this will break, but you can copy-paste the fp_arc blocks from the original footprint linked above. */ }
        ${''/* TODO this is unfinished */}
        (fp_arc (start -2.413 -0.444) (end -2.032 -0.444) (angle 90) (layer "Edge.Cuts") (width 0.12))
        (fp_arc (start 1.276 -8.578) (end 1.524 -8.1402) (angle 148.9828) (layer "Edge.Cuts") (width 0.12))

        ${''/* backside pins for battery, reset, etc */}
        (pad 15 thru_hole circle (at ${def_neg}1.27 -8.572 90) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask))
        (pad 16 thru_hole circle (at ${def_pos}1.27 -8.572 90) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask))
        (pad 17 thru_hole circle (at ${def_neg}1.27 -6.032 90) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask))
        (pad 18 thru_hole circle (at ${def_pos}1.27 -6.032 90) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask))
        (pad 19 thru_hole circle (at ${def_neg}4.445 -0.317 180) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask))
        (pad 20 thru_hole circle (at ${def_neg}4.445 -2.222 180) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask))
      ` : ``
    }
    function maybe_pogo_pins(pogo_pins, def_neg, def_pos) {
      return pogo_pins ? `
        ${''/* backside pins for battery+, reset */}
        (fp_circle (center ${def_neg}1.27 -8.572) (end ${def_neg}1.27 -7.8735) (layer "Dwgs.User") (width 0.12))
        (fp_circle (center ${def_pos}1.27 -8.572) (end ${def_pos}1.27 -7.8735) (layer "Dwgs.User") (width 0.12))
        (pad 17 thru_hole circle (at ${def_neg}1.27 -6.032 90) (size 2 2) (drill 0.7) (layers *.Cu *.SilkS *.Mask) ${p.RST.str})
        (fp_circle (center ${def_pos}1.27 -6.032) (end ${def_pos}1.27 -5.3335) (layer "Dwgs.User") (width 0.12))
 
        (pad 19 thru_hole circle (at ${def_neg}4.445 -0.317 180) (size 2 2) (drill 0.7) (layers *.Cu *.SilkS *.Mask) ${p.BATP.str})
        (fp_circle (center ${def_neg}4.445 -2.222) (end ${def_neg}4.445 -1.5235) (layer "Dwgs.User") (width 0.12))

        ${''/* pin names */}
        (fp_text user ${p.RST.name} (at ${def_neg}1.27 -4.2 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify mirror)))
        (fp_text user ${p.BATP.name} (at ${def_neg}2.0 -0.317 ${p.rot}) (layer B.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15)) (justify mirror)))
      ` : ``
    }

    return `
      ${standard}
      ${pins(def_neg, def_pos)}
      ${maybe_smd_cutouts(p.smd_cutouts, def_neg, def_pos)}
      ${maybe_pogo_pins(p.pogo_pins, def_neg, def_pos)})
      `
  }
}
