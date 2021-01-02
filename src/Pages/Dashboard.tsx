import React from 'react'
//eslint-disable-next-line
import Grid from '@material-ui/core/Grid'

export default function Dashboard() {
  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <div
        className='sm'
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '15px 180px',
        }}
      >
        <p>Teste 0</p>
      </div>

      <div
        className='sm'
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '15px 180px',
        }}
      >
        <p>Teste 1</p>
      </div>

      <div
        className='sm'
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '15px 180px',
        }}
      >
        <p>Teste 2</p>
      </div>
    </Grid>
  )
}
