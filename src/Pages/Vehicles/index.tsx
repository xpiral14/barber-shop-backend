import React, { useEffect, useState } from 'react'
import Vehicle from '../../Models/Vehicle'
import VehicleService from '../../services/VehicleService'
import formatLicensePlate from '../../Util/formatLicensePlate'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})

const Vehicles: React.FC = () => {
  const history = useHistory()

  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  const classes = useStyles()

  useEffect(() => {
    (async function () {
      const vehiclesData = await VehicleService.getAll(1, 10)
      setVehicles(vehiclesData.data)
    })()
  }, [])

  return (
    <Grid container spacing={3}>
      {!!vehicles.length &&
        vehicles.map((vehicle) => (
          <Grid key={vehicle.id} item xs={3}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Contemplative Reptile'
                  height='140'
                  image={vehicle.imageUrl || '/Images/car-placeholder.jpg'}
                  title='Contemplative Reptile'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {vehicle.model}
                  </Typography>
                  <span>{vehicle.make}</span>
                  <br />
                  <span>
                    <b>Placa: {formatLicensePlate(vehicle?.licensePlate)}</b>
                  </span>
                  <br />
                  <span>
                    <b>
                      Ano: {vehicle?.year} / Modelo: {vehicle?.year}
                    </b>
                  </span>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  onClick={() =>
                    history.push(`/veiculos/detalhes/${vehicle.id}`)
                  }
                >
                  Detalhes do Veículo
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Vehicles
