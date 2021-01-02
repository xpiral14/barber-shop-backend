import React from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import InnerContainer from '../Styles/InnerContainer'
import ApartmentIcon from '@material-ui/icons/Apartment'

// Get the document height
const ScreenHeight = window.innerHeight - 20
console.log(ScreenHeight)

const useStyles = makeStyles(() => ({
  buttonWithIcon: {
    width: '100%',
    textAlign: 'left',
    justifyContent: 'left',
    padding: '10px 5px',
  },

  buttonIcon: {
    paddingRight: '15px',
  },

  innerContainer: {
    backgroundColor: '#ffffff',
    maxWidth: '240px',
    textAlign: 'left',
    height: String(ScreenHeight + 'px !important'),
  },
}))

// Actual component
const NavigationBar: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='row'
      justify='flex-start'
      alignItems='flex-start'
    >
      <InnerContainer className={classes.innerContainer}>
        <Button className={classes.buttonWithIcon}>
          <ApartmentIcon className={classes.buttonIcon} />
          Minha Empresa
        </Button>

        <Button className={classes.buttonWithIcon}>
          <ApartmentIcon className={classes.buttonIcon} />
          Serviços
        </Button>

        <Button className={classes.buttonWithIcon}>
          <ApartmentIcon className={classes.buttonIcon} />
          Estoque de Peças
        </Button>

        <Button className={classes.buttonWithIcon}>
          <ApartmentIcon className={classes.buttonIcon} />
          Veículos
        </Button>

        <Button className={classes.buttonWithIcon}>
          <ApartmentIcon className={classes.buttonIcon} />
          Ordens de Serviço
        </Button>

        <Button className={classes.buttonWithIcon}>
          <ApartmentIcon className={classes.buttonIcon} />
          Clientes
        </Button>
      </InnerContainer>
    </Grid>
  )
}

export default NavigationBar
