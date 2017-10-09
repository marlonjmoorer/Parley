

var port=''
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
     // dev code
    port=5500
} 

module.exports={
    peerOptions:{host: '/', port, path: '/peer'},
    socketUrl:port?`:${port}/`:"/"
}