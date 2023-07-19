/* From MountingHole_2.2mm_M2 and MountingHole_2.2mm_M2_Pad
 *  [link](https://kicad.github.io/footprints/MountingHole)
 */

module.exports = {
    params: {
        designator: 'PAD',
        plated: false,
    },
    body: p => `

    (module MountingHole_2.2mm_M2${p.plated ? '_Pad' : ''} (layer F.Cu) (tedit 56D1B4CB)
        (descr "Mounting Hole 2.2mm, ${p.plated ? '' : 'no annular,'} M2")
        (tags "mounting hole 2.2mm ${p.plated ? '' : 'no annular'} m2")
        (attr virtual)

        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 -3.2) (layer F.SilkS) ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text value ${'""' /* MountingHole_2.2mm_M2 */} (at 0 3.2) (layer F.Fab) hide
            (effects (font (size 1 1) (thickness 0.15)))
        )

        (fp_circle (center 0 0) (end 2.2 0) (layer Cmts.User) (width 0.15))
        (fp_circle (center 0 0) (end 2.45 0) (layer F.CrtYd) (width 0.05))
        ${p.plated ? `
            (pad "" thru_hole circle (at 0 0) (size 4.4 4.4) (drill 2.2) (layers *.Cu *.Mask))
        ` : `
            (pad "" np_thru_hole circle (at 0 0) (size 2.2 2.2) (drill 2.2) (layers *.Cu *.Mask))
        `}
    )

    `
}
