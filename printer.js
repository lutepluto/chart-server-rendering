const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { registerFont, createCanvas } = require('canvas')
const echarts = require('echarts')

const imagesPath = path.resolve(__dirname, './images')
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath)
}

registerFont(path.resolve(__dirname, './fonts/source-han-serif.ttf'), { family: "华文仿宋"})

const ctx = createCanvas(128, 128)
echarts.setCanvasCreator(() => ctx)

module.exports = function(configs) {
  const width = configs.width || 500
  const height = configs.height || 500
  configs.option.animation = false
  const chart = echarts.init(createCanvas(parseInt(width), parseInt(height)), {
    renderer: 'canvas'
  })
  chart.setOption(configs.option)
  const ext = configs.ext || 'jpg'
  const name = `${crypto.randomBytes(10).toString('hex')}.${ext}`
  fs.writeFileSync(path.resolve(imagesPath, name), chart.getDom().toBuffer())
  return name
}
