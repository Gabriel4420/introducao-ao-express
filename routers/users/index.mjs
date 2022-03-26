import express, { Router } from 'express'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

const users = Router()

const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)

const basePath = path.join(dirname, '../../templates')

users.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

users.post('/save', (req, res) => {
  const { name, age } = req.body
  console.log(`o usuário ${name} tem ${age} anos`)

  res.sendFile(`${basePath}/userform.html`)
})

users.get('/:id', (req, res) => {
  const { id } = req.params

  // leitura da tabela users, resgatar um usuário do banco

  console.log(chalk.bgBlue.black(`carregando user: ${id}`))
  res.sendFile(`${basePath}/users.html`)
})

export default users
