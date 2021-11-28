export abstract class GameObjectClass {
  protected abstract size: Size
  protected abstract position: Position
  protected abstract icon: IconPosition
  abstract update(): void
}
