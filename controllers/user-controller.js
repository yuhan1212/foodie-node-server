module.exports = (app) => {
    const userService = require("../database/user/user-dao");

    const register = async (req, res) => {
        const credentials = req.body;
        userService.findUserByEmail(credentials.email)
            .then((actualUser) => {
                if(actualUser.length > 0) {
                    res.sendStatus(409);
                } else {
                    userService.register(credentials)
                        .then((newUser) => {
                            res.json(newUser);
                        })
                        .catch(err => console.error(`register error: ${err}`));
                }
            });
    }

    const login = (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        userService.findUserByCredentials(email, password)
            .then(user => {
                if (user) {
                    res.send(user);
                } else {
                    res.sendStatus(401);
                }
            });
    }

    app.post("/api/register", register);
    app.post("/api/login", login);
};