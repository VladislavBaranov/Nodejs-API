const fetch = require('node-fetch');
const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var contents = fs.readFileSync('URLmini.csv', 'utf8'); //URL.csv - full version
var baseUrl = contents.split('\r\n');
console.log(baseUrl);

baseUrl.forEach((url, i) => {
    setTimeout(() => {
        console.log(url);
        fetch(`https://content.googleapis.com/pagespeedonline/v4/runPagespeed?url=${encodeURIComponent(url)}`)
            .then(resp => resp.json())
            .then(checkResponse)
            .then(x => fs.appendFileSync("log.txt",'\r\n' + i + ' ' + (new Date) + JSON.stringify(x) + '\r\n', 'utf-8'))
            .catch(x => {
                fs.appendFileSync("error.txt", '\r\n' + i + ' ' + (new Date) + JSON.stringify(x) + '\r\n', 'utf-8');
                console.log(x + url);
            })
    }, 1100 * i);
});


function checkResponse(resp) {
    if (resp.hasOwnProperty('error')) {
        return Promise.reject('error');
    }
    return resp;
}




// const ur = 'http://www.jfairchildlaw.com';
// fetch(`https://content.googleapis.com/pagespeedonline/v4/runPagespeed?url=${encodeURIComponent(ur)}`)
//     .then(resp => resp.json())
//     .then(checkResponse)
//     .then(x => console.log(x))
//     .catch(x => console.log(x))
