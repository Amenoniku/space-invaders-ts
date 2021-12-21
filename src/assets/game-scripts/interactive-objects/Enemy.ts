import { InteractiveObjectClass } from "./InteractiveObjectClass";
import { Bullet } from "./Bullet";
import { Game } from "../Game";

export class Enemy extends InteractiveObjectClass {

  speed: number = 1 + (Math.random() * 3)
  icon: IconPosition

  constructor(
    public data: Game,
    public position: Position,
    public size: Size,
    public colNumber: number
  ) {
    super()
    const randomIconsPosition: Position[] = [
      { x: 57, y: 0 },
      { x: 98.5, y: 0 },
      { x: 139, y: 0 },
      { x: 9, y: 30 },
      { x: 57, y: 30 },
      { x: 98.5, y: 30 },
      { x: 139, y: 30 }
    ];
    this.icon = randomIconsPosition[
      Math.floor(
        Math.random() * randomIconsPosition.length
      )
    ]
  }

  update(): void {
    this.move()
    this.shoot();
  }

  private move() {
    if (
      this.position.x < 3 ||
      this.position.x + this.size.width > this.data.screenBox.x - 3
    ) {
      this.speed = -this.speed
    }
    const x = this.position.x + this.speed
    this.position.x = x
  }

  private shoot() {
    const enemiesCount = this.data.gameObjects.filter(obj => {
      return obj instanceof Enemy
    }).length
    if (Math.random() < (0.2 / enemiesCount)) {
      const bulletCoors = {
        x: this.position.x + this.size.width / 2,
        y: this.position.y + this.size.height / 2 + this.size.height / 2 + 1
      };
      const bullet = new Bullet(bulletCoors, {
        speed: 3,
        direction: 'down'
      }, 'Enemy');
      this.data.gameObjects.push(bullet);
    }
  }

  private isLower(): Boolean {
    const col = this.data.gameObjects.filter(obj => {
      return obj instanceof Enemy && obj.colNumber === this.colNumber
    })
    const maxYEnemy: number = Math.max.apply(Math, col.map((o) => o.position.y))
    return this.position.y === maxYEnemy
  }
}