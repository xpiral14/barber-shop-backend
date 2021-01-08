import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core/'
import { default as Breadcrumbs, default as IconButton } from '@material-ui/core/Breadcrumbs'
import Link, { LinkProps } from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Vehicle from '../../Contracts/Models/Vehicle'
import VehicleService from '../../services/VehicleService'
import formatLicensePlate from '../../Util/formatLicensePlate'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  breadcrumbCurrent: {
    color: '#000000',
  },
  grid: {
    height: '100%',
    width: '100%',
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

  interface LinkRouterProps extends LinkProps {
    to: string
    replace?: boolean
  }

  const LinkRouter = (props: LinkRouterProps) => (
    <Link {...props} component={RouterLink as any} />
  )

  return (
    <Grid container spacing={3} className={classes.grid}>
      {vehicles && (
        <>
          <Grid container xs={12} alignItems='center'>
            <div>
              <IconButton aria-label='backOnePage'>
                <ArrowBackIcon />
              </IconButton>
            </div>

            <div>
              <Breadcrumbs aria-label='breadcrumb'>
                <LinkRouter color='inherit' to='/empresa'>
                  Minha Empresa
                </LinkRouter>
                <span className={classes.breadcrumbCurrent}>Veículos</span>
              </Breadcrumbs>
            </div>
          </Grid>

          {!!vehicles.length &&
            vehicles.map((vehicle) => (
              <Grid item xs={3} key={vehicle.id}>
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
                        <b>{vehicle?.model}</b>
                      </Typography>
                      <div>{vehicle.make}</div>
                      <div>
                        Placa:{' '}
                        <b>{formatLicensePlate(vehicle?.licensePlate)}</b>
                      </div>
                      <div>
                        Ano: <b>{vehicle?.year}</b> / Modelo:{' '}
                        <b>{vehicle?.year}</b>
                      </div>
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
        </>
      )}
    </Grid>
  )
}

export default Vehicles
