/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type Position = { x: number, y: number }
type Size = { width: number, height: number }
type Moving = { speed: number, direction: 'up' | 'down' }
type IconPosition = Position
type Shooter = 'Player' | 'Enemy'

interface GameObject {
  size: Size
  position: Position
  icon: IconPosition
}
