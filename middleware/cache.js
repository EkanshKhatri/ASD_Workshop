let myCache = {}
const ALIVE_TIME = 60000 

module.exports = function cacheMid(req, res, next) {
    let method = req.method

    if (method === 'GET') {
        let k = req.originalUrl || req.url
        let val = myCache[k]

        if (val && (Date.now() - val.timeAdded < ALIVE_TIME)) {
            res.setHeader("X-Cache", "HIT")
            return res.json(val.payload)
        } else if (val) {
            delete myCache[k] // it's too old
        }

        res.setHeader("X-Cache", "MISS")

        let oldJson = res.json.bind(res)
        res.json = function(b) {
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                myCache[k] = {
                    timeAdded: Date.now(),
                    payload: b
                }
            }
            return oldJson(b)
        }
        return next()
    } 
    
    let mutatingMethods = ['POST', 'PUT', 'PATCH', 'DELETE']
    if (mutatingMethods.includes(method)) {
        res.on('finish', () => {
            if (res.statusCode < 300) {
                myCache = {} // wipe it
            }
        })
        return next()
    }

    next()
}
