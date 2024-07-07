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
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) return reject(err);
            resolve();
        })
    });
};


const createUsers= async (req,res) =>{
    try {
        const users = await readFiles('./data/users.json');
        const newUser= {
            UserID: users.length+1,
            Name:req.body.Name,
            Surname: req.body.Surname,
            Email: req.body.Email,
            Password:req.body.Password,
            Birthday:req.body.Birthday,
            ProfilePicture:req.body.ProfilePicture,
            Countries_CountryID:req.body.Countries_CountryID
        }
        
        users.push(newUser);
        await writeFiles('./data/users.json', users);
        res.status(201).json(newUser);
    } 
    catch (err) {
        res.status(500).json({ err: 'Error loading data' });
    }
};

const updateUsers= async (req,res)=>{
try{
    const read_user= await fs.readFile('./data/users.json');
const id_User=parseInt(req.params.id)

const search_Id= read_user.findIndex(i=>i.UserID === id_User)

const new_files= {
    UserID: req.body.UserID,
    Name:req.body.Name,
    Surname: req.body.Surname,
    Email: req.body.Email,
    Password:req.body.Password,
    Birthday:req.body.Birthday,
    ProfilePicture:req.body.ProfilePicture,
    Countries_CountryID:req.body.Countries_CountryID
}

if(!search_Id) res.status(404).json({err:"User no fount. Try again"});



read_user[search_Id]={...read_user[search_Id], ...new_files};

await fs.writeFile('./data/users.json',readFiles)

res.json(read_user[search_Id])

}
catch(err){
    res.status(500).json({err:'Files users no update.Try again'})
}
}




module.exports={getUsers,getUsersByID,createUsers,updateUsers}