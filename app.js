const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    let beers = await punkAPI.getBeers();
    console.log('Beers from the database: ', beers);
    res.render('beers', {beers});
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
   try {
    let randomBeers = await punkAPI.getRandom();
    res.render('random-beer', {randomBeers});
  } catch (error) {
    console.log(error);
  }
});

app.get('/', async (req, res) => {
  try {
    let allBears = await punkAPI.getBears();
    console.log('heres the beers', allBeers);
    res.render('index');
  } catch (error) {
    console.log('Error getting the beers', error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
