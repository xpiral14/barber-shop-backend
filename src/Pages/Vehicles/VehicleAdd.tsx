/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonGroup, Paper } from '@material-ui/core'
import { Button, Card, Grid, IconButton } from '@material-ui/core/'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link, { LinkProps } from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Save as SaveIcon
} from '@material-ui/icons/'
import { useSnackbar } from 'notistack'
import { default as React, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import { userDataContext } from '../../context/UserData'
import CompanyModel from '../../Contracts/Models/Company'
import Vehicle from '../../Contracts/Models/Vehicle'
import CompanyService from '../../services/CompanyService'
import VehicleService from '../../services/VehicleService'

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
  card: {
    width: '100%',
    height: '100%',
    padding: '2rem',
  },
  container: {
    padding: theme.spacing(2),
    width: '100%',
  },
  input: {
    marginTop: theme.spacing(2),
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
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
}))

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
)

const VehicleAdd: React.FC = () => {
  //eslint-disable-next-line
  const history = useHistory()
  const match = useRouteMatch<{ vehicleId: string }>()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [company, setCompany] = useState<CompanyModel | null>(null)
  const { register, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useContext(userDataContext)
  const classes = useStyles()

  useEffect(() => {
    (async function () {
      const vehicle = await VehicleService.getOne(+match.params.vehicleId)
      setVehicle(vehicle)
    })()
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

  return (
    <Grid container spacing={3} className={classes.grid}>
      {vehicle && (
        <>
          <Grid container xs={12} alignItems='center'>
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
                <LinkRouter color='inherit' to='/veiculos'>
                  Veículos
                </LinkRouter>
                <LinkRouter
                  color='inherit'
                  to={`/veiculos/detalhes/${vehicle.id}`}
                >
                  {`${vehicle?.make} ${vehicle?.model}`}
                </LinkRouter>
                <EditIcon />
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
                {company && (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: '100%' }}
                  >
                    <Grid item xs={12} sm={12}>
                      <TextField
                        defaultValue={vehicle.make}
                        id='make'
                        name='make'
                        label='Marca'
                        fullWidth
                        inputRef={register}
                        autoComplete='given-name'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        defaultValue={vehicle.model}
                        id='model'
                        name='model'
                        label='Modelo'
                        fullWidth
                        inputRef={register({ required: true })}
                        autoComplete='shipping address-line1'
                        className={classes.input}
                        required
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        defaultValue={vehicle.year}
                        id='model'
                        name='model'
                        label='Ano Fabricação'
                        inputRef={register({ required: true })}
                        autoComplete='shipping address-line1'
                        className={classes.input}
                        required
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        defaultValue={vehicle.yearModel}
                        id='model'
                        name='model'
                        label='Ano Modelo'
                        inputRef={register({ required: true })}
                        autoComplete='shipping address-line1'
                        className={classes.input}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.buttonGroup}>
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<SaveIcon />}
                        onClick={() => window.alert('clicado')}
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </form>
                )}
              </div>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default VehicleAdd
