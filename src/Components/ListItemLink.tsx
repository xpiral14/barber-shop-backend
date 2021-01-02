import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ListItemLinkProps = {
  icon?: ReactNode
  primary: ReactNode
  to: any,
}
const ListItemLink: React.FC<ListItemLinkProps> = ({ icon, primary, to }) => {
  const CustomLink = (props: any) => <Link to={to} {...props} />

  return (
    <li>
      <ListItem button component={CustomLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}


export default ListItemLink