import Cors from "cors"

// Allow cross origin API requests

const cors = Cors({
    origin: true,
    methods: ['GET', 'POST']
})

function runMiddleware(req, res, f) {
    return new Promise((resolve, reject) => {
        f(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export {cors, runMiddleware};