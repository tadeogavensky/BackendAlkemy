const path = require('path');
const db = require('../database/models');
const Sequelize = db.sequelize;
const {
    Op,
    where
} = require("sequelize");
const bcrypt = require("bcryptjs");

const characterController = {
    list: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.Character.findAll({
                    where: {
                        deleted: 0
                    },
                    attributes: {
                        exclude: ['id', 'age', 'story', 'weight', 'deleted']
                    }
                })
                .then(characters => {

                    characters.forEach(characters => {
                        characters.dataValues.image = 'http://localhost:4000/img/characters/' + characters.image
                    });

                    let response = {
                        data: characters
                    }
                    res.json(response);
                });
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }

    },
    detail: (req, res) => {
        if (req.cookies.token == req.params.token) {

            db.MovieSerieCharacter.findAll({
                attributes: {
                    exclude: ['id', 'fkCharacter', 'fkMovieSerie', 'MovieSerieCharacterId']
                },
                where: {
                    fkCharacter: req.params.id
                },
                include: [{
                        model: db.Character,
                        as: 'Character',
                    },
                    {
                        model: db.MovieSerie,
                        as: 'MovieSerie',
                    }


                ]
            }).then(data => {



                let moviesSeriesArray = []



                for (let i = 0; i < data.length; i++) {
                    data[i].dataValues.Character.image = 'http://localhost:4000/img/characters/' + data[i].dataValues.Character.image
                    data[i].dataValues.MovieSerie.image = 'http://localhost:4000/img/moviesSeries/' + data[i].dataValues.MovieSerie.image

                    moviesSeriesArray.push(data[i].dataValues.MovieSerie)

                    data[i].dataValues.MovieSerie = moviesSeriesArray

                    if (i > 0) {
                        delete data[i].dataValues.Character
                        delete data[i].dataValues.MovieSerie
                    }
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
    search: (req, res) => {
        let byName = req.query.name
        let byAge = req.query.age
        let byWeight = req.query.weight
        let byMovie = req.query.movie

        if (req.cookies.token == req.params.token) {
            if (byName != undefined) {
                db.Character.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${byName}%`
                        }
                    },
                }).then(data => {
                    data.forEach(character => {
                        character.dataValues.image = 'http://localhost:4000/img/characters/' + character.image
                    });
                    res.json(data)
                })
            }


            if (byAge != undefined) {
                db.Character.findAll({
                    where: {
                        age: byAge
                    },
                }).then(data => {
                    data.forEach(character => {
                        character.dataValues.image = 'http://localhost:4000/img/characters/' + character.image
                    });
                    res.json(data)
                })
            }

            if (byWeight != undefined) {

                db.Character.findAll({
                    where: {
                        weight: byWeight
                    },
                }).then(data => {
                    data.forEach(character => {
                        character.dataValues.image = 'http://localhost:4000/img/characters/' + character.image
                    });
                    res.json(data)
                }).catch(error => {
                    console.log('error', error)
                })
            }

        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }

        if (byMovie != undefined) {
            db.MovieSerieCharacter.findAll({
                where: {
                    fkMovieSerie: byMovie
                },
                attributes: {
                    exclude: ['MovieSerieCharacterId', 'fkMovieSerie', 'fkCharacter', 'id']
                },
                include: [{
                        model: db.MovieSerie,
                        as: 'MovieSerie'
                    },
                    {
                        model: db.Character,
                        as: 'Character'
                    },

                ]
            }).then(data => {

                for (let i = 0; i < data.length; i++) {
                    data[i].dataValues.Character.image = 'http://localhost:4000/img/characters/' + data[i].dataValues.Character.image
                    data[i].dataValues.MovieSerie.image = 'http://localhost:4000/img/moviesSeries/' + data[i].dataValues.MovieSerie.image

                    if (i > 0) {
                        delete data[i].dataValues.MovieSerie
                    }

                }

                res.json(data)
            }).catch(error => {
                res.send(error)
            })
        }


    },
    create: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.Character.create({
                    name: req.params.name,
                    age: req.params.age,
                    weight: req.params.weight,
                    story: req.params.story,
                    image: req.params.image,
                    deleted: 0
                })
                .then(character => {
                    res.json(character)
                })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    },
    edit: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.Character.findByPk(req.params.id).then(characterToBeFound => {
                if (characterToBeFound != undefined) {
                    db.Character.update({
                            name: req.params.name,
                            age: req.params.age,
                            weight: req.params.weight,
                            story: req.params.story,
                            image: req.params.image,

                        }, {
                            where: {
                                id: req.params.id
                            }
                        }).then(editedCharacter => {
                            console.log('edited', editedCharacter.name)
                            let msg = {
                                msg:'Character edited successfully',
                                menu: 'http://localhost:4000'
                            }
                            res.json(msg)
                        })
                } else {
                    res.json('Character not found')
                }
            })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }


    },
    delete: (req, res) => {
        if (req.cookies.token == req.params.token) {
            db.Character.update({
                    deleted: 1
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(deleted => {
                    res.json('Character deleted succesfully');
                })
        } else if (req.cookies.token != req.params.token) {
            res.json('You must enter the correct token')
        }
    }

}

module.exports = characterController;