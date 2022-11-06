import {Spot} from '@binance/connector'
import fs from 'fs'
export const quotesPost = async (req, res) => {
  const {investment} = req.body
  const client = new Spot()
  const response = await client.tickerPrice('', ['BTCUSDT', 'ETHUSDT'])
  let currencies = []
  const months = response.data.flatMap(({symbol, price}) => {
    const formattedSymbol = symbol.split('USDT')
    currencies = [...currencies, formattedSymbol[0]]
    const formattedPrice = parseFloat(investment / price)
    const interest = formattedSymbol[0] === 'BNC' ? 0.05 : 0.03
    let array = [formattedPrice + formattedPrice * interest]
    for (let i = 1; i <= 12; i++) {
      array.push(array[i - 1] + array[i - 1] * interest)
    }
    return array
  })
  res.json({
    currencies,
    months,
  })
}

export const quotesDownloadsPost = async (req, res) => {
  const {currencies, months, type} = req.body

  const data = [currencies, ...months]

  try {
    if (type.toUpperCase() === 'JSON') {
      let json = {[data[0][0]]: [], [data[0][1]]: []}
      for (let i = 0; i < currencies.length; i++) {
        for (let j = 1; j < data.length; j++) {
          json[data[0][i]] = [...json[data[0][i]], data[j][i]]
        }
      }
      fs.writeFileSync('files/file.json', JSON.stringify(json))
    } else {
      let csv = ''
      for (let i of data) {
        csv += i.join(',') + '\r\n'
      }
      fs.writeFileSync('files/file.csv', csv)
    }
    res.json('File created!')
  } catch (error) {
    res.status(400).json("Filed wasn't created")
  }
}
