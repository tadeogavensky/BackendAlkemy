module.exports = (sequelize, dataTypes) => {
    let alias = 'MovieSerie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(100)
        },
        date: {
            type: dataTypes.DATEONLY
        },
        image: {
            type: dataTypes.STRING(255)
        },
        fkGenre: {
            type: dataTypes.INTEGER
        },
        deleted: {
            type: dataTypes.BOOLEAN
        }
    };
    let config = {
        tableName: 'moviesseries',
        timestamps: false,
    };
    const MovieSerie = sequelize.define(alias, cols, config)

    MovieSerie.associate = function (models) {
        MovieSerie.belongsToMany(models.MovieSerieCharacter, {
            through: 'MovieSerieCharacter',
            foreignKey: 'fkMovieSerie'
        })
        MovieSerie.hasOne(models.Genre, {
            as: 'genre',
            foreignKey: 'id'
        })
    }

    return MovieSerie;
}