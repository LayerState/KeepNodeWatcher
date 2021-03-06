const axios = require('axios').default;
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;
const UrlToFetch = `https://api.ethplorer.io/getTokenInfo/${KeepAddress}?apiKey=freekey`;


module.exports = {
	name: 'ethbonded',
	description: 'eth bonded',
	execute(message, args) {
	
	
	const address=args;
	console.log(address);

		axios({
			url: 'https://api.thegraph.com/subgraphs/name/suntzu93/tbtc',
			method: 'post',
			data: {
			  query: `
			  {
		  bondedECDSAKeeps(where: {state: ACTIVE , keepAddress: "${address}" }) {
			keepAddress
			bondAmount
			timestamp
			state
		  }
		}
		
			  `
			}
		  }).then((result) => {

			if(result.data.data==undefined || result.data.data.bondedECDSAKeeps[0]==undefined){
				message.channel.send('that address has no bonded eth');
				return;
			}
			console.log("result.data.data")
			const bondAmount= result.data.data.bondedECDSAKeeps[0].bondAmount;
			message.channel.send(` ${bondAmount} ETH is currently bonded by your signing group`);
		  });
	},
};
