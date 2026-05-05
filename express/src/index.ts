import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import User from './modules/user.js'

const app = express()

app.use(bodyParser.json())

app.get('/', (_req, res) => {
  res.send('Hello Express!')
})

app.get('/api/users/:id', (_req, res) => {
  User.findById(_req.params.id).then((user) => {
    res.json({ name: user?.name, email: user?.email })
  }).catch((err) => {
    res.status(500).json({ error: err.message })
  })
})

app.post('/api/users', (_req, res) => {
  const user = new User({ name: _req.body.name, email: _req.body.email })
  user.save().then(() => {
    res.status(201).json({ name: _req.body.name, email: _req.body.email })
  }).catch((err) => {
    res.status(500).json({ error: err.message })
  })
})

app.delete('/api/users/:id', (_req, res) => {
  User.findByIdAndDelete(_req.params.id).then(() => {
    res.status(200).json({ message: 'User deleted' })
  }).catch((err) => {
    res.status(500).json({ error: err.message })
  })
})

app.put('/api/users/:id', (_req, res) => {
  User.findByIdAndUpdate(_req.params.id, { name: _req.body.name }).then(() => {
    res.status(200).json({ message: 'User updated' })
  }).catch((err) => {
    res.status(500).json({ error: err.message })
  })
})

mongoose.connect('mongodb+srv://mateusarlopes_db_user:VYjvGKDJsvkoShjC@cluster0.9hwt2q3.mongodb.net/users')

export default app
