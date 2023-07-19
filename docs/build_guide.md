# Tern Build Guide

This is a very standard build, the only gotcha is that the key spacing is only for ChosFox CFX keycaps. MBK keycaps will not work, they're too wide.

## Parts List

### Required Parts

| Description          | Quantity | Notes                                                    |
| -------------------- | -------- | -------------------------------------------------------- |
| Tern PCB             | 1        | See gerbers.zip                                          |
| Seeed XIAO           | 1        | You can use either the BLE version or the RP2040 version |
| Choc hotswap sockets | 30       |                                                          |
| 1N4148W Diodes       | 30       | SOD-123 surface mount package                            |
| Choc v1 switches     | 30       |                                                          |
| Chosfox CFX keycaps  | 30       |                                                          |

### Optional Parts

| Description        | Quantity | Notes                                                        |
| ------------------ | -------- | ------------------------------------------------------------ |
| Controller sockets | 2        | Supports Mill Max sockets such as 315-43-114-41-001000 and also supports Peel-A-Way super duper low profile sockets |

### Case Parts

| Description           | Quantity | Notes                                                        |
| --------------------- | -------- | ------------------------------------------------------------ |
| Top plate             | 1        | 1/16" acrylic, see `case/switch_plate.pdf`                   |
| Top gasket            | 1        | 0.6mm silicone sheet, such as silicone placemats from [Amazon](https://www.amazon.com/dp/B088LKLSTG), see `case/top_gasket.pdf` |
| Controller cover      | 1        | 1/8" acrylic, see `case/mcu_cover.pdf`                       |
| Bottom foam           | 1        | 1mm self-adhesive EVA foam                                   |
| M2 6mm screws         | 6        | Four for the controller cover, two for the top plate         |
| M2 thin nuts          | 2        | For the top plate                                            |
| M2 8mm standoffs      | 2        | For the controller cover                                     |
| 6mm x 2mm bumper feet | 10       |                                                              |

## PCB Assembly

I assembled it in this order:

- Hotswap sockets
- Controller sockets
- Diodes

## Firmware

Electrically-speaking, this keyboard is a Hummingbird, so you can treat it just like the Hummingbird to compile your keymap. I know ZMK has Hummingbird support baked in, not sure about QMK (presumably it does too).

However, I use my pinky columns as "home-bottom" rather than the Hummingbird's "top-home." If you are like me, then your keymap will look a bit strange using the hummingbird's config because the pinky column will have to be shifted up one row in the keymap file. If this bothers you, then you can use the tern shield definition in this repo to correct that, so the location of the keys in your keymap will match their location in physical space. This config is literally identical to the Hummingbird config in the ZMK repo, except that I changed the mapping of the matrix in the overlay.

```shell
# Copy the contents of firmware/zmk to your zmk-config/config/boards/shields/tern
cp -R ./firmware/zmk /path-to/zmk-config/config/boards/shields/tern
# Copy the default keymap into your config directory to get started
cd /path-to/zmk-config/config
cp boards/shields/tern/tern.keymap .
touch tern.conf
```

## Case

### Laser Cutting

The case is optional and intended to be laser cut. The order of assembly should be as follows

- The switchplate is purely cosmetic but looks nice, and should be laser cut from 1/16" acrylic.
- Silicone gasket should be cut from 0.6mm silicone sheet, I use placemats from Amazon
- Controller cover can be cut from whatever you like, I use 1/8" acrylic
- Bottom foam should be cut from 1mm self-adhesive EVA foam. You can also use 2mm if you prefer but it will extend slightly below the hotswap sockets. When laser cutting, the adhesive side should be facing down.

## Assembly

1. Remove the switch holes from the silicone gasket. These are held in place by tiny little tabs to keep them from blowing around and getting into mischief during laser cutting. Just gently pop them off with your fingers.
2. Lay the gasket on the PCB
3. Place the switchplate on
4. Gently attach the switchplate to the PCB with a 6mm M2 screw and a low profile nut on the underside. If you are using the `v0.1` PCB, I forgot to metal plate these mounting holes on the PCB, so be gentle when you tighten this nut. (I'll fix this in `v1`.) It doesn't need to be super tight, it's really there just to register everything in the right place.
5. Install the switches. Sometimes the switch plate fitment can be a bit tight. Just go easy and they will all click in.
6. Install the controller cover
7. Flip it over, and carefully install the bottom foam. Use the hotswap sockets as a guide to register it in place.
8. Finally, install the 6mm x 2mm clear bumpon feet, using the bottom foam's circular cutouts to locate them.
