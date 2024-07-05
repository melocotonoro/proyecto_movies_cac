const pool = require("./connectionMysql.js");
const dbUser= require("../data/users.json")
const fs = require('fs');



const readFiles = (dbUser) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbUser, 'utf-8', (err, data) => {
            if (err) return reject(err);
            try {
                const parsedData = JSON.parse(data);
                resolve(parsedData);
            } catch (err) {
                throw err; 
            }
        });
    });
};


const getUsers = async (req, res) => {
    try {
        const users = await readFiles('./data/users.json');
        res.json(users);
} 
    catch (err) {
        res.status(500).json({ error: 'No users list were found matching your selection.' });
}
};

const getUsersByID= async (req,res)=>{
    try{
        const read_user= await readFiles("./data/users.json");
        const user_ID= read_user.find(index=> index.UserID == req.params.id)
            if(!user_ID) res.status(404).json({error: 'User not found'});
                res.json(user_ID)
}
    catch(err){
        res.status(500).json({err:'Internal server error'})
}
};

const writeFiles = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), 
        (err) => {
            if (err) return reject(err);
            resolve();
        })
    });
};


const createUsers= async (req,res) =>{
    try {
        const users = await readFiles('./data/users.json');
        const newUser= req.body;
        users.push(newUser);
        await writeFiles('./data/users.json', users);
        res.status(201).json(newUser);
    } 
    catch (err) {
        res.status(500).json({ error: 'Error loading data' });
    }
};


module.exports={getUsers,getUsersByID,createUsers}