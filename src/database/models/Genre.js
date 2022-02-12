module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100)
        },
        image: {
            type: dataTypes.STRING(255)                 
        },

        deleted:{
            type: dataTypes.BOOLEAN   
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: false,
    };
    const Genre = sequelize.define(alias, cols, config)

     Genre.associate = function(models){
        Genre.hasMany(models.MovieSerie,{
            as: 'movieSerie',
            foreignKey: 'fkGenre'
        })
    } 

    return Genre;
}