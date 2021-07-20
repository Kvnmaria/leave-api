const express = require('express');
const mysql = require('mysql');


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kvnmaria@12',
    database: 'leave_application'
})


function connectDatabase() {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            if (!err) {
                resolve(true)
            } else {
                reject(err)
            }
        });
    })
}

const init = async () => {

    const app = express();

    app.use(express.json());

    await connectDatabase();

    app.post('/leave', (req, res) => {

        let employeeId = req.body.employeeId;
        let fromDate = req.body.fromDate;
        let toDate = req.body.toDate;

        if (!employeeId || !fromDate || !toDate) {
            return res.status(400).send('Please Fill all the Details')
        }
        const sqlQuery = `UPDATE employee 
                          SET status = 'Approved' 
                          WHERE ID = '43232' `;


        if (req.body.employeeId === '43232') {

            con.query(sqlQuery, (err, rows) => {
                if (err) {
                    throw err;
                }
                console.log(rows)
            })

            return res.status(200).send('Your Leave Has been Approved');
        } else {
            return res.status(400).send('Please send a Appropriate EmployeeId');
        }

    }).listen(5000, () => console.log("Server Started at port 5000"));
}

init();
