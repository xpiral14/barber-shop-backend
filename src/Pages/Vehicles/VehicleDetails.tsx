import { Button, Card, Grid, IconButton, Typography } from '@material-ui/core/'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Divider from '@material-ui/core/Divider'
import Link, { LinkProps } from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from '@material-ui/icons/'
import React, { useEffect, useState } from 'react'
import { default as NumberFormat } from 'react-number-format'
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import { fuelType } from '../../Contracts/Enums'
import Vehicle from '../../Contracts/Models/Vehicle'
import VehicleService from '../../services/VehicleService'
import formatLicensePlate from '../../Util/formatLicensePlate'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minWidth: 275,
    maxWidth: 345,
  },
  grid: {
    height: '100%',
    width: '100%',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: '2rem',
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
  description: {
    marginTop: '0.5rem',
  },
  breadcrumbCurrent: {
    color: '#000000',
  },
})

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
)

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
                <LinkRouter color='inherit' to='/veiculos'>
                  Veículos
                </LinkRouter>
                <span
                  className={classes.breadcrumbCurrent}
                >{`${vehicle?.make} ${vehicle?.model}`}</span>
              </Breadcrumbs>
            </div>
          </Grid>

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

          <Grid item xs={12} sm={6} direction='column'>
            <Card className={classes.card}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Grid item xs={12}>
                  <Typography variant='h4' component='h4'>
                    <b>{`${vehicle?.make} ${vehicle?.model}`}</b>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body2'
                    color='textSecondary'
                  >
                    ID: {`${vehicle?.id}`}
                  </Typography>

                  <Divider />
                  <div className={classes.description}>
                    <div className={classes.description}>
                      Ano: <b>{vehicle?.year} </b>/ Modelo:{' '}
                      <b>{vehicle?.yearModel}</b>
                    </div>

                    <div className={classes.description}>
                      Cor: <b>{vehicle?.color.toUpperCase()} </b>
                    </div>

                    <div className={classes.description}>
                      Placa: <b>{formatLicensePlate(vehicle?.licensePlate)}</b>
                    </div>

                    <div className={classes.description}>
                      Quilometragem:
                      <b>
                        <NumberFormat
                          value={vehicle?.kmDriven}
                          displayType={'text'}
                          thousandSeparator={' '}
                        />
                      </b>
                      km
                    </div>
                    <div className={classes.description}>
                      Combustível:{' '}
                      <b>
                        {fuelType[vehicle?.fuelType as keyof typeof fuelType]}{' '}
                      </b>
                    </div>
                  </div>
                </Grid>

                <div
                  style={{
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<PersonIcon />}
                    >
                      Proprietário
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default VehicleDetails
