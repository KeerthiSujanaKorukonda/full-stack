const express = require('express');
const router = express.Router();
const axios = require('axios'); 

const API_KEY = 'YOUR_API_KEY';   //Change this with your api key
router.use(express.static('public'));

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard', cars: [], errorMessage: '' });
});

router.post('/search', async (req, res) => {
  const { carModel } = req.body; 

  try {
    const response = await axios.get(`YOUR_API_LINK`, {   //change this line with your api link
      headers: { 'X-Api-Key': API_KEY }
    });

    const cars = response.data; 
    if (cars.length === 0) {
      return res.render('dashboard', { title: 'Dashboard', cars: [], errorMessage: 'No cars found for the specified model' });
    }

    res.render('dashboard', { title: 'Dashboard', cars: cars, errorMessage: '' });

  } catch (error) {
    console.error('Error fetching car details:', error);
    res.render('dashboard', { title: 'Dashboard', cars: [], errorMessage: 'Failed to fetch car details. Please try again later.' });
  }
});

module.exports = router;