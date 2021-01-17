import {
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core/'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Divider from '@material-ui/core/Divider'
import Link, { LinkProps } from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
  ArrowBack as ArrowBackIcon,
  Cancel as CancelIcon,
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Save as SaveIcon,
} from '@material-ui/icons/'
import { useSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { default as NumberFormat } from 'react-number-format'
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import InputMask from '../../Components/InputMask'
import { userDataContext } from '../../context/UserData'
import { fuelType } from '../../Contracts/Enums'
import CompanyModel from '../../Contracts/Models/Company'
import Vehicle from '../../Contracts/Models/Vehicle'
import CompanyService from '../../services/CompanyService'
import VehicleService from '../../services/VehicleService'
import formatLicensePlate from '../../Util/formatLicensePlate'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
    maxWidth: 345,
  },
  grid: {
    height: '100%',
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  input: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divFormTextField: {
    display: 'flex',
  },
}))

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
)

const VehicleDetails: React.FC = () => {
  const history = useHistory()
  const match = useRouteMatch<{ vehicleId: string }>()
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)
  const [vehicleEditMode, setVehicleEditMode] = useState(false)
  const [company, setCompany] = useState<CompanyModel | null>(null)
  const { register, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useContext(userDataContext)
  const classes = useStyles()

  const maskFirst = /((^\d{1,3})(\.|,))+?/gm

  useEffect(() => {
    setTimeout(() => {
      (async function () {
        const vehicle = await VehicleService.getOne(+match.params.vehicleId)
        setVehicle(vehicle)
      })()
    }, 400)
  }, [])

  useEffect(() => {
    (async function () {
      try {
        const companyData = await CompanyService.getOne(user!.companyId)
        setCompany(companyData)
      } catch (error) {
        enqueueSnackbar('Não foi possível obter os dados da empresa')
      }
    })()
  }, [])

  const onSubmit = async (data: any) => {
    try {
      await CompanyService.update(user?.companyId, data)
      enqueueSnackbar('Empresa atualizada com sucesso!', { variant: 'success' })
    } catch (error) {
      if (error.response) {
        error.response.data.errors.forEach((err: any) => {
          enqueueSnackbar(err.message, { variant: 'error' })
        })
      }
    }
  }

  const handleButtonSaveVehicleDetailsOnClick = async () => {
    try {
      await VehicleService.update(vehicle?.id, vehicle)
      setVehicleEditMode(false)
      enqueueSnackbar('Veículo atualizado com sucesso!', { variant: 'success' })
    } catch (error) {
      if (error.response) {
        error.response.data.errors.forEach((err: any) => {
          enqueueSnackbar(err.message, { variant: 'error' })
        })
      }
    }
  }

  const handleButtonDeleteVehicleOnClick = async () => {
    try {
      await VehicleService.delete()
      enqueueSnackbar('Veículo deletado com sucesso!', { variant: 'success' })
      history.goBack()
    } catch (error) {
      if (error.response) {
        error.response.data.errors.forEach((err: any) => {
          enqueueSnackbar(err.message, { variant: 'error' })
        })
      }
    }
  }

  const handleButtonCancelEditVehicleDetailsOnClick = () => {
    setVehicleEditMode(false)
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid container xs={12} alignItems='center'>
        <div>
          <IconButton aria-label='backOnePage' onClick={() => history.goBack()}>
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
            <span className={classes.breadcrumbCurrent}>
              {vehicle ? `${vehicle?.make} ${vehicle?.model}` : ''}
            </span>
          </Breadcrumbs>
        </div>
      </Grid>

      {vehicle ? (
        <>
          <Grid item xs={12} sm={6} style={{ height: '372px' }}>
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
              {!vehicleEditMode ? (
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
                        Placa:{' '}
                        <b>{formatLicensePlate(vehicle?.licensePlate)}</b>
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
                        onClick={() => window.alert('prop')}
                      >
                        Proprietário
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant='contained'
                        color='secondary'
                        startIcon={<DeleteForeverIcon />}
                        onClick={handleButtonDeleteVehicleOnClick}
                      >
                        Excluir
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<EditIcon />}
                        onClick={() => setVehicleEditMode(true)}
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      {company && (
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          style={{ width: '100%' }}
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <TextField
                                defaultValue={vehicle?.make}
                                id='make'
                                name='make'
                                label='Marca'
                                fullWidth
                                className={classes.input}
                                inputRef={register}
                                autoComplete='given-name'
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    make: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                defaultValue={vehicle?.model}
                                id='model'
                                name='model'
                                label='Modelo'
                                fullWidth
                                inputRef={register({ required: true })}
                                autoComplete='shipping address-line1'
                                className={classes.input}
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    model: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <TextField
                                defaultValue={vehicle?.year}
                                id='model'
                                name='model'
                                label='Ano Fabricação'
                                inputRef={register({ required: true })}
                                autoComplete='shipping address-line1'
                                className={classes.input}
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    year: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                defaultValue={vehicle?.yearModel}
                                id='model'
                                name='model'
                                label='Ano Modelo'
                                inputRef={register({ required: true })}
                                autoComplete='shipping address-line1'
                                className={classes.input}
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    yearModel: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <TextField
                                defaultValue={vehicle?.color}
                                id='make'
                                name='make'
                                label='Cor'
                                fullWidth
                                className={classes.input}
                                inputRef={register}
                                autoComplete='given-name'
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    color: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                defaultValue={formatLicensePlate(
                                  vehicle?.licensePlate
                                )}
                                id='model'
                                name='model'
                                label='Placa'
                                fullWidth
                                inputRef={register({ required: true })}
                                autoComplete='shipping address-line1'
                                className={classes.input}
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    licensePlate: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <InputMask
                                defaultValue={vehicle?.kmDriven}
                                id='make'
                                name='make'
                                label='Quilometragem'
                                fullWidth
                                className={classes.input}
                                inputRef={register}
                                autoComplete='given-name'
                                required
                                variant='standard'
                                mask={[maskFirst]}
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    kmDriven: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                defaultValue={vehicle?.fuelType}
                                id='model'
                                name='model'
                                label='Combustível'
                                fullWidth
                                inputRef={register({ required: true })}
                                autoComplete='shipping address-line1'
                                className={classes.input}
                                required
                                onChange={(
                                  evt: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setVehicle((prev: any) => ({
                                    ...prev,
                                    fuelType: evt.target.value,
                                  }))
                                }}
                              />
                            </Grid>
                          </Grid>

                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'space-between',
                              marginTop: '2rem',
                            }}
                          >
                            <Button
                              variant='contained'
                              color='secondary'
                              startIcon={<CancelIcon />}
                              onClick={
                                handleButtonCancelEditVehicleDetailsOnClick
                              }
                            >
                              Cancelar
                            </Button>

                            <Button
                              variant='contained'
                              color='primary'
                              startIcon={<SaveIcon />}
                              onClick={handleButtonSaveVehicleDetailsOnClick}
                            >
                              Salvar
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </>
                </div>
              )}
            </Card>
          </Grid>
        </>
      ) : (
        <Grid
          container
          justify='center'
          alignItems='center'
          style={{ marginTop: '5rem', marginBottom: '5rem' }}
        >
          <CircularProgress color='primary' size={'4rem'} />
        </Grid>
      )}
    </Grid>
  )
}

export default VehicleDetails
