import express from 'express'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'
import users from './routers/users/index.mjs'
import { send } from 'process'

// AULA 2 - SETUP

const app = express()

const port = 3000

const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)

const basePath = path.join(dirname, 'templates')

const checkAuth = (req, res, next) => {
  req.authStatus = false
  req.authStatus
    ? console.log(chalk.green('Logado')) + next()
    : console.log(chalk.red('Não Logado')) + next()
}
//* Aula de Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(checkAuth)
app.use('/users', users)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})
app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`)
})
app.listen(port, () => console.log(chalk.blueBright(`running on port ${port}`)))

//* AULA 4 - (NODEMON) FEITA
