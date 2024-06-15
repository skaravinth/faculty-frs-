const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aravinth2006',
    database: 'faculty_project'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the MySQL server.');
    }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email } = req.body;

    const sql = 'SELECT id, role, vertical_coe, vertical_academics, vertical_iqac, vertical_skillteam, vertical_speciallab FROM faculty_frs WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Server error');
        }

        if (result.length > 0) {
            const { id, role, ...verticals } = result[0];
            console.log(role);
            return res.json({ id, role, verticals });
        } else {
            return res.status(404).send('User not found');
        }
    });
});

app.post('/verticalhead', (req, res) => {
    const { name, id, frs_update, reason_info, reason, dates, verticalHeadId } = req.body;
    
    console.log('Received data:', req.body);
    
    if (!name || !id || !frs_update || !reason_info || !reason || !dates || !verticalHeadId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `SELECT 1, f1.vertical_coe, f1.vertical_academics, f1.vertical_iqac, f1.vertical_skillteam, f1.vertical_speciallab, 
                 EXISTS (
                    SELECT 1
                    FROM faculty_frs f2
                    WHERE f2.id = ? 
                      AND (
                          (f1.vertical_coe = 1 AND f2.vertical_coe = 1) OR
                          (f1.vertical_academics = 1 AND f2.vertical_academics = 1) OR
                          (f1.vertical_iqac = 1 AND f2.vertical_iqac = 1) OR
                          (f1.vertical_skillteam = 1 AND f2.vertical_skillteam = 1) OR
                          (f1.vertical_speciallab = 1 AND f2.vertical_speciallab = 1)
                      )
                 ) AS check_exists
                 FROM faculty_frs f1
                 WHERE f1.id = ?`;

    db.query(sql, [id, verticalHeadId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Query results:', results);
        if (results.length > 0 && results[0].check_exists) {
            let insertSql = null;

            if (results[0].vertical_coe) {
                insertSql = `
                    INSERT INTO coe_team (name, id, date, reason, reason_info, frs_update)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        name = VALUES(name), 
                        reason = VALUES(reason), 
                        reason_info = VALUES(reason_info), 
                        frs_update = VALUES(frs_update), 
                        date = VALUES(date)
                `;
            } else if (results[0].vertical_academics) {
                insertSql = `
                    INSERT INTO academics_team (name, id, date, reason, reason_info, frs_update)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        name = VALUES(name), 
                        reason = VALUES(reason), 
                        reason_info = VALUES(reason_info), 
                        frs_update = VALUES(frs_update), 
                        date = VALUES(date)
                `;
            } else if (results[0].vertical_iqac) {
                insertSql = `
                    INSERT INTO iqac_team (name, id, date, reason, reason_info, frs_update)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        name = VALUES(name), 
                        reason = VALUES(reason), 
                        reason_info = VALUES(reason_info), 
                        frs_update = VALUES(frs_update), 
                        date = VALUES(date)
                `;
            } else if (results[0].vertical_skillteam) {
                insertSql = `
                    INSERT INTO skill_team (name, id, date, reason, reason_info, frs_update)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        name = VALUES(name), 
                        reason = VALUES(reason), 
                        reason_info = VALUES(reason_info), 
                        frs_update = VALUES(frs_update), 
                        date = VALUES(date)
                `;
            } else if (results[0].vertical_speciallab) {
                insertSql = `
                    INSERT INTO special_lab_team (name, id, date, reason, reason_info, frs_update)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        name = VALUES(name), 
                        reason = VALUES(reason), 
                        reason_info = VALUES(reason_info), 
                        frs_update = VALUES(frs_update), 
                        date = VALUES(date)
                `;
            }

            if (!insertSql) {
                console.error('No matching vertical found');
                return res.status(400).json({ error: 'No matching vertical found' });
            }

            const insertValues = [name, id, dates, reason, reason_info, frs_update];

            db.query(insertSql, insertValues, (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error executing insert query:', insertError);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(200).json({ message: 'Update successful' });
            });
        } else {
            res.status(400).json({ error: 'Faculty and vertical head are not in the same vertical' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
