const dbUtils = require('../database/db')

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function fetchProductsSlowly() {
    await sleep(1500)
    let allData = await dbUtils.readDb()
    return allData;
}

exports.fetchAll = async () => {
    return await fetchProductsSlowly()
}

exports.fetchOne = async (id) => {
    let prods = await fetchProductsSlowly()
    return prods.find(p => p.id === id)
}

exports.createOne = async (newObj) => {
    let currentData = await dbUtils.readDb()
    currentData.push(newObj)
    await dbUtils.saveDb(currentData)
    return newObj
}

exports.modifyOne = async (id, changes) => {
    let items = await dbUtils.readDb()
    let idx = items.findIndex(x => x.id === id)
    
    if (idx > -1) {
        items[idx] = Object.assign({}, items[idx], changes)
        await dbUtils.saveDb(items)
        return items[idx]
    }
    return null
}

exports.removeOne = async (id) => {
    let list = await dbUtils.readDb()
    let matchIdx = list.findIndex(i => i.id === id)
    
    if (matchIdx !== -1) {
        let removed = list.splice(matchIdx, 1)
        await dbUtils.saveDb(list)
        return removed[0]
    }
    return null
}
