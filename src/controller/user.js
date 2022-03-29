"use strict"
const bcryptjs = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { apiResponse, Status } = require('../common')
const db = require('../../models')
const { User, Report } = db
const jwt_token_secret = config.get('jwt_token_secret')
const refresh_jwt_token_secret = config.get('refresh_jwt_token_secret')

module.exports = {
    signUp: async (req, res, next) => {
        let body = req.body, response, token, refresh_token
        try {
            body.password = await bcryptjs.hash(body.password, await bcryptjs.genSaltSync(8))
            response = await User.create(body)
            token = jwt.sign({
                id: response.id,
                authToken: response.authToken,
                type: response.userType,
                status: "SingUp Account",
                generatedOn: (new Date().getTime())
            }, jwt_token_secret)
            refresh_token = jwt.sign({
                id: response.id,
                generatedOn: (new Date().getTime())
            }, refresh_jwt_token_secret)
            return res.status(200).json(await apiResponse(200, 'Sign up successfully', {
                id: response?.id,
                phoneNumber: response?.phoneNumber,
                userType: response?.userType,
                name: response?.name,
                email: response?.email,
                image: response?.image,
                token,
                refresh_token
            }, {}))
        } catch (error) {
            console.log(error);
            return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, {}));
        }
    },

    login: async (req, res, next) => {
        let getUserData, { email, password } = req.body, token, refresh_token
        try {
            getUserData = await User.findAll({
                where: { email, }
            })
            if (getUserData?.length == 0) return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
            if (!(await bcryptjs.compare(password, getUserData[0].password)))
                return res.status(400).json(await apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))

            token = jwt.sign({
                id: getUserData[0].id,
                authToken: getUserData[0].authToken,
                type: getUserData[0].userType,
                status: "SingUp Account",
                generatedOn: (new Date().getTime())
            }, jwt_token_secret)
            refresh_token = jwt.sign({
                id: getUserData[0].id,
                generatedOn: (new Date().getTime())
            }, refresh_jwt_token_secret)
            return res.status(200).json(await apiResponse(200, "Login Success", {
                id: getUserData[0]?.id,
                phoneNumber: getUserData[0]?.phoneNumber,
                userType: getUserData[0]?.userType,
                name: getUserData[0]?.name,
                email: getUserData[0]?.email,
                image: getUserData[0]?.image,
                token,
                refresh_token
            }, {}))
        } catch (error) {
            console.log(error);
            return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, {}));
        }
    },

    report_add: async (req, res, next) => {
        let response, body = req.body, get_available_user, get_report_data
        try {
            response = await Report.create(body)
            get_available_user = await User.findAll({
                where: { status: Status.user.available }
            })
            if (get_available_user?.length != 0) {
                get_report_data = await Report.findAll(
                    {
                        limit: get_available_user?.length || 0,
                        offset: 0,
                        where: { status: Status.report.pending }
                    },
                )
                for (let i = 0; i < get_available_user?.length; i++) {
                    await Report.update({ userId: get_available_user[i].id, status: Status.report.assign }, { where: { id: get_report_data[i].id } })
                    await User.update({ status: Status.user.assign }, { where: { id: get_available_user[i].id } })
                }
            }
            return res.status(200).json(await apiResponse(200, "Report add successful", {}, {}))
        } catch (error) {
            console.log(error);
            return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, {}));
        }
    },

    get_assign_report: async (req, res, next) => {
        let response, body = req.body
        try {
            response = await Report.findAll({ where: { status: Status.report.assign, userId: body.userId } })
            return res.status(200).json(await apiResponse(200, "Get report successful", response, {}))
        } catch (error) {
            console.log(error);
            return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, {}));
        }
    },

    report_replay: async (req, res, next) => {
        let response, { id, userId } = req.body, get_available_user, get_report_data
        try {
            response = await Report.update({ status: Status.report.completed }, { where: { id: id } })
            await User.update({ status: Status.user.available }, { where: { id: userId } })
            get_available_user = await User.findAll({
                where: { status: Status.user.available }
            })
            if (get_available_user?.length != 0) {
                get_report_data = await Report.findAll(
                    {
                        limit: get_available_user?.length || 0,
                        offset: 0,
                        where: { status: Status.report.pending }
                    }
                )
                for (let i = 0; i < get_report_data?.length; i++) {
                    await Report.update({ userId: get_available_user[i].id, status: Status.report.assign }, { where: { id: get_report_data[i].id } })
                    await User.update({ status: Status.user.assign }, { where: { id: get_available_user[i].id } })
                }
            }
            return res.status(200).json(await apiResponse(200, "Report replay successful", {}, {}))
        } catch (error) {
            console.log(error);
            return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, {}));
        }
    }
}