const { default: axios } = require('axios');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {

    let url = 'https://api.themoviedb.org/3/movie/763165?api_key=4ca94f8b470d7e34bd3f59c3914295c8';
    axios.get(url)

    .then (response => {
    let data = response.data;
    let releaseDate = new Date(data.release_date).getFullYear(); 
    let currentYear = new Date().getFullYear();
    const message = 'Find me to discuss movie';
    let genresToDisplay = '';
    data.genres.forEach(genre => {
        genresToDisplay = genresToDisplay + `${genre.name}, `;
    });
    let genresUpdated = genresToDisplay.slice(0, -2) + '.';

    let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;

    // console.log(data.title);
    
    res.render('index', {dataToRender: data, year: currentYear, releaseYear: releaseDate, message, genres: genresUpdated, poster:posterUrl});
    });
});

// app.get('/about', (request, response) => {
//     response.send('Hello Hello');
// });

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening port 3000')
}); 