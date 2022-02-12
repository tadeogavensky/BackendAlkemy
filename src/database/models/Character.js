module.exports = (sequelize, dataTypes) => {
    let alias = 'Character';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50)
        },
        age: {
            type: dataTypes.INTEGER                   
        },
        weight: {
            type: dataTypes.FLOAT                  
        },
        story: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING(255)                 
        },
        deleted:{
            type: dataTypes.BOOLEAN   
        }
    };
    let config = {
        tableName: 'characters',
        timestamps: false,
    };
    const Character = sequelize.define(alias, cols, config)

    Character.associate = function(models){
        Character.belongsToMany(models.MovieSerieCharacter,{
          through: 'MovieSerieCharacter',
          foreignKey: 'fkCharacter',
        })
    } 

    return Character;
}