/** 
  * Bonus features that can be layered with the choc footprint from ergogen
  *
  * Outline and silk screen came from
  * https://github.com/daprice/keyswitches.pretty/blob/49083b8f0d1c8a68a1b5c4ac9bc81b3870e9aa68/Kailh_socket_PG1350.kicad_mod
  *
  * ## Params:
  * outline: nice outline with LED cutout
  * hotswap_silk_screen: nice silk screen
  * corner_feet: little nubbins on the bottom corners of the switch
  * bottom_plate_cutout: polygon for cutting out the bottom plate, Horizon-style
  * via_from/to: vias near the smd pads for easier routing
  */

module.exports = {
    params: {
        designator: 'SB', // for switch bonus
        from: '',
        to: '',
        reverse: false,
        outline: false,
        corner_feet: false,
        hotswap_silk_screen: false,
        bottom_plate_cutout: false,
        via_from: false,
        via_to: false
    },
    body: p => `

    (module ChocBonusGoodies (layer F.Cu) (tedit 56D1B4CB)
        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 -3.2) (layer F.SilkS) ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )

        ${maybe(outline, p.outline)}

        ${maybe(corner_feet, p.corner_feet)}

        ${maybe(() => hotswap_silk_screen('-', '', 'B'), p.hotswap_silk_screen)}
        ${maybe(() => hotswap_silk_screen('', '-', 'F'), p.hotswap_silk_screen && p.reverse)}

        ${maybe(hotswap_plate_cutout, p.bottom_plate_cutout)}

        ${maybe(() => vias(p), p.via_from || p.via_to)}
    )
    `

}

const maybe = (fn, cond) => cond ? fn() : ''

const outline = () => `
    ${'' /* user outline */}
    (fp_line (start -2.6 6.3) (end 2.6 6.3) (layer Eco2.User) (width 0.15))
    (fp_line (start -6.9 6.9) (end 6.9 6.9) (layer Eco2.User) (width 0.15))
    (fp_line (start 2.6 3.1) (end 2.6 6.3) (layer Eco2.User) (width 0.15))
    (fp_line (start -2.6 3.1) (end -2.6 6.3) (layer Eco2.User) (width 0.15))
    (fp_line (start -6.9 6.9) (end -6.9 -6.9) (layer Eco2.User) (width 0.15))
    (fp_line (start 2.6 3.1) (end -2.6 3.1) (layer Eco2.User) (width 0.15))
    (fp_line (start 6.9 -6.9) (end -6.9 -6.9) (layer Eco2.User) (width 0.15))
    (fp_line (start 6.9 -6.9) (end 6.9 6.9) (layer Eco2.User) (width 0.15))
`
const corner_feet = () => `
    (fp_circle (center 5.25 5.8) (end 5.75 5.8) (layer Dwgs.User) (width 0.15))
    (fp_circle (center -5.25 5.8) (end -5.75 5.8) (layer Dwgs.User) (width 0.15))
    (fp_circle (center -5.25 -5.8) (end -5.75 -5.8) (layer Dwgs.User) (width 0.15))
    (fp_circle (center 5.25 -5.8) (end 5.75 -5.8) (layer Dwgs.User) (width 0.15))
`

const hotswap_silk_screen = (def_neg, def_pos, def_side) => `
    (fp_line (start ${def_pos}7 -5.6) (end ${def_pos}7 -6.2) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_neg}1.5 -3.7) (end ${def_pos}1 -3.7) (layer ${def_side}.SilkS) (width 0.15))
    (fp_arc  (start ${def_pos}1 -2.2) (end ${def_pos}2.5 -2.2) (angle ${def_neg}90) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_pos}1.5 -8.2) (end ${def_pos}2 -7.7) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_pos}2 -6.7) (end ${def_pos}2 -7.7) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_pos}7 -6.2) (end ${def_pos}2.5 -6.2) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_neg}2 -4.2) (end ${def_neg}1.5 -3.7) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_neg}2 -7.7) (end ${def_neg}1.5 -8.2) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_neg}1.5 -8.2) (end ${def_pos}1.5 -8.2) (layer ${def_side}.SilkS) (width 0.15))
    (fp_arc  (start ${def_pos}2.5 -6.7) (end ${def_pos}2 -6.7) (angle ${def_neg}90) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_pos}2.5 -2.2) (end ${def_pos}2.5 -1.5) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_pos}2.5 -1.5) (end ${def_pos}7 -1.5) (layer ${def_side}.SilkS) (width 0.15))
    (fp_line (start ${def_pos}7 -1.5) (end ${def_pos}7 -2) (layer ${def_side}.SilkS) (width 0.15))
  ` 

const hotswap_plate_cutout = () => {
    const layer = "B.Adhes"
    const offset = 0.1

    const mirror = 1 // or -1
    const points = [
      {x: -4.575, y: -7.250, dx: -1, dy: -1}, // pad1 tl
      {x: -2.00, y: -7.250, dx: -8, dy: -1},    // pad1 tr
      {x: -2.00, y: -7.7, dx: -8, dy: -3},  // pad1
      {x: -1.50, y: -8.2, dx: -8, dy: -3},  // pin1 top
      {x: 1.5, y: -8.2, dx: 3, dy: -3},
      {x: 2, y: -7.7, dx: 3, dy: -3},
      {x: 2, y: -6.7, dx: 3, dy: -5}, // top corner
      {x: 2.5, y: -6.2, dx: 5, dy: -3}, // top corner
      {x: 7, y: -6.2, dx: 8, dy: -3}, // pin2 top
      {x: 7, y: -5.05, dx: 8, dy: -1}, // pad2 tl
      {x: 9.575, y: -5.05, dx: 1, dy: -1}, // pad2 tr
      {x: 9.575, y: -2.45, dx: 1, dy: 1}, // pad2 br
      {x: 7, y: -2.45, dx: 8, dy: 1}, // pad2 bl
      {x: 7, y: -1.5, dx: 8, dy: 3}, // pin2 bot
      {x: 2.5, y: -1.5, dx: -3, dy: 3}, //
      {x: 2.5, y: -2.2, dx: -3, dy: 3}, // bot corner
      {x: 2.3, y: -2.95, dx: -3, dy: 3}, // bot corner
      {x: 1.75, y: -3.5, dx: -3, dy: 3}, // bot corner
      {x: 1, y: -3.7, dx: -3, dy: 3}, // bot corner
      {x: -1.5, y: -3.7, dx: -8, dy: 3}, // pin1 bot
      {x: -2.00, y: -4.2, dx: -8, dy: 3}, //
      {x: -2.00, y: -4.65, dx: -8, dy: 1}, // pad1 br
      {x: -4.575, y: -4.65, dx: -1, dy: 1}, // pad1 bl
    ]

    const point_list = points
      .map( ({x, y, dx, dy} = p) => ({x: x + dx * offset, y: y + dy * offset}) )
      .map( ({x, y}) => ({x: mirror * x, y}) )
      .map( ({x, y}) => `(xy ${x} ${y})` )
      .join(" ")

    return `
        (fp_poly (pts ${point_list}) (layer ${layer}) (width 0.15))

        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers ${layer}))

        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers ${layer}))
        (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers ${layer}))
    `
}

const vias = (p) => {
    const {def_neg, def_pos} = p.reverse ? {def_neg: '', def_pos: '-'} : {def_neg: '-', def_pos: ''}

    return `
        ${p.via_from ?
            `(pad 3 thru_hole circle (at ${def_neg}3.275 -3.9 ${p.rot}) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.from.str})` : ''}
        ${p.via_to ?
            `(pad 4 thru_hole circle (at ${def_pos}8.275 -1.55 ${p.rot}) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.to.str})` : '' }
    `
}
