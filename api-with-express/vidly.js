const Joi = require('joi');
const express = require('express')

const app = express();
app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Darama' },
    { id: 3, name: 'Comedy' },
];

//landing page
app.get('/', (req, res) => res.send(`<h1 style='text-align:center;'>Landing Page</h1 style=>`));

// list of genres
app.get('/api/genres', (req, res) => res.send(genres));

//get single genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre Not Found!');
    res.send(genre);
});
//create genere
app.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);

})
//update genre

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre Not Found!');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});
//delete genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre Not Found!');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

//search

//validate genre

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre)
}




const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening at port ${port}...`));

