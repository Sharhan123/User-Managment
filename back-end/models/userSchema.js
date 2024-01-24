const mongoose=require('mongoose')

const uschema= new mongoose.Schema(
    {
        username: {
            type: 'string',
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        image:{
            type:String
        }        
                
})

module.exports=mongoose.model('userdata',uschema);

