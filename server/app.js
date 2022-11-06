import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import quotesRouter from './src/routes/quotes.js'
import dotenv from 'dotenv'
import {Spot} from '@binance/connector'
dotenv.config()

const app = express()
const port = process.env.PORT

const client = new Spot(process.env.APIKEY, process.env.SECRETKEY)

const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
const callbacks = (socket, currency) => {
  return {
    message: (data) => socket.emit(currency, JSON.parse(data)),
  }
}
io.on('connection', (socket) => {
  try {
    client.miniTickerWS('BTCUSDT', callbacks(socket, 'BTCUSDT'))
    client.miniTickerWS('ETHUSDT', callbacks(socket, 'ETHUSDT'))
  } catch (error) {
    console.log(error)
  }
})

server.listen(port, () => {
  console.log('Servidor corriendo en puerto', port)
})

const middlewares = () => {
  app.use(cors())
  app.use(express.json())
  app.use(morgan('dev'))
}

const paths = {
  quotes: '/api/quotes',
}
const routes = () => {
  app.use(paths.quotes, quotesRouter)
}

middlewares()

routes()
