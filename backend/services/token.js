import jwt from 'jsonwebtoken'
import models from '../models'

export default {
  encode: async(_id,rol,email, username) =>{
      const token = jwt.sign({_id: _id,rol: rol,email: email, username: username},'biblioteca-4hsj',{expiresIn: '1d'});
      return token;
  },
  decode: async(token) => {
      try {
          const {_id} = await jwt.verify(token,'biblioteca-4hsj');
          const user = models.Users.findOne({_id: _id});
          console.log("user", user)
          if(user){
              return user; 
          }
          return false;
      } catch (error) {
          return false;
      }
  }
}