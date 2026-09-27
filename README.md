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
