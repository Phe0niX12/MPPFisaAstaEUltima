import {Sequelize, DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import "dotenv/config";
export const sequelize = new Sequelize('nodejs','root','sexyface12',{
    host:'localhost',
    dialect:'mysql',
    port: '3307'
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established succesfully.');

}catch(error){
    console.error('Unable to connect to the database:', error)    
}

export const Farmer = sequelize.define("Farmer",{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        
    },
    owned_land:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        
    },
    feeding_type:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
    }

})
export const Cow = sequelize.define("Cow",{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        
    },
    type:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        
    },
    color:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        
    },
    weight:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },
    },

    
});
Farmer.hasMany(Cow);





const getAll = async ()=>{
    try{
        const farmers = await Farmer.findAll();
        return farmers;
    }catch(error){
        throw new Error('Errpr, fetching all farmers: ' + error);
    }
}
const get = async (id) =>{
    try{
        const farmer = await Farmer.findByPk(id);
        if (!farmer) {
            throw new Error('Farmer not found');
        }
        return farmer;
    } catch (error) {
        throw new Error('Error fetching farmer by ID: ' + error.message);
    }
}

const create = async (newFarmer)=>{
    try {
        
        const id = Math.floor(Math.random() * 1000000);
        const finalNewFarmer = {id:id, ...newFarmer};
        console.log(finalNewFarmer);
        const farmer = await Farmer.create(finalNewFarmer);
        return farmer;
    } catch (error) {
        throw new Error('Error creating farmer: ' + error);
    }
}

const update = async (id, updatedFarmer) =>{
    try {
        const farmer = await Farmer.findByPk(id);
        if (!farmer) {
            throw new Error('Farmer not found');
        }
        console.log(updatedFarmer);
        await farmer.update(updatedFarmer);
        return farmer;
    } catch (error) {
        throw new Error('Error updating farmer: ' + error.message);
    }
}

const deleteFarmer = async (id)=>{
    try {
        const farmer = await Farmer.findByPk(id);
        if (!farmer) {
            throw new Error('Farmer not found');
        }
        await farmer.destroy();
        return 'Farmer deleted successfully';
    } catch (error) {
        throw new Error('Error deleting farmer: ' + error.message);
    }
}

export const User = sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },

    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
    },
}
)

export const registerUser = async(req, res) =>{
    try{
        const id = Math.floor(Math.random() * 1000000);
        const {name, password} = req.body;
        const userExists = await User.findOne({
            where:{name}
        })
        if(userExists){
            return res.status(400).send('Name is already associated with an account');
        }
        await User.create({
            id,
            name, 
            password: await bcrypt.hash(password, 15)
        })
        return res.status(200).send('Registartion successful')

    }catch(err){
        return res.status(500).send('Error in registering user');
    }
}

export const signInUser = async (req, res) =>{
    try{
        const {name, password} = req.body;

        const user = await User.findOne({
            where:{
                name
            }
        });
        if(!user){
            return res.status(404).send('User not found!');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid){
            return res.status(404).json('Incorrect name or password');
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET , {
            expiresIn:process.env.JWT_REFRESH_EXPIRATION
        });

        res.status(200).send({
            id:user.id,
            name: user.name,
            accessToken: token
        });

    }catch(err){
        console.log(err);
        return res.status(500).send('Sign in error');
    }
}

export const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user information to the request object
      next(); // Call next middleware or route handler
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };
export default {getAll, get, create, update, deleteFarmer}

