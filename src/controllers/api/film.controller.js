const { Router } = require('express');
const filmRepo = require('../../repo/film.repo');

const router = new Router();

router.get('/', async (_request, response) => {
    const films = await filmRepo.getAll();
    response.json(films);
});

router.get('/:id', async(request, response) => {
    const film = await filmRepo.get(request.params.id);
    if(film){
        response.json(film);
        return;
    }

    response.status(404);
})

router.post('/', async (request, response) => {
    const film = await filmRepo.add(request.body);
    response
        .status(201)
        .json(film);
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
});

router.get('/update/:id', async(_request, response) => {
    const films = await filmRepo.getAll();
    console.log(_request.params.id);
    
    const film = films.find(f => f.id === _request.params.id);
})

router.post('/update', async (request, response) => {
    await filmRepo.update(request.body);
});

router.delete('/:id', async (request, response) => {
    console.log(request.params);
    
    await filmRepo.delete(request.params.id);
    response.end();
});


module.exports = router;