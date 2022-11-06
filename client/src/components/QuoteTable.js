import {Input, Button, Table, Container, Loading} from '@nextui-org/react'

import React, {useEffect, useState} from 'react'
import {axiosInstance} from '../helpers/axios'
import {monthFormat} from '../helpers/monthFormat'

const QuoteTable = () => {
  const [investment, setInvestment] = useState(0)
  const [data, setData] = useState(null)
  const [monthData, setMonthData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (data) {
      monthFormat(data, setMonthData)
    }
  }, [data])
  const handleSubmit = async () => {
    setIsLoading(true)
    if (investment > 0) {
      try {
        const response = await axiosInstance.post('quotes', {investment})
        response && setIsLoading(false)
        setData(response.data)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    } else {
      alert('Enter a number greater than 0')
      setIsLoading(false)
    }
  }
  const handleExport = async (type) => {
    const body = {
      currencies: ['BTC', 'ETH'],
      type,
      months: monthData,
    }
    try {
      const response = await axiosInstance.post('quotes/download', body)
      alert(response.data)
    } catch (error) {
      alert("File wasn't created")
    }
  }
  return (
    <Container
      css={{
        display: 'flex',
        justifyContent: 'center',
        gap: 50,
        padding: 0,
        paddingTop: 50,
      }}
    >
      <Container
        css={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        <Input
          placeholder="Investment"
          value={investment}
          type="number"
          onChange={(e) => setInvestment(e.target.value)}
        />
        <Button onClick={() => handleSubmit()}>
          {isLoading ? <Loading type="spinner" color="white" /> : 'Quote'}
        </Button>
        <Button color="secondary" onClick={() => handleExport('csv')}>
          CSV
        </Button>
        <Button color="secondary" onClick={() => handleExport('json')}>
          JSON
        </Button>
      </Container>

      {data && investment ? (
        <Table
          aria-label="Example table with static content"
          css={{
            height: 'auto',
            minWidth: '100%',
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column css={{width: 100, textAlign: 'center'}}>
              Month
            </Table.Column>
            {data?.currencies?.map((currency) => {
              return (
                <Table.Column css={{width: 300, textAlign: 'center'}}>
                  {currency}
                </Table.Column>
              )
            })}
          </Table.Header>
          <Table.Body>
            {monthData.map((month, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell
                    css={{textAlign: 'center'}}
                  >{`${index}`}</Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>
                    {month[0]}
                  </Table.Cell>
                  <Table.Cell css={{textAlign: 'center'}}>
                    {month[1]}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      ) : (
        ''
      )}
    </Container>
  )
}

export default QuoteTable
