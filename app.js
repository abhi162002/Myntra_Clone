const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    name = req.body.name
    email = req.body.email
    phone = req.body.phone
    address = req.body.address
    desc = req.body.desc
    let outputToWrite = `The Name of the Client is ${name}, ${email} Email id, residing at ${address}. More about him/her ${desc}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = { 'message': 'Your form has been submitted sucessfully' }
    $message = "Sucessfull"
    res.status(200).render('contact.pug', params);
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
