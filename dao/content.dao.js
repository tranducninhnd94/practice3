var ContentSchema = require("../models/content.model");

class ContentDAO {
    insert(content) {
        return new Promise((resolve, reject) => {
            ContentSchema.create(content, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }

    findAll() {
        return new Promise((resolve, reject)=> {
            ContentSchema.find({}, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            ContentSchema.findOneAndRemove({ _id: id }, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }

    edit(conent, id) {
        return new Promise((resolve, reject) => {
            ContentSchema.updateOne({ _id: id }, conent, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            })
        })
    }
}

module.exports = ContentDAO;