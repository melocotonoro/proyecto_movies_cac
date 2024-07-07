const pool = require("./connectionMysql.js");
const dbUser= require("../data/users.json")
const fs = require('fs');

//Leer el Json 

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

 //Obtener todos los usuarios 
const getUsers = async (req, res) => {
    try {
        const users = await readFiles('./data/users.json');
            res.json(users);
} 
    catch (err) {
        res.status(500).json({ error: 'No users list were found matching your selection.' });
}
};

//Obtener usuarios por ID
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

//Escribir en el Json 
const writeFiles = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) return reject(err);
            resolve();
        })
    });
};

//Crear un usuario
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

//Actualizar un usuario
const updateUsers= async (req,res)=>{
    try{
        const users = await readFiles('./data/users.json');
        const id_User=parseInt(req.params.id)

        const search_Id= users.findIndex(i=>i.UserID === id_User)

            if(search_Id ===-1) res.status(404).json({err:"User not found. Try again"});

                users[search_Id]={...users[search_Id], ...req.body};

                    await writeFiles('./data/users.json', users)
                        res.json(users[search_Id])

}
    catch(err){
        res.status(500).json({err:'User not update.Try again'})
}
}

//Eliminar usuario

const deleteUsers= async(req,res)=>{
    try {
        const users= await readFiles('./data/users.json')
        const id_User=parseInt(req.params.id)
            const search_Id= users.findIndex(e=>e.UserID === id_User)

                if (search_Id >= 0) {
                    users.splice(search_Id, 1);
            }
                res.json(users);

            await writeFiles('./data/users.json', users)
        
    } catch (err) {
        res.json({err:'User not delete.Try again'})
    }
}


module.exports={getUsers,getUsersByID,createUsers,updateUsers,deleteUsers}