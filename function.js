const consts=require("./consts.js")
const { Model } = require("sequelize")
const db = require("./db.js")

async function add_product(product) {
    // add product at database 
    return await db.Main.create({
        product_name: product.name,
        article: product.article,
        manufacture_date: product.manufacture_date,
        expiry_date: product.expiry_date,
        arrival_date: new Date(),
        count: product.count,
        creator_name: product.creator_name
    })

}

async function delete_product(product) {
    // remove product from database
    let data = await db.Main.findAll({
        where: {
            name: name,
            article: article,
            manufacture_date: {
                [db.Sequelize.Op.lte]: product.manufacture_date
            },
            expiry_date: {
                [db.Sequelize.Op.lte]: product.expiry_date
            },
        }, raw: true
    })

    if (data[0] === undefined) { return }
    let id = data[0].id

    db.Main.destroy({
        where: {
            id: id
        }
    })
}






async function filter_product(data) {
    // search by filters
}





const filter_by_name = async (name) => {
    return await db.Main.findAll({ where: { name: name }, raw: true })

}

const filter_by_article = async (article) => {
    return await db.Main.findAll({ where: { article: article }, raw: true })

}

const filter_by_manufacture_date = async (manufacture_date) => {
    return await db.Main.findAll({
        where: {
            manufacture_date: {
                [db.Sequelize.Op.lte]: manufacture_date
            }
        }, raw: true
    })

}

const filter_by_expiry_date = async (expiry_date) => {
    return await db.Main.findAll({
        where: {
            expiry_date: {
                [db.Sequelize.Op.lte]: expiry_date
            }
        }, raw: true
    })

}

const filter_by_arrival_date = async (arrival_date) => {
    return await db.Main.findAll({
        where: {
            arrival_date: {
                [db.Sequelize.Op.lte]: arrival_date
            }
        }, raw: true
    })

}


const filter_by_id = async (id) => {
    return await Main.findAll({where:{id: id}, raw: true })
    
}

async function get_products() {
    return await db.Main.findAll({
        attributes: ["id", "product_name", "manufacture_date",
                                    "expiry_date", "count",],
        raw: true
    })
}

async function get_history_requests(state){
    return await db.history_requests.findAll({
        raw: true,
        where:{
            status:state
        }
    })
}

module.exports = {
    add_product, delete_product, get_products,
    filter_by_name, filter_by_article,
    filter_by_manufacture_date, filter_by_expiry_date,
    filter_by_arrival_date, filter_by_id, get_history_requests
}

