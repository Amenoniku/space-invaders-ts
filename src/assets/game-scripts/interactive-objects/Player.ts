import { InteractiveObjectClass } from "./InteractiveObjectClass";
import { Bullet } from "./Bullet";
import { Game } from "../Game";

export class Player extends InteractiveObjectClass {

  private screenWidth: number
  position: Position;

  size = { width: 28, height: 12 }
  icon = { x: 138.5, y: 75 }

  constructor(public data: Game) {
    super()
    this.screenWidth = data.screenBox.x - 40
    this.position = {
      x: (data.screenBox.x / 2) - (this.size.width / 2),
      y: data.screenBox.y - 30
    }
    this.data.screen.addEventListener('mousemove', this.move)
    this.data.screen.addEventListener('click', this.shoot)
  }

  update(): void {
    if (this.position.x < 10) this.position.x = 10;
    if (this.position.x > this.screenWidth) this.position.x = this.screenWidth
  }

  shoot = (ev: MouseEvent) => {
    ev.preventDefault()
    this.data.gameObjects.push(
      new Bullet(
        {
          x: this.position.x + this.size.width / 2,
          y: this.position.y - 12
        }, {
        speed: 4, direction: 'up'
      }, 'Player'
      )
    )
  }

  private move = (ev: MouseEvent) => {
    this.position.x = ev.offsetX - this.size.width / 2;
  }
}