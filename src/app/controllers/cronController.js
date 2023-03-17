const ServiceModel = require('../models/cron');
const mongoose = require('mongoose');
const ConvertService = require("../services/ConvertService");

const cronController = {

  create: async(req, res) => {
    try{
      const cron = {
        status_connection: mongoose.connection.readyState,
        last_run_t: new Date(),
        run_t: await ConvertService(process.uptime()),
        memory_use: `${process.memoryUsage.rss()/1000000}MB`
      };
      
      await ServiceModel.create(cron);

    } 
    catch (err) {
      console.log("Error executed Cron"); 
    }
  },

  get: async(req, res) => {
    try{
      const response = await ServiceModel.find().sort({last_run_t: -1 }).limit(1);

      if(!response){
        return res.status(404).json({ msg: "Servidor não rodo ainda" })
      }

      response[0].run_t = await ConvertService(process.uptime());
      response[0].memory_use = `${process.memoryUsage.rss()/1000000}MB`

      return res.status(200).json({ response });

    } 
    catch (err) {
      return res.status(500).json(err);
    }
  }

};

module.exports = cronController;