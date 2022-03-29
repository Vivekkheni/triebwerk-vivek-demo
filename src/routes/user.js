const { userController } = require('../controller'),
    router = require('express').Router()

router.post('/', userController?.signUp)
router.post('/login', userController?.login)

//  ------   Report Routes ------  
router.post('/get_report', userController.get_assign_report)
router.post('/report', userController.report_add)
router.post('/report/replay', userController.report_replay)


module.exports = router