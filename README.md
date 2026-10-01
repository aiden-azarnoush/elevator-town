# Elevator Town

### ▶️ [Play it here: aiden-azarnoush.github.io/elevator-town](https://aiden-azarnoush.github.io/elevator-town/)

A simple, bright 3D elevator game for young kids (age 4+). Walk around a hotel, a parking garage or a shopping mall, call glass and solid elevators, ride between floors, ring the bell, press the emergency button and pop balloons.

> [!TIP]
> **To play:** open the link above on any computer, iPad or phone. Or download this repo and double-click `index.html`. It opens in Safari or Chrome. Internet is needed, because the 3D library (three.js) loads from cdnjs.

## Controls

| Device | Walk | Ride | Jump | Camera |
|---|---|---|---|---|
| iPad / phone | round stick (bottom-left) or tap the floor | walk to an elevator and press **Ride**, or tap the elevator | **Jump** button | swipe to turn, pinch to zoom |
| Computer | arrow keys / WASD or click the floor | **E** or **Enter**, or click the elevator | **Space** | drag to turn, scroll to zoom |

## Editing

Everything is in `index.html`. Open it in a text editor (VS Code, or TextEdit in plain-text mode) and search for:

| To change | Search for |
|---|---|
| Floor names and colors | `floors: [` |
| Elevators (name, glass/solid, color, position, floors) | `elevators: [` |
| Furniture on each floor | `decor(i, d)` |
| Walking speed | `const SPEED` |
| Balloons per floor | `F.balloons.length < 3` |

> [!NOTE]
> Floor numbers in `stops: [...]` start at 0, so `stops: [0, 3]` means the first and fourth floor.

## Publish (for me)

```bash
chmod +x publish.sh
./publish.sh
```

Written by Aiden Azarnoush · MIT License · [aiden-azarnoush.github.io](https://aiden-azarnoush.github.io)


## Interaction update — October 1, 2026

- Airport: larger cab with two fellow passengers, numbered controls inside the cab, tappable landing call panel, corrected escalator treads, open gate frames, corridor floor arrows and a boarding camera that follows the traveler toward the plane.
- Elevator Town: larger shafts and cabs with two animated fellow passengers during player rides.
- Chef: slotted spatula illustration and model; choose **REDO DISH**, then tap a cooking dish to restart it without losing other dishes or orders.
- Gas station: fixed waypoint arrival deadlock. After paying and returning to the car, tap the car to drive out. Hold the fill button with touch; keyboard/screen-reader activation toggles filling.
- Car wash: illustrated tools, captions, and direct interaction with the car/current machine.
- Rock–Paper–Scissors: photographic natural hand gestures on the choice cards and in the animated reveal, with fictional yellow human hands and articulated silver robot hands, bundled in `assets/rps-yellow-hands.png` and `assets/rps-robot-hands.png`.
- Reading-based discovery questions were removed. Existing hands-on shape, color, money and floor-number activities remain part of the games.
- Shared models have softer curves and highlighted materials. Character heads and limbs are rounded, with curved torsos. Town and airport floors use textured tiles; elevator interiors have brushed metal, handrails and ceiling lighting. Cooking surfaces use wood grain, and gas-station pavement has concrete and asphalt texture.
- Airport travelers are scaled to 72%; the jet bridge is wider and taller, with open docking frames. The camera follows inside the corridor beneath the ceiling.
- Gas-station traffic uses separate direction lanes. Swept solid bounds include turning and waypoint arrival; vehicles stop at contact rather than passing through one another. Long vehicles use a gradual exit merge.
- Three CC0 background tracks shuffle without immediate repeats; twelve Kenney jingles celebrate completed visits. Files and credits are bundled in `audio/` for offline app playback. The original generated music remains a fallback if recorded playback is unavailable.

- Gas-station checkout uses addition with a sum under 10, four unique choices, colored counting dots,  and gentle retries. Success clears automatically; delayed payment callbacks cannot affect another visit. Fuel completion no longer resurrects the green checkmark.
- Player and traffic vehicles share glass cabins with visible upholstered seats, headrests, dashboards and steering wheels; buses and construction cabs are open inside. Drivers sit below their roofs.
- Skatepark: choose a skateboard or scooter, hold/drag the left movement stick, tap a destination, or use arrow/WASD keys. Swipe the other side to orbit the camera. Near numbered curved ramps, jump, flip or double flip; tap the clock while airborne for slow motion. Landings show encouraging messages and colorful paper confetti. Benches, rails, boundaries and elevated pads have physical responses. Choose Garden, Seaside or City. Each map has its own ramp layout and three visual goals: tricks in Garden, checkpoints and a small jump at Seaside, and harder flips in City. Helmet and pads, turning wheels, textured concrete and expansion joints complete the park.
- Shared characters use spherical heads, tapered torsos, connected rounded shoulders and smooth hair volumes. Outdoor areas have a horizon gradient; pools have animated water, and space has a distant star band.

The iOS bundle uses the same gameplay, with bundled fonts, 3D library and music. Its source is in the neighboring AzarPlayground Xcode project.

For regression checks, run `node review/game-regressions.cjs`. To regenerate the isolated interaction preview, run `node review/create-preview.cjs`, serve this directory, and open `/review/interaction-preview.html`. Its test controls skip earlier steps to inspect the airport cab, boarding gate and paid-car departure. They are absent from the production game.

## Toy character and rocket update

- Shared characters now have rounded cylindrical toy heads, tapered molded torsos, connected cylindrical arms, C-shaped hands, articulated hips, boot toes and glossy plastic shading. Existing outfit/hair customization and animations are preserved.
- Math prompts are silent: browser speech generation is removed. No spoken celebrations are added.
- Rockets have a **Climb down** control while climbing, opening the hatch or seated before launch; partial climbs reverse without completing the ascent.
- Separated boosters use their actual transformed solid bounds to stay clear of the attached rocket and other detached parts while tumbling. The clearance check runs after the rocket moves each frame.
- Higgsfield character generation was attempted, but the connected account rejected it with “Requires basic plan or higher.” The playable models are implemented locally; no generated Higgsfield asset is claimed.
