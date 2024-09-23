import mongoose from "mongoose";

const jobProviderSchema=new mongoose.Schema({
    contact:{
        type:Number,
        

    },
    location:{
        type:String,
        
    },
    messages:{
        type:[String]
    }
})

const JobProvider=mongoose.models.JobProvider || mongoose.model('JobProvider',jobProviderSchema);

export default JobProvider