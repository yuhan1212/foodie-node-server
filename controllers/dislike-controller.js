module.exports = (app) => {
    const dislikeService = require('../database/dislike/dislike-dao');

    const isDislike = (req, res) => {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        dislikeService.isDislike(userId, recipeId).then(count => {
            if (count <= 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    }

    const findDislikesByUserId = (req, res) => {
        const userId = req.params.userId;
        dislikeService.findDislikesByUserId(userId)
            .then(dislike => res.json(dislike));
    }

    const addDislike = (req, res) => {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const username = req.body.username;
        const recipeName = req.body.recipeName;
        const recipeImg = req.body.recipeImg;
        dislikeService.addDislike(userId, recipeId, username, recipeName, recipeImg)
            .then(dislike => res.json(dislike));
    }

    const removeDislike = (req, res) => {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        dislikeService.removeDislike(userId, recipeId)
            .then(dislike => res.json(dislike));
    }

    const findAllDislikes = (req, res) => {
        dislikeService.findAllDislikes()
            .then((dislikes) => {
                res.send(dislikes);
            });
    }

    app.get('/api/dislike/:recipeId/:userId', isDislike);
    app.get('/api/dislike/:userId', findDislikesByUserId);
    app.post('/api/dislike', addDislike);
    app.delete('/api/dislike', removeDislike);
    app.get('/api/dislike', findAllDislikes);
}
