import fs from 'fs'

export function createReadStream(filename) {
  const path = ['uat', 'production'].includes(process.env.NODE_ENV) ? `dist/${filename}` : filename
  return fs.createReadStream(path)
}
