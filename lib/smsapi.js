const request = require( 'request' );

var API = ( cfg ) => {
    if( !cfg || !cfg.key || !cfg.secret || !cfg.version ) {
        throw new Error( 'Wypełnij wszystkie pola' );
    }

    this.apiKey = cfg.key;
    this.apiSecret = cfg.secret;
    this.apiVersion = cfg.version;

    console.log( cfg );
};

API.prototype.getStatus = ( data, callback ) => {
    var options = {
        url    : 'https://simpay.pl/api/1/status',
        method : 'POST',
        json   : {
            params: {
                auth: {
                    key    : this.apiKey,
                    secret : this.apiSecret,
                },
                service_id : data.serviceId,
                number     : data.number,
                code       : data.code,
            },
        },
    };

    request( options, ( error, response, body ) => {
        if( error || response.statusCode !== 200 ) {
            callback( false, 'ERROR', 'API Request malfunction' );

            return;
        }

        if( !body.respond ) {
            callback( false, 'ERROR', 'API Request malfunction' );

            return;
        }

        if( body.respond.status === 'OK' ) {
            callback( true, 'OK', body.respond.test );
        }
        else if( body.respond.status === 'USED' ) {
            callback( false, 'USED', body.error.error_name );
        }
    } );
};

module.exports = API;
