import * as bcrypt from "bcrypt"

import User from "./usersModel.js"

// Get users
    export const getUsers = async (req, res) => {
        try {

            const users = await User.findAll()  // find all users

            res.status(200).send({
                success,
                statusCode: 200,
                users
            })

        } catch (error) {

            res.status(500).send({
                error,
                status: 500,
                message: 'Internal server error',
            })

        }
    }

// Get user by Id
    export const getUsersById = async (req, res) => {
        try {

            const { id } = req.params.uid; // take request

            const user = await User.findOne({
                where: {
                    id
                }
            })

            if(!user) {
                res.status(404).send({
                    success,
                    statusCode: 404,
                    message: `User not found with ID : ${id}`
                })    
            }

            res.status(200).send({
                success,
                statusCode: 200,
                user
            })

        } catch (error) {

            res.status(500).send({
                error,
                status: 500,
                message: 'Internal server error',
            })

        }
    }

// Delete user by Id
    export const deleteUser = async (req, res) => {
        try {

            const { id } = req.params.uid; // take request

            const user = await User.destroy({
                where: {
                    id
                }
            })

            if(!user) {
                res.status(404).send({
                    success,
                    statusCode: 404,
                    message: `User not found with ID : ${id}`
                })    
            }

            res.status(200).send({
                success,
                statusCode: 200,
                message: `User has been deleted successfully`
            })

        } catch (error) {

            res.status(500).send({
                error,
                status: 500,
                message: 'Internal server error',
            })

        }
    }

// Delete user by Id
    export const createUser = async (req, res) => {
        try {

            const { name, email, password } = req.body; // take request

            const existUser = await User.findOne({
                where: {
                    email: email
                }
            })

            if(existUser) {
                res.status(409).send({
                    success,
                    statusCode: 409,
                    message: `Email has been taken !!`
                })    
            }

            const salt = bcrypt.genSalt(5)
            const hashedPassword = bcrypt.hash(password, salt)

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            })
            
            delete newUser.password

            res.status(201).send({
                success,
                statusCode: 201,
                message: `User has been created successfully`,
                newUser
            })

        } catch (error) {

            res.status(500).send({
                error,
                status: 500,
                message: 'Internal server error',
            })

        }
    }

// Update user by Id
    export const updateUserById = async (req, res) => {
        try {

            const { id } = req.params.uid; // take request
            const { name, email, password } = req.body;

            const user = await User.findOne({
                where: {
                    id
                }
            })

            if(!user) {
                res.status(404).send({
                    success,
                    statusCode: 404,
                    message: `User not found with ID : ${id}`
                })    
            }

            const newUser = await User.update(id, {
                name,
                email,
                password
            })

            const newestUser = await User.create(newUser)

            res.status(200).send({
                success,
                statusCode: 200,
                message: `User has been updated successfully`,
                newestUser
            })

        } catch (error) {

            res.status(500).send({
                error,
                status: 500,
                message: 'Internal server error',
            })

        }
    }