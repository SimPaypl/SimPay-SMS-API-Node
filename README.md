# node-simpay
node.js api for simpay.pl

```
var simpay = require('./simpay/index.js');

/*
	key - https://simpay.pl/panel/Client/API
	secret - https://simpay.pl/panel/Client/API
*/
var api = new simpay.API({key: '333333333333333333', secret: '2222222222222222', version: '1'});

/*
	serviceId - identyfikator usługi premium sms
	number - numer na ktory wyslano sms 
	code - kod wprowadzony przez klienta

	isOk - true/false
	errorType - ERROR, USED, OK
	err - errory przez simpay
*/
api.getStatus({serviceId: '41241', number: '7055', code: 'F713EE'}, function(isOk, errorType, err) {
	if( !isOk ){
		if( errorType == 'ERROR' ){
			console.log( 'API Error' , err );
		}
		else if( errorType == 'USED' ){
			console.log( 'Code used', err );
		}

		return;
	}

	console.log( 'API Code accepted' );
});\