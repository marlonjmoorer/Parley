
var peerOptions
var socketUrl
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    peerOptions={host: '/', port: '5500', path: '/peer'}
    socketUrl="http://localhost:5500/"
} else {
    peerOptions={host: '/', port: '', path: '/peer'}
    socketUrl:"/"
}
module.exports={
    peerOptions,
    socketUrl

}