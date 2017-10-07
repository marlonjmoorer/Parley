
var peerOptions
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    peerOptions={host: '/', port: '5500', path: '/peer'}
} else {
    peerOptions={host: '/', port: '', path: '/peer'}
}
module.exports={
    peerOptions
}