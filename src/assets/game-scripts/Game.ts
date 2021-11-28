import { Player } from "./Player"
import gameIcons from '../../assets/icons/icons.png'

export class Game {
  private ctx: CanvasRenderingContext2D
  screenBox: Position
  gameObjects: GameObject[] = []
  private gameStop: boolean = false
  private logicCycle: any = 0
  private icons: HTMLImageElement = new Image
  constructor(public screen: HTMLCanvasElement) {
    this.ctx = this.screen.getContext('2d')!
    this.screenBox = { x: this.screen.width, y: this.screen.height }
    this.icons.src = gameIcons
  }

  public start() {
    this.icons.onload = () => {
      this.addObjects()
      this.renderTick()
      this.logicTick()
    }
  }

  private addObjects() {
    // this.gameObjects.push(new Score(this))
    this.gameObjects.push(new Player(this))
    this.addEnemies()
  }

  private addEnemies() {
    // TODO
  }


  private renderTick() {
    if (!this.gameStop) {
      this.draw()
      requestAnimationFrame(this.renderTick.bind(this))
    } else {
      setTimeout(() => {
        this.renderTick()
      }, 100);
    }
  }

  private logicTick() {
    this.logicCycle = setInterval(() => {
      this.update()
    }, 1000 / 60)
  }

  private update() {
    // TODO
  }
  private collision() {
    // TODO
  }
  private clean() {
    this.ctx.clearRect(0, 0, this.screenBox.x, this.screenBox.y)
  }

  private draw() {
    this.clean()
    this.gameObjects.forEach(obj => {
      // if (obj instanceof Score) {
      //   this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
      //   this.ctx.font = obj.font;
      //   this.ctx.fillText(obj.text, obj.pos.x, obj.pos.y);
      // }
      this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
      this.ctx.fillRect(obj.position.x, obj.position.y, obj.size.width, obj.size.height);
      if (obj.icon) {
        return this.ctx.drawImage(this.icons, obj.icon.x, obj.icon.y, obj.size.width, obj.size.height, obj.position.x, obj.position.y, obj.size.width, obj.size.height);
      }
    })
  }

}