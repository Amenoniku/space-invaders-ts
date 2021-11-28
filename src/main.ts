import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

type ValidationType = 'required' // | 'email'

interface ValidatorConfig {
  [prop: string]: {
    [validateProp: string]: ValidationType
  }
}

const validators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  validators[target.constructor.name] = {
    ...validators[target.constructor.name],
    [propName]: 'required'
  }
}

function validate(obj: any): boolean {
  const objConfig = validators[obj.constructor.name]
  if (!objConfig) return true
  let isValid = true
  Object.keys(objConfig).forEach(key => {
    if (objConfig[key] === 'required') isValid = isValid && !!obj[key]
  })
  return isValid
}

function isValid<C>(cls: C) {
  if (validate(cls)) console.log(`Valid: `, cls)
  else console.log(`Validation Error`)
}

class Form {
  @Required
  public email: string | void
  constructor(email?: string) {
    this.email = email
  }
}

const form1 = new Form()
const form2 = new Form('1@1.ru')

isValid(form1)
isValid(form2)

