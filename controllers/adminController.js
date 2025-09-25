import userQueries from "../models/userQueries.js";

const getAllUsers = async (req, res) => {
    try{
        const users = await userQueries.getAllUsers();
        res.status(200).json(users);
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
export default { getAllUsers, updateRole };