/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useSnackbar } from 'notistack'
import CompanyService from '../../services/CompanyService'
import CompanyModel from '../../Models/Company'
import { useForm } from 'react-hook-form'
import { userDataContext } from '../../context/UserData'
import { Button, ButtonGroup, makeStyles, Paper } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
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
}))

export default function Company() {
  const [company, setCompany] = useState<CompanyModel | null>(null)
  const { register, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useContext(userDataContext)
  const classes = useStyles()
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
    <Grid container spacing={3}>
      {company && (
        <Paper className={classes.container}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Grid item xs={12} sm={12}>
              <TextField
                defaultValue={company.name}
                id='name'
                name='name'
                label='Nome da empresa'
                fullWidth
                inputRef={register}
                autoComplete='given-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                defaultValue={company.email}
                id='email'
                name='email'
                label='Email'
                fullWidth
                inputRef={register({ required: true })}
                autoComplete='shipping address-line1'
                className={classes.input}
                required
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonGroup}>
              <ButtonGroup>
                <Button variant='contained' color='primary' type='submit'>
                  Salvar
                </Button>
              </ButtonGroup>
            </Grid>
          </form>
        </Paper>
      )}
    </Grid>
  )
}
