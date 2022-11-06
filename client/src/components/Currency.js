import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import {Card, Text, Container} from '@nextui-org/react'
const socket = io('http://localhost:8080')

const Currency = () => {
  const [currencies, setCurrencies] = useState({BTCUSDT: 0, ETHUSDT: 0})
  useEffect(() => {
    const receiveCurrency = (currency) => {
      setCurrencies({
        ...currencies,
        [currency.s]: Number.parseFloat(currency.c).toFixed(2),
      })
    }

    socket.on('BTCUSDT', receiveCurrency)
    socket.on('ETHUSDT', receiveCurrency)
    return () => {
      socket.off('message', receiveCurrency)
    }
  }, [currencies])
  return (
    <Container
      css={{
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        padding: 0,
        paddingTop: 50,
      }}
    >
      <Card css={{width: 150, height: 150, padding: '5px 10px'}}>
        <Card.Body
          css={{
            width: 'auto',
          }}
        >
          <Text css={{textAlign: 'right', margin: 0}}>
            {`$${currencies.BTCUSDT}`}
          </Text>
        </Card.Body>
        <Card.Footer css={{justifyItems: 'flex-start'}}>
          <Text b>BTC</Text>
        </Card.Footer>
      </Card>
      <Card css={{width: 150, height: 150, padding: '5px 10px'}}>
        <Card.Body
          css={{
            width: 'auto',
          }}
        >
          <Text css={{textAlign: 'right', margin: 0}}>
            {`$${currencies.ETHUSDT}`}
          </Text>
        </Card.Body>
        <Card.Footer css={{justifyItems: 'flex-start'}}>
          <Text b>ETH</Text>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Currency
