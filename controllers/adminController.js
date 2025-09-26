import userQueries from "../models/userQueries.js";

const getAllUsers = async (req, res) => {
    try{
        const users = await userQueries.getAllUsers();
        const customers_count = await userQueries.getCustomerCount();
        const admins_count = await userQueries.getAdminCount();
        const merchants_count = users.length - customers_count - admins_count;
        console.log(users);
        res.status(200).json({
            users: users,
            users_count: users.length,
            customers_count: customers_count,
            merchants_count: merchants_count,
            admins_count: admins_count
        });
    }catch(error){
        res.status(500).json({ message: "Error fetching users" });  
    }
}

const updateRole = async (req, res) => {
    const { uuid, role } = req.body;
    if (!uuid || !role) {
        return res.status(400).json({ message: "UUID and role are required" });
    }
    try{
        await userQueries.updateRole(uuid, role);
        res.status(200).json({ message: "User role updated successfully" });
    }catch(error){
        res.status(500).json({ message: "Error updating user role" });
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await productQueries.getAllProducts();
        res.status(200).json({
            products: products,
            products_count: products.length
        });
    }catch(error){
        res.status(500).json({ message: "Error fetching products" });  
    }   
}

const deleteUser = async (req, res) => {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(400).json({ message: "UUID is required" });
    }
    try{
        await userQueries.deleteUser(uuid);
        res.status(200).json({ message: "User deleted successfully" });
    }catch(error){
        res.status(500).json({ message: "Error deleting user" });
    }
}

const createUser = async (req, res) => {
    const { email, name, password, role } = req.body;
    if (!email || !name || !password || !role) {
        return res.status(400).json({ message: "Email, name, password, and role are required" });
    }
    try{
        const existingUser = await userQueries.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        const userUuid = await userQueries.createUser(email, name, password, role);
        res.status(201).json({ message: "User created successfully", uuid: userUuid });
    }catch(error){
        res.status(500).json({ message: "Error creating user" });
    }
}

export default { getAllUsers, updateRole, getAllProducts, deleteUser, createUser };