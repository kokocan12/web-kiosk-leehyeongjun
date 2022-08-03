const fs = require('fs')
const path = require('path')
const originalConfig = '...(modules.webpackAliases || {}),';

const aliases = [
            "'@': path.resolve(process.cwd(), 'src/')",
            "'@style': path.resolve(process.cwd(), 'src/styles')",
            "'@lib': path.resolve(process.cwd(), 'src/lib')"
]
const ins = aliases.join(',')
const ROOT_PATH = process.cwd()

const START_TEXT = '//##START##'
const END_TEXT = '//##END##'
const insertText =  '\n' + START_TEXT + '\n' + ins + '\n' + END_TEXT + '\n'

const filePath = path.join(ROOT_PATH, 'node_modules', 'react-scripts', 'config', 'webpack.config.js')
const contents = fs.readFileSync(filePath).toString()
console.log(contents.indexOf(START_TEXT))
if(contents.indexOf(START_TEXT) === -1) {
    const newContents = contents.replace(originalConfig, originalConfig + insertText)
    fs.writeFileSync(filePath, newContents)
} else {
    const sIndex = contents.indexOf(START_TEXT) + START_TEXT.length
    const eIndex = contents.indexOf(END_TEXT)
    const oldText = contents.slice(sIndex, eIndex)
    const newContents = contents.replace(oldText, '\n'  + ins + '\n')
    fs.writeFileSync(filePath, newContents)
}