import React from 'react'
import ListItemLink from './ListItemLink'
import BusinessIcon from '@material-ui/icons/Business'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import ReceiptIcon from '@material-ui/icons/Receipt'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import BuildIcon from '@material-ui/icons/Build'

export const mainListItems = (
  <div>
    <ListItemLink primary = "Minha empresa" to = "/empresa" icon = {<BusinessIcon />} />

    <ListItemLink primary = "Clientes" to ="/clientes" icon = {<PeopleIcon />} />
    <ListItemLink primary = "Ordem de serviço" to ="/ordens-servico" icon = {<ReceiptIcon />} />
    <ListItemLink primary = "Estoque de peças" to ="/pecas" icon = {<BuildIcon />} />
    <ListItemLink primary = "Veículoss" to ="/veiculos" icon = {<DirectionsCarIcon />} />
    <ListItemLink primary = "Estatísticas" to ="/estatisticas" icon = {<BarChartIcon />} />
  </div>
)
