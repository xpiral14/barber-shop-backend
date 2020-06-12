import 'dotenv/config'
import app from './App'


const port = process.env.APP_PORT
const appURL = process.env.APP_URL

app.listen(port, () => console.log(`App running on ${appURL}:${port}`))