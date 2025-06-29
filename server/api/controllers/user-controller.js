import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user-model.js";
import Code from "../models/code-model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const GetAllUsers = async (_, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

export const CreateUser = async (req, res) => {
    try {
    const { phone, code } = req.body;

    if (!phone || !code) {
        return res.status(400).json({ message: 'Phone and code are required' });
    }
    const existingCode = await Code.findOne({ code, used: false });
    if (!existingCode) {    
        return res.status(400).json({ message: 'Invalid or already used code' });
    }
    const existingUser = await User.find ({ phone });
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    existingCode.used = true;   
    existingCode.user = phone; 
    const newUser = new User({ phone, code });
    await newUser.save();
    await existingCode.save();

    res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const ClearUsers = async (_, res) => {
    try {
        await User.deleteMany({});
        console.log('All users cleared successfully');
        res.status(200).json({ message: 'All users cleared successfully' });
    } catch (error) {
        console.error('Error clearing users:', error);
        res.status(500).json({ message: 'Error clearing users', error });
    }
}


export const DownloadJsonData = async (_, res) => {
  try {
    const users = await User.find();

    const jsonData = JSON.stringify(users, null, 2); 

    res.setHeader("Content-Disposition", "attachment; filename=users.json");
    res.setHeader("Content-Type", "application/json");

    res.send(jsonData); 
  } catch (error) {
    res.status(500).json({ message: "Error generating JSON", error });
  }
};

