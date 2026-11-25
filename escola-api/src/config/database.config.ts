import { registerAs } from "@nestjs/config";
import Joi from "joi";
import { ValidadeEnv } from "./validate-env.config.js";

export default registerAs ('database', () => {
   // uri: process.env.MONGO_URI || 'mongodb://localhost:27017/escola_db',
   //  maxPoolSize: parseInt(process.env.MONGO_MAX_POLL_SIZE || '10', 10),
   const schema = Joi.object({
    MONGO_URI: Joi.string().uri().required(),
    MONGO_MAX_POLL_SIZE: Joi.number().default(10),
   });
 
   const env = ValidadeEnv(process.env, schema);

   return{
      uri:env.MONGO_URI,
      maxPollSize: env.MONGO_MAX_POLL_SIZE,
   };
});