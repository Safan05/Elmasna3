import express from "express";
const usersRouter = express.Router();

usersRouter.post('/add-photo', (req, res) => {
    // Logic to handle photo upload
    res.json({ message: "Photo uploaded successfully" });
});

export default usersRouter;