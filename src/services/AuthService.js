import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';


class AuthService {
    HASH_SALT = 10;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(username, email, password) {

    }


    /**
     * 
     * @param {Object} parsedUser - User payload to create a new user entity in DB
     * @returns {boolean} - true if successfully create a user otherwise false
     */
    async register(parsedUser) {
        try {
            const hashPassword = await bcrypt.hash(parsedUser.password, this.HASH_SALT);
            const userPayload = {
                username: parsedUser.username,
                email: parsedUser.email,
                phone: parsedUser.phone,
                password: hashPassword
            };
    
            await this.userRepository.createUser(userPayload);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async generateToken(user){
        try{
            const payload = {
                role : user.role,
                id : user._id,
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d'});
            if(token){
                return token;
            }
            return null;
        }catch(error){
            console.log("error in generating token",error);
            return null;
        }
        
    }
}