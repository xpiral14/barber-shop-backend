import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Vehicle from '../../Models/Vehicle'
import VehicleService from '../../services/VehicleService'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})

const VehicleDetails: React.FC = (props: any) => {
  //eslint-disable-next-line
  const history = useHistory()
  //eslint-disable-next-line
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  //eslint-disable-next-line
  const classes = useStyles()

  useEffect(() => {
    (async function () {
      const vehiclesData = await VehicleService.getAll(1, 10)
      setVehicles(vehiclesData.data)
    })()
  }, [])

  return (
    <Grid container spacing={3}>
      <Card>Hellow World</Card>
    </Grid>
  )
}

export default VehicleDetails
