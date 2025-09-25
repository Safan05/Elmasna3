import express from "express";
import adminController from "../../controllers/adminController.js";
import authToken from "../../middlewares/authmiddleware.js";
import adminAuth from "../../middlewares/adminAuthorize.js";
const adminRouter = express.Router();

adminRouter.get('/users', adminController.getAllUsers);
adminRouter.post('/update-role', adminController.updateRole);
adminRouter.post('/add-product', authToken, adminAuth, (req, res) => {
    // Logic to handle product addition
    res.json({ message: "Product added successfully" });
});
export default adminRouter;
