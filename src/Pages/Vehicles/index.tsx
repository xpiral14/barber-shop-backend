import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from '@material-ui/core/'
import {
  default as Breadcrumbs,
  default as IconButton,
} from '@material-ui/core/Breadcrumbs'
import Link, { LinkProps } from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon, Search as SearchIcon } from '@material-ui/icons'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Vehicle from '../../Contracts/Models/Vehicle'
import VehicleService from '../../services/VehicleService'
import formatLicensePlate from '../../Util/formatLicensePlate'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minWidth: 275,
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
  const [modal, setModal] = useState(false)

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
          <Grid container xs={6} alignItems='center'>
            <div>
              <IconButton
                aria-label='backOnePage'
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon />
              </IconButton>
            </div>

            <div>
              <Breadcrumbs aria-label='breadcrumb'>
                <LinkRouter color='inherit' to='/empresa'>
                  Minha Empresa
                </LinkRouter>
                <span className={classes.breadcrumbCurrent}>
                  Veículos ({vehicles?.length})
                </span>
              </Breadcrumbs>
            </div>
          </Grid>

          <Grid container xs={6} justify='flex-end' alignContent='center'>
            <ButtonGroup
              color='primary'
              variant='contained'
              size='small'
              aria-label='small button group'
            >
              <Button onClick={() => history.push('/veiculos/adicionar')}>
                <AddIcon />
                Adicionar
              </Button>
              <Button onClick={() => setModal(true)}>
                <SearchIcon />
                Filtrar
              </Button>
            </ButtonGroup>
          </Grid>

          {!!vehicles.length &&
            vehicles.map((vehicle) => (
              <Grid item xs={3} key={vehicle.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      alt='Car Image'
                      height='140'
                      image={vehicle.imageUrl || '/Images/car-placeholder.jpg'}
                      title='Car Image'
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

          <Modal
            open={modal}
            onClose={() => console.log('modal')}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <p>teste</p>
          </Modal>
        </>
      )}
    </Grid>
  )
}

export default Vehicles
