import mongoose,{Schema} from "mongoose";

const UsersSchema = new Schema({
    username:{type:String,maxlength : 250,required:true},
    email:{type:String,maxlength : 250,required:true},
    rol:{type:String,maxlength : 250,required:true},
    password:{type:String,maxlength : 250,required:true},
},{
    timestamps: true
});

const Users = mongoose.model("Users",UsersSchema);
export default Users;