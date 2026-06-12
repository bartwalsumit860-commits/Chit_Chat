    import mongoose from "mongoose";

    //set dns to google
    import dns from 'dns';
    dns.setServers(["8.8.8.8", "8.8.4.4"]);


    const connectDb = async () => {
        try {
            mongoose.connect(process.env.MONGO_URL);
            console.log("Database Connected");
            
        } catch (error) {
            console.log(error)
        }
    }

    export default connectDb