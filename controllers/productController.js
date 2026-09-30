const svc = require('../services/productService')

const listAll = async (req, res) => {
    try {
        let resData = await svc.fetchAll()
        return res.json(resData)
    } catch(e) {
        console.error(e)
        res.status(500).send("bro it broke")
    }
}

const getSingle = async (req, res) => {
    try {
        let targetId = parseInt(req.params.id)
        let foundItem = await svc.fetchOne(targetId)
        
        if (!foundItem) return res.status(404).send("Not found mate")
        
        res.json(foundItem)
    } catch(err) {
        console.log(err)
        res.status(500).send("Internal issue")
    }
}

const createNew = async (req, res) => {
    try {
        let created = await svc.createOne(req.body)
        res.status(201).json(created)
    } catch(err) {
        res.status(500).send("smth went wrong saving")
    }
}

const updateExisting = async (req, res) => {
    try {
        let pId = parseInt(req.params.id)
        let updated = await svc.modifyOne(pId, req.body)
        if(!updated) return res.status(404).json({error: "Item missing"})
        res.json(updated)
    } catch(e) {
        res.status(500).send("Server error updating")
    }
}

const deleteItem = async (req, res) => {
    try {
        let id = Number(req.params.id)
        let done = await svc.removeOne(id)
        if(done) {
            res.json(done)
        } else {
            res.status(404).send("cant delete what doesn't exist")
        }
    } catch(e) {
        res.status(500).send("Error deleting")
    }
}

module.exports = {
    listAll, getSingle, createNew, updateExisting, deleteItem
}
