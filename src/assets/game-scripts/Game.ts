import moment from 'moment'

import { Player } from "./interactive-objects/Player"
import { Enemy } from "./interactive-objects/Enemy"
import { Bullet } from "./interactive-objects/Bullet"
import { InteractiveObjectClass } from "./interactive-objects/InteractiveObjectClass";

import { Score } from "./interface-objects/Score"
import { InterfaceObjectClass } from "./interface-objects/InterfaceObjectClass";
import gameIcons from '../../assets/icons/icons.png'

import { useStore } from '../../store'
const store = useStore()

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

    this.gameObjects.push(new Score(this))
    this.gameObjects.push(new Player(this))
    this.addEnemies()
  }

  private addEnemies() {
    const size: Size = {
      width: 29,
      height: 25
    };
    let x: number = 3;
    let y: number = 3;
    const colCount = 8
    const rowCount = 5


    let colNumber: number = 0;
    for (let colI = 0; colI < colCount; colI++) {
      if (colI === 0) x = x;
      else x += size.height + size.height / 3
      colNumber++;
      for (let rowI = 0; rowI < rowCount; rowI++) {
        if (rowI === 0) y = y
        else y += size.width + size.width / 3;
        this.gameObjects.push(new Enemy(this, { x, y }, size, colNumber));
      }
      y = 3;
    }
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
    this.gameObjects.forEach((obj: GameObject, i: number) => {
      if (this.isInterfaceObject(obj)) return
      if (obj.position.y < 0 || obj.position.y >= this.screenBox.y) {
        this.gameObjects.splice(i, 1);
      } else obj.update()
    })

    this.gameObjects = this.gameObjects.filter(this.notCollision)

    const win = this.gameObjects.some((item) => {
      return item instanceof Enemy;
    });
    const lose = this.gameObjects.some((item) => {
      return item instanceof Player;
    });
    this.endGame(win, lose)
  }

  private isInterfaceObject(obj: GameObject): Boolean {
    return obj instanceof InterfaceObjectClass
  }

  private notCollision = (o1: GameObject): Boolean => {
    if (this.isInterfaceObject(o1)) return true
    return this.gameObjects.filter((o2: GameObject) => {
      if (o1 instanceof Enemy && o2 instanceof Enemy) return false
      if (
        (o1 instanceof Enemy || o2 instanceof Enemy) &&
        (o1 instanceof Bullet || o2 instanceof Bullet) &&
        (o1.shooter === 'Enemy' || o2.shooter === 'Enemy')
      ) return false
      const isColl: Boolean = this.collision(o1, o2);
      if (isColl && o1 instanceof Enemy) {
        this.gameObjects[0].up()
      }
      if (isColl && o1 instanceof Player) {
        this.screen.removeEventListener('click', o1.shoot);
      }
      return isColl;
    }).length === 0;
  };

  private endGame(win: Boolean, lose: Boolean) {
    if (!win) {
      alert("Поздравляю!!! Вы победили Инопланетных Захватчиков! Но радары засекли еще одну волну! Нажми \"Ok\" чтобы разгромить врага!");
      this.gameObjects = []
      this.addEnemies();
    }

    if (!lose) {
      this.gameStop = true;
      store.dispatch('scores/addNewScore', {
        data: moment().format('MMMM Do YYYY, h:mm:ss'),
        score: this.gameObjects[0].score
      })
      this.gameObjects = [];
      this.addObjects();
      this.gameStop = false;
    }
  }

  private collision(o1: GameObject, o2: GameObject) {
    return !(
      o1 === o2 ||
      o1.position.x + o1.size.width < o2.position.x ||
      o1.position.y + o1.size.height < o2.position.y ||
      o1.position.x > o2.position.x + o2.size.width ||
      o1.position.y > o2.position.y + o2.size.height
    )
  }
  private clean() {
    this.ctx.clearRect(0, 0, this.screenBox.x, this.screenBox.y)
  }

  private draw() {
    this.clean()
    this.gameObjects.forEach(obj => {
      if (obj instanceof InterfaceObjectClass) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
        this.ctx.font = obj.font;
        this.ctx.fillText(obj.text, obj.position.x, obj.position.y);
      }
      if (obj instanceof InteractiveObjectClass) {
        this.ctx.drawImage(
          this.icons,
          obj.icon.x,
          obj.icon.y,
          obj.size.width,
          obj.size.height,
          obj.position.x,
          obj.position.y,
          obj.size.width,
          obj.size.height
        );
      }
    })
  }

}