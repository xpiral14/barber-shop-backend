import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Order from '../../Contracts/Models/Order'
import useAsync from '../../hooks/useAsync'
import OrderService from '../../services/OrderService'

const useStyles = makeStyles({
  container: {
    padding: '15px',
  },
  orderContainer: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderBottom: 'thin solid #e3e3e3',
    cursor: 'pointer',
  },
  breadcrumbCurrent: {
    color: '#000000',
  },
  grid: {
    height: '100%',
    width: '100%',
  },
  orderInfoHeader: {
    padding: '15px',
    backgroundColor: '#e3e3e3',
  },
})

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
  const [orderSelected, setOrderSelected] = useState<Order | null>(null)

  const [isGettingOrder] = useAsync(() => {
    (async () => {
      const response = await OrderService.getOne(1)
      setOrderSelected(response.data)
    })()
  }, [selectedOrder])
  const classes = useStyles()
  useEffect(() => {
    (async () => {
      try {
        const response = await OrderService.getAll()
        console.log(Array(14).fill(response.data.data[0]))
        setOrders(Array(14).fill(response.data.data[0]))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <Grid container spacing={2} style={{ height: '100%' }}>
      <Grid item xs={12} style={{ height: '100%' }}>
        <Paper>
          <h2>Ordem de serviço</h2>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <div className={classes.container}>
            <TextField
              placeholder='Ordem de serviço tal'
              label='Pesquisar'
              style={{ width: '100%' }}
            />
          </div>
          {orders.map((order, index) => (
            <div
              style={{
                backgroundColor: selectedOrder === index ? '#008cff' : 'white',
                color: selectedOrder === index ? 'white' : 'black',
              }}
              className={classes.orderContainer}
              key={order.id}
              onClick={() => setSelectedOrder(index)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div>{order.userThatRegistered.name}</div>
                <div>
                  <b>R$ {order.estimatedTime.toFixed(2)}</b>
                </div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: selectedOrder === index ? 'white' : 'gray',
                }}
              >
                {order.notice}
              </div>
            </div>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <div className='d-flex justify-content-between align-items-center'>
                <h4>Informação da ordemde serviço</h4>
                <Button variant='text'>...</Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              {isGettingOrder ? (
                <CircularProgress />
              ) : (
                orderSelected && (
                  <div>
                    <div
                      className={`${classes.orderInfoHeader} d-flex justify-content-between align-items-center`}
                    >
                      <div className='d-flex flex-column'>
                        <b>Vendedor</b>
                        <span>{orderSelected?.userThatRegistered.name}</span>
                      </div>

                      <div className='d-flex flex-column'>
                        <b>Data de criação</b>
                        <span>
                          {new Date(
                            orderSelected.created_at
                          ).toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      <div className='d-flex flex-column'>
                        <b>Cliente</b>
                        <span>{orderSelected?.userThatRegistered.name}</span>
                      </div>

                      <div className='d-flex flex-column'>
                        <b>Código da ordem</b>
                        <span>{orderSelected.id}</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Orders
