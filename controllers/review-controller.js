module.exports = (app) => {
    const reviewService = require("../database/review/review-dao");

    const createReviewForMeal = (req, res) => {
        const review = req.body;
        const mealId = review.mealId;
        const textArea = review.textArea;
        const username = review.username;
        const mealName = review.mealName;
        const mealImg = review.mealImg;
        const userId = review.userId;
        reviewService.createReviewForMeal(mealId, textArea, username, mealName, mealImg, userId)
            .then(review => res.json(review));
    };

    const findAllReviews = (req, res) => {
        reviewService.findAllReviews()
            .then((reviews) => {
                res.send(reviews)
            });
    };

    const findReviewById = (req, res) => {
        const reviewId = req.params['reviewId']
        reviewService.findReviewById(reviewId)
            .then(review => {
                res.json(review)
            });
    };

    const findReviewsByMeal = (req, res) => {
        const mealId = req.params['mealId']
        reviewService.findReviewsByMeal(mealId)
            .then((reviews) => {
                res.send(reviews)
            });
    };

    const deleteReview = (req, res) => {
        const mealId = req.params["mealId"];
        const reviewId = req.params["reviewId"];
        reviewService.deleteReview(mealId, reviewId)
            .then(review => res.json(review));
    };

    const findReviewsByUsername = (req, res) => {
        const username = req.params["username"];
        reviewService.findReviewsByUsername(username)
            .then(reviews => res.json(reviews));
    };

    app.post("/api/reviews/:mealId", createReviewForMeal);
    app.get("/api/reviews", findAllReviews);
    app.get('/api/internal/reviews/:reviewId', findReviewById);
    app.get("/api/reviews/:mealId", findReviewsByMeal);
    app.get("/api/reviews/username/:username", findReviewsByUsername);
    app.delete("/api/reviews/:mealId/:reviewId", deleteReview);
};