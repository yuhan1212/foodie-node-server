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

    const updateUser = (req, res) => {
        const updatedUser = req.body;
        userService.updateUser(updatedUser)
            .then((newUser) => {
                res.json(newUser);
            });
    }

    const findAllUsers = (req, res) => {
        userService.findAllUsers()
            .then((users) => {
                res.send(users);
            });
    }

    const findUserById = (req, res) => {
        const targetId = req.params['uid'];
        userService.findUserById(targetId)
            .then((user) => {
                res.send(user);
            })
            .catch(err => console.error(`user not login, findUserById error: ${err}`));
    }

    const findUserByUsername = (req, res) => {
        const targetUser = req.params['username'];
        userService.findUserByUsername(targetUser)
            .then((user) => {
                res.send(user);
            })
            .catch(err => console.error(`user not exit, findUserByUsername error: ${err}`));
    }

    const deleteUserById = (req, res) => {
        const targetId = req.params['uid'];
        userService.deleteUser(targetId)
            .then((profile) => {
                res.json("delete user: " + targetId);
            });
    }

    app.post("/api/register", register);
    app.post("/api/login", login);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/find-by-id/:uid", findUserById);
    app.get("/api/users/find-by-username/:username", findUserByUsername);
    app.delete("/api/users/:uid", deleteUserById);
    app.put("/api/user/update", updateUser);
}