const express = require('express');
const router = express.Router();
const employees = require('../../Employees');
const uuid = require('uuid');

//GET ALL EMPLOYEES
router.get('/', function (req, res) {
    res.json(employees);
});

//GET EMPLOYEES BY ID
router.get('/:id', function (req, res) {

    const found = employees.some(employee => employee.userId === parseInt(req.params.id));

    if (found) {
        res.json(employees.filter(employee => employee.userId === parseInt(req.params.id)));
    } else {
        res.status(400).json({ message: `employee with id ${req.params.id} not found!` });
    }

});


router.post('/',function (req, res){
    
    const newEmployee ={
        userId: uuid.v4(),
        jobTitleName:req.body.jobTitleName ,
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        preferredFullName: req.body.preferredFullName,
        employeeCode: req.body.employeeCode,
        region: req.body.region,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress
    }
        console.log(newEmployee);
    if(!newEmployee.emailAddress || !newEmployee.phoneNumber){
     return   res.status(400).json({message:"Please send email & number!"});
    }
    employees.push(newEmployee);
    res.json(employees);
});

//UPDATE EMPLOYEE
router.put('/:id', function (req, res) {

    const found = employees.some(employee => employee.userId === parseInt(req.params.id));

    if (found) {
        const updateEmployee = req.body;

        employees.forEach(employee =>{
            if(parseInt(req.params.id)==employee.userId){
            employee.emailAddress = updateEmployee.emailAddress ? updateEmployee.emailAddress : employee.emailAddress;
            employee.phoneNumber = updateEmployee.phoneNumber ? updateEmployee.phoneNumber : employee.phoneNumber;

            res.json({message:"updated successfully", employee});
            }
        });

    } else {
        res.status(400).json({ message: `employee with id ${req.params.id} not found!` });
    }

});

//DELETE EMPLOYEE

router.delete('/:id', function (req, res) {

    const found = employees.some(employee => employee.userId === parseInt(req.params.id));

    if (found) {
        res.json({
            message:'deleted successfully',
           employees: employees.filter(employee => employee.userId != parseInt(req.params.id))
        });
        
    } else {
        res.status(400).json({ message: `employee with id ${req.params.id} not found!` });
    }

});

module.exports = router;