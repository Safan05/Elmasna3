import express from "express";
import adminController from "../../controllers/adminController.js";
import authToken from "../../middlewares/authmiddleware.js";
import adminAuth from "../../middlewares/adminAuthorize.js";
const adminRouter = express.Router();

//adminRouter.use(authToken);
//adminRouter.use(adminAuth);

adminRouter.get('/users', adminController.getAllUsers);
adminRouter.get('/products', adminController.getAllProducts);
adminRouter.put('/update-role', adminController.updateRole);
adminRouter.delete('/delete-user/:uuid', adminController.deleteUser);
adminRouter.post('/create-user', adminController.createUser);
adminRouter.post('/add-product', (req, res) => {
    // Logic to handle product addition
    res.json({ message: "Product added successfully" });
});
export default adminRouter;
