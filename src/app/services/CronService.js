const CronJob = require('cron').CronJob;
const cronController = require("../controllers/cronController");
const productsController = require("../controllers/productsController");
const convert = require('./GzipToJSON')
const got = require('got');
require('dotenv/config');

const main = async () => {
	
	try{
		new CronJob(
			'0 0 * * *',
			async function() {

				const { body } = await got(process.env.BASE_URL_FILES, {
					responseType: 'buffer',
				});
				files = body.toString().split("\n");

				Object.keys(files).forEach(key => {
					if (files[key] === null || files[key] == '') {
						delete files[key];
					}
				});

				for(var i = 0; i < Object.keys(files).length;){

					var sliceA = 0;
					var sliceB = 100;
					
					let data = await convert(process.env.BASE_URL_API + files[i]);
					var count = 0;

					for(var y = 0; y < Object.keys(data).length;){
						let resp = data.slice(sliceA, sliceB);

						for(var x = 0; x < Object.keys(resp).length;){
							const val = await productsController.getByCode(resp[x].code)

							if(val == null){
								productsController.create(resp[x]);
								count++;
								x++;
							}else{
								x++;
							}

							if(x == Object.keys(resp).length){
								sliceA = sliceA + 100;
								sliceB = sliceB + 100;
								break;
							}
						}

						if(count >= 100){
							break;
						}else{
							val = null;
							y++;
						}
					}

					if(count >= 100 && i < Object.keys(files).length){
						data = null;
						sliceA = 0;
						sliceB = 100;
						i++;
					}else{
						break; 
					}
					
				}

				cronController.create();
			},
			null,
			true,
			'America/Sao_Paulo'
		);
	} 
	catch(error){
		console.log(`Error: ${error}`);
	}
    
}

module.exports = main