// Using the express library
const express = require('express')
// Using the mustache express library
const mustacheExpress = require('mustache-express')

// Bring in our data (find it in the current directory (e.g. './') named 'data.js')
const userDirectory = require('./data')

// Build the express app
const app = express()

// Teach our app to use the mustache engine for rendering templates
// rendering = "draw" our HTML
app.engine('mst', mustacheExpress())

// Teach our app what directory to f\ind our views (templates) live
app.set('views', './views')

// Teach our app to use mustache for our templates
app.set('view engine', 'mst')

// Teach our app to use 'public' for all public static assets (CSS, client side JavaScript, images, videos, fonts, etc.)
app.use(express.static('public'))

// Get me information about the person who has id (:id, e.g. /info/1, /info/2, etc.)
app.get('/info/:id', (request, response) => {
  // First, get the `id` from the params (from the URL), this comes from the `:id` part
  const requestId = parseInt(request.params.id)

  // Lets see what the params id is
  console.log(`request.params.id is ${request.params.id}`)
  // Lets see what the parseInt-ed value is
  console.log(`requestId is ${requestId}`)

  // Use `find` to search our userDirectory.users array for the user with that ID
  // Eventually we will use a database for this! EXCITE!!!!
  const foundUser = userDirectory.users.find(user => user.id === requestId)

  // Render (draw) the info mustache template, *USING* the `foundUser` object
  response.render('info', foundUser)
})

app.get('/', (request, response) => {
  // sending content to the browser from javascript land
  // response.send('Hello, World. We are reloading!')

  response.render('home', userDirectory)
})

app.listen(3000, () => {
  console.log('Hooray, our app is listening on port 3000')
})

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
