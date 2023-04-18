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
                            req.session["currentUser"] = newUser;
                            res.json(newUser);
                        })
                        .catch(err => console.error(`register error: ${err}`));
                }
            });
    }

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };


    const login = (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        userService.findUserByCredentials(email, password)
            .then(user => {
                if (user) {
                    req.session["currentUser"] = user;
                    res.send(user);
                } else {
                    res.sendStatus(401);
                }
            });
    }

    const findAllUsers = (req, res) => {
        userService.findAllUsers()
            .then((users) => {
                res.send(users);
            });
    }

    const findCurrentUser = (req, res) => {
        const currentUser = req.session['currentUser'];
        if (currentUser) {
            res.json(currentUser);
        } else {
            res.sendStatus(204);
        }
    }

    const findUserById = (req, res) => {
        const targetId = req.params['uid'];
        userService.findUserById(targetId)
            .then((user) => {
                res.send(user);
            })
            .catch(err => console.error(`findUserById error: ${err}`));
    }

    const updateUser = (req, res) => {
        const updatedUser = req.body;
        userService.updateUser(updatedUser)
            .then((newUser) => {
                res.json(newUser);
            });
    }

    const deleteUserById = (req, res) => {
        const id = req.body._id;
        userService.deleteUser(id)
            .then(user => res.json(user));
    }

    app.post("/api/register", register);
    app.post("/api/login", login);
    app.post("/api/users/logout", logout);
    app.get("/api/users", findAllUsers);
    app.get("/api/user", findCurrentUser);
    app.get("/api/users/:uid", findUserById);
    app.put("/api/users/:uid", updateUser);
    app.delete("/api/users", deleteUserById);
};