import { InterfaceObjectClass } from "./InterfaceObjectClass";
import { Game } from "../Game";

export class Score extends InterfaceObjectClass {

  score: number = 0
  size: Size = { width: 28, height: 12 }
  position: Position
  font: string = `bold ${this.size.height}px Arial`
  text: string = `Score: ${this.score}`

  constructor(public data: Game) {
    super()
    this.position = { x: 0, y: data.screenBox.y - this.size.height + 9 }
  }

  up() {
    this.text = `Score: ${++this.score}`
  }
}