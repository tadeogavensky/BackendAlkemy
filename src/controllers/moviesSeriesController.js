const db = require("../database/models");
const {
    Op
} = require("sequelize");
const {
    type
} = require("express/lib/response");

const moviesSeriesController = {
    movieList: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.MovieSerie.findAll({
                    where: {
                        deleted: 0,
                        type: 0
                    },
                    attributes: {
                        exclude: ['id', 'rating', 'fkMovieSerie', 'deleted', 'type', 'fkGenre']
                    },
                })
                .then(movies => {
                    console.log('movies', movies);
                    movies.forEach(movies => {
                        movies.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + movies.image
                    });

                    let response = {
                        data: movies
                    }
                    res.json(response);
                }).catch(error => {
                    console.log('error', error)
                })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    serieList: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.MovieSerie.findAll({
                    where: {
                        deleted: 0,
                        type: 1
                    },
                    attributes: {
                        exclude: ['id', 'rating', 'fkMovieSerie', 'deleted', 'type', 'fkGenre']
                    },
                })
                .then(series => {
                    series.forEach(series => {
                        series.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + series.image
                    });

                    let response = {
                        data: series
                    }
                    res.json(response);
                }).catch(error => {
                    console.log('error', error)
                })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    movieDetail: (req, res) => {
        if (req.cookies.token == req.params.token) {

            db.MovieSerieCharacter.findAll({
                attributes: {
                    exclude: ['id', 'fkCharacter', 'fkMovieSerie', 'MovieSerieCharacterId']
                },
                where: {
                    fkMovieSerie: req.params.id,
                },
                include: [{
                        model: db.MovieSerie,
                        as: 'MovieSerie',
                        where: {
                            type: 0
                        }
                    },
                    {
                        model: db.Character,
                        as: 'Character',
                    },
                ]
            }).then(data => {

                let charactersArray = []

                for (let i = 0; i < data.length; i++) {
                    data[i].dataValues.Character.image = 'http://localhost:4000/img/characters/' + data[i].dataValues.Character.image
                    data[i].dataValues.MovieSerie.image = 'http://localhost:4000/img/moviesSeries/' + data[i].dataValues.MovieSerie.image

                    charactersArray.push(data[i].dataValues.Character)

                    data[i].dataValues.Character = charactersArray

                    if (i > 0) {
                        delete data[i].dataValues.Character
                        delete data[i].dataValues.MovieSerie
                    }
                }

                if (data == '') {
                    data = 'The ID in the URL does not correspond to a movie, or it does not exists at all in the database'
                }

                let response = {
                    data
                }

                res.json(response)

            }).catch(error => {
                console.log('error', error);
            })

        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    serieDetail: (req, res) => {
        if (req.cookies.token == req.params.token) {

            db.MovieSerieCharacter.findAll({
                attributes: {
                    exclude: ['id', 'fkCharacter', 'fkMovieSerie', 'MovieSerieCharacterId']
                },
                where: {
                    fkMovieSerie: req.params.id,
                },
                include: [{
                        model: db.MovieSerie,
                        as: 'MovieSerie',
                        where: {
                            type: 1
                        }
                    },
                    {
                        model: db.Character,
                        as: 'Character',
                    },
                ]
            }).then(data => {

                let charactersArray = []

                for (let i = 0; i < data.length; i++) {
                    data[i].dataValues.Character.image = 'http://localhost:4000/img/characters/' + data[i].dataValues.Character.image
                    data[i].dataValues.MovieSerie.image = 'http://localhost:4000/img/moviesSeries/' + data[i].dataValues.MovieSerie.image

                    charactersArray.push(data[i].dataValues.Character)

                    data[i].dataValues.Character = charactersArray

                    if (i > 0) {
                        delete data[i].dataValues.Character
                        delete data[i].dataValues.MovieSerie
                    }
                }

                if (data == '') {
                    data = 'The ID in the URL does not correspond to a serie, or it does not exists at all in the database'
                }

                let response = {
                    data
                }

                res.json(response)

            }).catch(error => {
                console.log('error', error);
            })

        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    searchMovies: (req, res) => {
        let byName = req.query.name
        let byGenre = req.query.genre
        let byOrder = req.query.order

        if (req.cookies.token == req.params.token) {
            if (byName != undefined) {
                db.MovieSerie.findAll({
                    where: {
                        type: 0,
                        title: {
                            [Op.like]: `%${byName}%`
                        }
                    },
                }).then(data => {
                    data.forEach(movie => {
                        movie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + movie.image
                    });
                    res.json(data)
                })
            }


            if (byGenre != undefined) {
                db.MovieSerie.findAll({
                    where: {
                        type: 0,
                        fkGenre: byGenre
                    },
                    include: [{
                        model: db.Genre,
                        as: 'genre'
                    }]
                }).then(data => {
                    res.json(data)
                })
            }


            if (byOrder != undefined) {
                if (byOrder === 'ASC') {
                    db.MovieSerie.findAll({
                        where: {
                            type: 0,
                        },
                        order: [
                            ['id', 'asc']
                        ],
                    }).then(data => {
                        data.forEach(movie => {
                            movie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + movie.image
                        });
                        res.json(data)
                    }).catch(error => {
                        console.log('error', error)
                    })
                } else {
                    db.MovieSerie.findAll({
                        where: {
                            type: 0,
                        },
                        order: [
                            ['id', 'desc']
                        ],
                    }).then(data => {
                        data.forEach(movie => {
                            movie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + movie.image
                        });
                        res.json(data)
                    }).catch(error => {
                        console.log('error', error)
                    })
                }

            }

        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }


    },
    searchSeries: (req, res) => {
        let byName = req.query.name
        let byGenre = req.query.genre
        let byOrder = req.query.order

        if (req.cookies.token == req.params.token) {
            if (byName != undefined) {
                db.MovieSerie.findAll({
                    where: {
                        type: 1,
                        title: {
                            [Op.like]: `%${byName}%`
                        }
                    },
                }).then(data => {
                    data.forEach(serie => {
                        serie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + serie.image
                    });
                    res.json(data)
                })

            }
            if (byGenre != undefined) {
                db.MovieSerie.findAll({
                    where: {
                        type: 1,
                        fkGenre: byGenre
                    },
                }).then(data => {
                    data.forEach(serie => {
                        serie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + serie.image
                    });
                    res.json(data)
                })

            }

            if (byOrder != undefined) {
                if (byOrder == 'ASC') {
                    db.MovieSerie.findAll({
                        where: {
                            type: 1,
                        },
                        order: ['id', 'ASC'],
                    }).then(data => {
                        data.forEach(serie => {
                            serie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + serie.image
                        });
                        res.json(data)
                    })

                } else {
                    db.MovieSerie.findAll({
                        where: {
                            type: 1,
                        },
                        order: ['id', 'DESC'],
                    }).then(data => {
                        data.forEach(serie => {
                            serie.dataValues.image = 'http://localhost:4000/img/moviesSeries/' + serie.image
                        });
                        res.json(data)
                    })

                }

            }
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }

    },
    create: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.MovieSerie.create({
                    title: req.params.title,
                    date: req.params.date,
                    rating: req.params.rating <= 5 ? req.params.rating : res.json('The rating must be up to 5 points'),
                    type: req.params.type,
                    fkGenre: req.params.fkGenre,
                    image: req.params.image,
                    deleted: 0
                })
                .then(movieSerie => {
                    res.json(movieSerie)
                })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    edit: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.MovieSerie.findByPk(req.params.id).then(movieSerieToBeFound => {
                if (movieSerieToBeFound != undefined) {
                    db.MovieSerie.update({
                        title: req.params.title,
                        date: req.params.date,
                        rating: req.params.rating <= 5 ? req.params.rating : res.json('The rating must be up to 5 points'),
                        type: req.params.type,
                        fkGenre: req.params.fkGenre,
                        image: req.params.image,

                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(edited => {
                        console.log('edited', edited.name)
                        let msg = {
                            msg: 'Movie or serie edited successfully',
                            menu: 'http://localhost:4000'
                        }
                        res.json(msg)
                    })
                } else {
                    res.json('Movie or serie not found')
                }
            })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    delete: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.MovieSerie.update({
                    deleted: 1
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(deleted => {
                    res.json('Movie or serie deleted succesfully');
                })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    }


}

module.exports = moviesSeriesController;