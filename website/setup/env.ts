import dotenv from 'dotenv'
import { resolve } from 'path'

const envFile = resolve(__dirname, '../../.env')

export const env = dotenv.config({
  path: envFile
}).parsed || {}

const stringifiedEnvs = Object.keys(env).reduce<Record<string, string>>((strEnvs, key) => {
  strEnvs[key] = JSON.stringify(env[key])

  return strEnvs
}, {})

export const defines = (filter?: RegExp) =>
  Object.keys(stringifiedEnvs).reduce<Record<string, string>>((definedEnvs, key) => {
    if (!filter || filter.test(key)) {
      definedEnvs[`process.env.${key.toUpperCase()}`] = stringifiedEnvs[key]
    }

    return definedEnvs
  }, {})
