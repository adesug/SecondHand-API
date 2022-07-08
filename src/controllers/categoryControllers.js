const {
    Category
} = require('../models')
const jwt = require('jsonwebtoken')

class CategoryController {

    static async list(req, res, next) {
        try {
            const data = await Category.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = CategoryController
