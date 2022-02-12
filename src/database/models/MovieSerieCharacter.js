module.exports = (sequelize, dataTypes) => {
    let alias = 'MovieSerieCharacter';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fkCharacter: {
            type: dataTypes.INTEGER,
        },
        fkMovieSerie: {
            type: dataTypes.INTEGER,
        },

    };
    let config = {
        tableName: 'moviesseriescharacters',
        timestamps: false,
    };
    const MovieSerieCharacter = sequelize.define(alias, cols, config)

    MovieSerieCharacter.associate = function (models) {
        MovieSerieCharacter.belongsTo(models.Character, {
            as: 'Character',
            foreignKey: 'fkCharacter'
        });
        MovieSerieCharacter.belongsTo(models.MovieSerie, {
            as: 'MovieSerie',
            foreignKey: 'fkMovieSerie'
        });
    }

    return MovieSerieCharacter;
}