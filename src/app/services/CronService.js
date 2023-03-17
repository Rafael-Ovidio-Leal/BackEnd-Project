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

				var sliceA = 0;
				var sliceB = 100;

				const { body } = await got(process.env.BASE_URL_FILES, {
					responseType: 'buffer',
				});
				files = body.toString().split("\n");

				for(var i = 0; i < Object.keys(files).length;){
					const data = await convert(process.env.BASE_URL_API + files[i]);
					var count = 0;

					for(var y = 0; i < Object.keys(data).length;){
						const resp = data.slice(sliceA, sliceB);

						for(var x = 0; i < Object.keys(resp).length;){
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
							y++;
						}
					}
					
					if(sliceB >= Object.keys(files).leght){
						sliceA = 0;
						sliceB = 99;
						i++;
					}
					
					break;
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