import { buildComponent } from '../utils.js'

const data = {
  open: false,
  user: Spruce.store('user')
}

const methods = {
  show() {
    this.open = true
  },
  hide() {
    this.open = false
  }
}

const toggle = buildComponent(data, methods)

export default toggle
