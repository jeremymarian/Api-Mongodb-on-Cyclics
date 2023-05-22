
const mongoose = require('mongoose');


 module.exports = { 
       mongodb: async () => {
        try{
          const data = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true
                 
          }
          );
          console.log(`mongoDB connected: ${data.connection.host}`)
          
          return (data) 
        }
        catch(error){
          console.log('err', error.message)
          process.exit(1)
        }
        
      } }
      





