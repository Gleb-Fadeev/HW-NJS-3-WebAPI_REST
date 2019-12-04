const { Router } = require('express');
const filmRepo = require('../repo/film.repo');

const router = new Router();

router.get('/', async(_request, response) => {
    const films = await filmRepo.getAll();
    response.render('pages/films/view', {films});
});

router.get('/add', (_request, response) => {
    response.render('pages/films/add');
})

router.post('/add', async (request, response) => {
    const film = {
        id : Date.now().toString(),
        ...request.body
    }
    await filmRepo.add(film);
    response.redirect('/films');
});

router.get('/update/:id', async(_request, response) => {
    const films = await filmRepo.getAll();
    console.log(_request.params.id);
    
    const film = films.find(f => f.id === _request.params.id);
    response.render('pages/films/update', {film});
})

router.post('/update', async (request, response) => {
    await filmRepo.update(request.body);
    response.redirect('/films');
});

router.delete('/:id', async (request, response) => {
    console.log(request.params);
    
    await filmRepo.delete(request.params.id);
    response.end();
});
module.exports = router;