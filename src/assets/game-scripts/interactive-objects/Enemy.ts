import { InteractiveObjectClass } from "./InteractiveObjectClass";
import { Bullet } from "./Bullet";
import { Game } from "../Game";

export class Enemy extends InteractiveObjectClass {

  moveX: number = 0
  speed: number = 1
  icon: IconPosition

  constructor(
    public data: Game,
    public position: Position,
    public size: Size,
    public ind: number
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
    if (
      this.moveX < 0 || this.moveX > this.data.screenBox.x / 3) {
      this.speed = -this.speed;
    }
    this.position.x += this.speed;
    this.moveX += this.speed;
    this.shoot();
  }


  private isLower(enemy: Enemy): Boolean {
    return this.data.gameObjects.filter(function (o) {
      return (
        o instanceof Enemy &&
        o.position.y > enemy.position.y &&
        o.position.x - enemy.position.x < enemy.size.width
      )
    }).length > 0;
  }

  private shoot() {

    if (Math.random() < 0.01 && !this.isLower(this)) {
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

  private move = (ev: MouseEvent) => {
    this.position.x = ev.offsetX - this.size.width / 2;
  }
}