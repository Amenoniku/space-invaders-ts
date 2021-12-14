import { InteractiveObjectClass } from "./InteractiveObjectClass";

export class Bullet extends InteractiveObjectClass {

  size = { width: 3, height: 6 }
  icon

  constructor(
    public position: Position,
    protected moving: Moving,
    shooter: Shooter
  ) {
    super()
    const iconEnemyBullet: IconPosition = { x: 152, y: 65 }
    const iconPlayerBullet: IconPosition = { x: 157, y: 65 }
    switch (shooter) {
      case 'Player': this.icon = iconPlayerBullet; break;
      case 'Enemy': this.icon = iconEnemyBullet; break;
    }
  }

  public update() {
    switch (this.moving.direction) {
      case 'up': this.position.y -= this.moving.speed; break
      case 'down': this.position.y += this.moving.speed; break
    }
  }
}