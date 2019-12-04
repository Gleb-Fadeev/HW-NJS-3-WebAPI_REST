const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(path.dirname(require.main.filename), '..', 'data', 'films.json');

const filmsRepo = {
    async getAll() {
        return await readJsonFile(FILE_PATH) || [];
    },
    async add(film) {
        const films = await this.getAll();
        films.push(film);
        await writeJsonFile(FILE_PATH, films);
    },
    async update(film){
        const films = await this.getAll();
        const updFilms = films.map(f => {//Проходит по массиву заменяя 1 элемент который пришёл
            if(f.id === film.id){
                return film; 
            }
            return f;
        });
        console.log(updFilms);
        
        
        await writeJsonFile(FILE_PATH, updFilms);
    },
    async delete(filmId){
        const films = await this.getAll();
        
        const updFilm = films.filter(f => {
            if(filmId === f.id){
                
                return false;
            }
            return true;
        })
        await writeJsonFile(FILE_PATH, updFilm);
    }
};

module.exports = filmsRepo;