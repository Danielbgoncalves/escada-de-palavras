import express from 'express'
import cron from 'node-cron'
import cors from 'cors'

import {sortearDesafioValido} from './bfs.js'

const app = express()

app.use(cors())
app.use(express.json())

let desafioDiario = null

desafioDiario = sortearDesafioValido()

cron.schedule('0 0 * * *', () => {
    desafioDiario = sortearDesafioValido()
})

app.get('/api/desafio-diario', (req, res) => {
    res.json(desafioDiario)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`)
})