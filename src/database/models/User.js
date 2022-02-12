module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(100)
        },
        password:{
             type: dataTypes.TEXT                        
        },
        deleted:{
            type: dataTypes.BOOLEAN   
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false,
    };
    const User = sequelize.define(alias, cols, config)

    return User;
}