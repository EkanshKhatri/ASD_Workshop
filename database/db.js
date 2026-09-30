const fsp = require('fs/promises')
const path = require('path')

const DB_FILE = path.join(__dirname, '../db.json')

const readDb = async () => {
    try {
        const raw = await fsp.readFile(DB_FILE, "utf-8")
        return JSON.parse(raw)
    } catch(e) {
        console.error("failed reading db:", e.message)
        return []
    }
}

async function saveDb(stuff) {
    try {
        await fsp.writeFile(DB_FILE, JSON.stringify(stuff, null, 2))
    } catch(err) {
        console.log("oops couldn't write to db", err)
        throw err;
    }
}

module.exports = { readDb, saveDb }
