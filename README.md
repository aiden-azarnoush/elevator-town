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
- Rock–Paper–Scissors: illustrated rock, paper and scissors choices; shaded animated hands.
- Optional **Little discoveries** cards practice letters, numbers and shapes during six activities. Collapse the card to focus on free play.
- Three CC0 background tracks shuffle without immediate repeats; twelve Kenney jingles celebrate discoveries. Files and credits are bundled in `audio/` for offline app playback. The original generated music remains a fallback if recorded playback is unavailable.

The iOS bundle uses the same gameplay, with bundled fonts, 3D library and music. Its source is in the neighboring AzarPlayground Xcode project.

For regression checks, run `node review/game-regressions.cjs`. To regenerate the isolated interaction preview, run `node review/create-preview.cjs`, serve this directory, and open `/review/interaction-preview.html`. Its test controls skip earlier steps to inspect the airport cab, boarding gate and paid-car departure. They are absent from the production game.
