var db = require('../config/connection')
var collection = require('../config/collection')

const { response } = require('express')
// const { reject, promise } = require('bcrypt/promises')
var objectId = require('mongodb').ObjectId
const { resolve } = require('path')
const session = require('express-session');


module.exports = {
    CreateUser: (userData) => {

        return new Promise(async (resolve, reject) => {

            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.ops[0])

            })
        })  
    },

    UpdateUser: (userData) => {


        let response = {}
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION)
                .updateOne({ _id: objectId(userData._id) }, {
                    $set: {

                        mark: userData.mark,
                        date: userData.date,
                        datetime: userData.datetime,
                        uniqueid: userData.uniqueid,
                        indexno: userData.index

                    }
                }).then((response) => {
                    resolve()

                })

        })
    },

    getUserCount: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            userCount = users.length
            resolve(userCount)
        })
    },

    getUser: (userData) => {
        if(userData){


            return new Promise(async (resolve, reject) => {

                console.log("userdata printed")
                console.log(userData)
                let response = {}
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userData._id)})
    
                if (user) {
                    console.log(user)
                    response = user
                    
                    resolve(response)
                } 
            })


        }else{
            console.log("no userdata")
        }
        
    }

}