import mongoose,{Schema} from "mongoose";

const TopicsSchema = new Schema({
    name:{type:String,maxlength : 250,required:true},
    cover:{type:String,maxlength : 250,required:true},
},{
    timestamps: true
});

const Topics = mongoose.model("Topics",TopicsSchema);
export default Topics;