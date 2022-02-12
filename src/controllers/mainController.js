const mainController = {
    index: (req, res) => {
        let menu = {
            message: 'Hi to start please login or register to get access to a token, your password will be encrypted or decrypted',
            login: 'http://localhost:4000/user/login?user=&password= ' + ',set your data via the URL`s queries',
            register: 'http://localhost:4000/user/register?user=&password= ' + ',set your data via the URL`s queries',

            characters: 'http://localhost:4000/characters/:token',
            movies: 'http://localhost:4000/movies/:token',
            series: 'http://localhost:4000/series/:token',



        }
        res.json(menu)
    },
    checkToken: (req, res) => {
        let userToken = req.cookies.token
        if (userToken == undefined) {
            res.json('Please login or register to get access to a token')
        } else {
            res.json(userToken)
        }
    }

}

module.exports = mainController;