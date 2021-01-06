import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Vehicle from '../../Models/Vehicle'
import VehicleService from '../../services/VehicleService'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { default as NumberFormat } from 'react-number-format'
import formatLicensePlate from '../../Util/formatLicensePlate'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minWidth: 275,
    maxWidth: 345,
  },
  grid: {
    // height: document.documentElement.clientWidth
    height: '100%',
    width: '100%',
  },
  card: {
    width: '100%',
    height: '300px',
    padding: '15px',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    width: '100%',
  },
  span: {
    marginTop: '0.5rem',
  },
})

const VehicleDetails: React.FC = () => {
  //eslint-disable-next-line
  const history = useHistory()
  const match = useRouteMatch<{ vehicleId: string }>()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const classes = useStyles()

  useEffect(() => {
    (async function () {
      const vehicle = await VehicleService.getOne(+match.params.vehicleId)
      setVehicle(vehicle)
    })()
  }, [])

  return (
    <Grid container spacing={3} className={classes.grid}>
      {vehicle && (
        <>
          <Grid item xs={12} sm={6}>
            <Card
              className={classes.card}
              style={{
                backgroundImage: `url(${
                  vehicle?.imageUrl || '/Images/car-placeholder.jpg'
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <Typography variant='h4' component='h4'>
                <b>{`${vehicle?.make} ${vehicle?.model}`}</b>
              </Typography>
              <Divider />
              <div className={classes.span}>
                <span className={classes.span}>
                  Ano: <b>{vehicle?.year} </b>/ Modelo: <b>{vehicle?.year}</b>
                </span>
                <br />
                <span className={classes.span}>
                  Placa: <b>{formatLicensePlate(vehicle?.licensePlate)}</b>
                </span>
                <br />
                <span className={classes.span}>
                  <b>
                    <NumberFormat
                      value={vehicle?.kmDriven}
                      displayType={'text'}
                      format='## ### ### ###'
                      thousandSeparator={true}
                      decimalSeparator={'.'}
                      decimalScale={10}
                      allowEmptyFormatting={true}
                    />
                  </b>
                  km
                </span>
                <br />
                <span className={classes.span}>
                  Combustível: <b>{vehicle?.fuelType} </b>
                </span>
              </div>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default VehicleDetails
