module.exports = {
  params: {
      designator: 'D',
      through_hole: true,
      via_from: false,
      via_to: false,
      front: true,
      back: true,
      from: undefined,
      to: undefined
  },
  body: p => {
    const standard = `
    (module ComboDiode (layer F.Cu) (tedit 5B24D78E)

      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* diode symbols */}
      ${ p.front ?
        `
        (fp_line (start 0.25 0) (end 0.75 0) (layer F.SilkS) (width 0.1))
        (fp_line (start 0.25 0.4) (end -0.35 0) (layer F.SilkS) (width 0.1))
        (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer F.SilkS) (width 0.1))
        (fp_line (start -0.35 0) (end 0.25 -0.4) (layer F.SilkS) (width 0.1))
        (fp_line (start -0.35 0) (end -0.35 0.55) (layer F.SilkS) (width 0.1))
        (fp_line (start -0.35 0) (end -0.35 -0.55) (layer F.SilkS) (width 0.1))
        (fp_line (start -0.75 0) (end -0.35 0) (layer F.SilkS) (width 0.1))
        ` : '' }
      ${ p.back ?
        `
        (fp_line (start 0.25 0) (end 0.75 0) (layer B.SilkS) (width 0.1))
        (fp_line (start 0.25 0.4) (end -0.35 0) (layer B.SilkS) (width 0.1))
        (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer B.SilkS) (width 0.1))
        (fp_line (start -0.35 0) (end 0.25 -0.4) (layer B.SilkS) (width 0.1))
        (fp_line (start -0.35 0) (end -0.35 0.55) (layer B.SilkS) (width 0.1))
        (fp_line (start -0.35 0) (end -0.35 -0.55) (layer B.SilkS) (width 0.1))
        (fp_line (start -0.75 0) (end -0.35 0) (layer B.SilkS) (width 0.1))
        ` : '' }

      ${ ''/* SMD pads */ }
      ${ p.front ?
        `
        (pad 1 smd rect (at -1.65 0 ${ p.rot }) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${ p.to.str })
        (pad 2 smd rect (at 1.65 0 ${ p.rot }) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${ p.from.str })
        ` : '' }

      ${ p.back ?
        `
        (pad 1 smd rect (at -1.65 0 ${ p.rot }) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${ p.to.str })
        (pad 2 smd rect (at 1.65 0 ${ p.rot }) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${ p.from.str })
        ` : '' }
    `

    const maybe_vias = p => {
      let vias = ''

      if(p.via_to) {
        vias += `
        ${''/* Vias next to smd pads */}
        (pad 3 thru_hole circle (at -2.6 1.1 ${ p.rot }) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.to.str})

        ${'' /* connect pad and via */}
        ${ p.front ? `(pad 4 smd rect (at -2.25 0.75 ${p.rot - 45}) (size 0.25 1) (layers F.Cu)  ${p.to.str})` : ''}
        ${ p.back ? `(pad 5 smd rect (at -2.25 0.75 ${p.rot - 45}) (size 0.25 1) (layers B.Cu)  ${p.to.str})` : ''}
        `
      }

      if(p.via_from) {
        vias += `
        ${''/* Vias next to smd pads */}
        (pad 6 thru_hole circle (at 2.6 1.1 ${ p.rot }) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.from.str})

        ${'' /* connect pad and via */}
        ${ p.front ? `(pad 7 smd rect (at 2.25 0.75 ${p.rot + 45}) (size 0.25 1) (layers F.Cu)  ${p.from.str})` : ''}
        ${ p.back ? `(pad 8 smd rect (at 2.25 0.75 ${p.rot + 45}) (size 0.25 1) (layers B.Cu)  ${p.from.str})` : ''}
        `
      }

      return vias
    }

    const maybe_through_holes = p => {
      if (!p.through_hole) { return '' }

      return `
        ${''/* THT terminals */}
        (pad 1 thru_hole circle (at -3.81 0 ${ p.rot }) (size 1.905 1.905) (drill 0.9906) (layers *.Cu *.Mask) ${ p.to.str })
        (pad 2 thru_hole circle (at 3.81 0 ${p.rot}) (size 1.905 1.905) (drill 0.9906) (layers *.Cu *.Mask) ${p.from.str})
      `
    }

    return `
      ${standard}
      ${maybe_vias(p)}
      ${maybe_through_holes(p)}
    )
    `
  }
}
