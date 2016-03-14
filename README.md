# Missile Defense


![Missile Defense](/images/missileDefense.png?raw=true "Missile Defense)

Defend your cities from the onslaught of incoming missiles! Use A S and D to fire missiles from your left, middle, and right tower. Aim with your mouse cursor. Your missile will explode at the coordinates your mouse was at when you fired a missile. The explosion from your missile will cause other missiles caught in its blast radius to explode.

Project made with JavaScript and HTML5 Canvas.

Firing a bullet generates a bullet at one of three starting locations (dependent on if A, S, or D was pressed) and calculates a vector that will intercept the mouse's current coordinates. Each instance of a bullet saves the mouse's current location when it is created as its destination.

(The player's missiles are called 'bullets', hostile missiles are 'missiles')

![Missile Defense](/images/createBullet.png?raw=true "Create Bullet")
![Missile Defense](/images/bulletVec.png?raw=true "Create Bullet Vector")


When a bullet arrives at its destination, it is removed from the canvas, and an explosion takes its place. Explosions remove missiles that are within its radius, and replaces them with explosions as well.

![Missile Defense](/images/checkExplosions.png?raw=true "Check Explosions")

Hostile missiles are created at random positions above the canvas, and are sent directly at the player's remaining bases. Hostile missiles are given 'noise' to reduce there initial accuracy. This noise is reduced as the player progresses through different rounds.

![Missile Defense](/images/missileVec.png?raw=true "Create Missile Vector")


MVP Features:

- [X] Missiles rain down upon player's cities
- [X] Missiles destroy a city on collision
- [X] Player can fire missiles at hostile missiles to destroy them
- [X] Multiple waves of missiles, more missiles as game progresses
- [X] Player looses game if all bases are lost

Additional Features
- [X] Missiles only fire at live cities
- [X] Missiles do not start with perfect aim
- [X] Missiles can spawn above player view
- [X] Player's missiles based on number of cities remaining


Future Features (in order of importance)
- [ ] Add sound effects
- [ ] leaderboards
- [ ] Player can purchase upgrades at the end of each round
