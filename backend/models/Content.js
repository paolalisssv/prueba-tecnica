import mongoose,{Schema} from "mongoose";

const ContentSchema = new Schema({
    title:{type:String,maxlength : 250,required:true},
    content:{type:String,maxlength : 250,required:true},
    topic:{type:Schema.ObjectId,ref: 'topics',required:true},
    type:{type:String,maxlength : 250,required:true},
    user:{type:Schema.ObjectId,ref: 'username',required:true},

},{
    timestamps: true
});

const Content = mongoose.model("Content",ContentSchema);
export default Content;