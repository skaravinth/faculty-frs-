const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'aravinth2006',
    database: 'faculty_project'
});

db.getConnection((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the MySQL server.');
    }
});

app.post('/login', (req, res) => {
    const { email } = req.body;

    const sql = `
        SELECT id, role, vertical_coe, vertical_academics, vertical_iqac, vertical_skillteam, vertical_speciallab
        FROM faculty_frs
        WHERE email = ?
    `;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Server error');
        }

        if (result.length > 0) {
            const { id, role, ...verticals } = result[0];
            return res.json({ id, role, verticals });
        } else {
            return res.status(404).send('User not found');
        }
    });
});

app.post('/verticalhead', (req, res) => {
    const { id, email, frs_update, reason, reason_info, verticalHeadId, vertical } = req.body;

    const getDepartmentQuery = 'SELECT department FROM faculty_frs WHERE id = ?';
    db.execute(getDepartmentQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching department:', err);
            res.status(500).json({ error: 'Failed to fetch department' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Faculty not found' });
            return;
        }

        const department = results[0].department;

        const insertQuery = `
            INSERT INTO frs_history (faculty_id, email, verticalhead_id, vertical, frs_updated, reason, reason_info, department)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.execute(insertQuery, [id, email, verticalHeadId, vertical, frs_update, reason, reason_info, department], (err, results) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
                res.status(500).json({ error: 'Failed to submit form data' });
                return;
            }

            res.status(200).json({ message: 'Form submitted successfully', data: results });
        });
    });
});

app.get('/verticalvisefrs/:id', (req, res) => {
    const userId = req.params.id;
    const query = `
        SELECT 
            vertical, 
            COALESCE(SUM(CAST(frs_updated AS DECIMAL(8))), 0) AS total_frs_points
        FROM 
            frs_history
        WHERE 
            faculty_id = ?
        GROUP BY 
            vertical;
    `;
  
    db.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        res.json(results);
    });
});

app.get('/frssummary/:id', (req, res) => {
    const userId = req.params.id;

    const query = `
        SELECT 
            SUM(CAST(frs_updated AS DECIMAL(8))) AS total,
            SUM(CASE WHEN frs_updated > 0 THEN CAST(frs_updated AS DECIMAL(8)) ELSE 0 END) AS gained,
            SUM(CASE WHEN frs_updated < 0 THEN CAST(frs_updated AS DECIMAL(8)) ELSE 0 END) AS lost
        FROM 
            frs_history
        WHERE 
            faculty_id = ?
    `;

    db.execute(query, [userId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        res.json(results[0]);
    });
});

app.get('/recentfrs/:faculty_id', (req, res) => {
    const facultyId = req.params.faculty_id;
    const query = `
        SELECT 
            DATE_FORMAT(created_at, '%d-%m-%Y') AS date,
            vertical AS verticalName,
            reason,
            reason_info,
            frs_updated AS frsUpdate
        FROM frs_history
        WHERE faculty_id = ?
        ORDER BY created_at DESC
        LIMIT 5;
    `;

    db.query(query, [facultyId], (err, results) => {
        if (err) {
            console.error('Error fetching recent FRS data:', err);
            res.status(500).json({ error: 'Failed to fetch recent FRS data' });
            return;
        }

        res.status(200).json(results);
    });
});

app.get('/facultyfrsgraph/:faculty_id/:vertical', (req, res) => {
    const { faculty_id, vertical } = req.params;

    if (!faculty_id) {
        return res.status(400).json({ error: 'Faculty ID is required' });
    }

    const query = `
        SELECT
            DATE_FORMAT(created_at, '%Y-%m') AS month,
            SUM(CAST(frs_updated AS DECIMAL(30,2))) AS totalFRS
        FROM
            frs_history
        WHERE
            faculty_id = ?
            AND (vertical = ? OR ? = 'All')
        GROUP BY
            month
        ORDER BY
            month;
    `;

    db.query(query, [faculty_id, vertical, vertical], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/frshistory/:faculty_id', (req, res) => {
    const facultyId = req.params.faculty_id;
    const query = `
        SELECT 
            DATE_FORMAT(created_at, '%d-%m-%Y') AS date,
            vertical AS verticalName,
            reason,
            reason_info,
            frs_updated AS frsUpdate
        FROM frs_history
        WHERE faculty_id = ?
        ORDER BY created_at DESC;
    `;

    db.query(query, [facultyId], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.status(200).json(results);
    });
});

const promisePool = db.promise();
// Route to get verticals
app.get('/verticals/frs', (req, res) => {
    const query = `
        SELECT 
            vertical,
            SUM(CASE WHEN frs_updated > 0 THEN frs_updated ELSE 0 END) AS positiveScore,
            SUM(CASE WHEN frs_updated < 0 THEN frs_updated ELSE 0 END) AS negativeScore
        FROM frs_history
        GROUP BY vertical;
    `;
  
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.json(results);
    });
});


app.get('/admin/frs/monthly', async (req, res) => {
    try {
      const [rows] = await promisePool.query(`
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') AS month,
            SUM(CASE WHEN frs_updated > 0 THEN CAST(frs_updated AS DECIMAL) ELSE 0 END) AS total_gained,
            SUM(CASE WHEN frs_updated < 0 THEN CAST(frs_updated AS DECIMAL) ELSE 0 END) AS total_lost
        FROM frs_history
        GROUP BY month
        ORDER BY month;
      `);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });


async function getMonthlyFRSData() {
    const query = `
      SELECT 
          DATE_FORMAT(created_at, '%m') AS month,
          SUM(CASE WHEN frs_updated > 0 THEN CAST(frs_updated AS DECIMAL) ELSE 0 END) AS total_gained,
          SUM(CASE WHEN frs_updated < 0 THEN CAST(frs_updated AS DECIMAL) ELSE 0 END) AS total_lost
      FROM frs_history
      GROUP BY month
      ORDER BY month;
    `;
  
    try {
      const [rows] = await pool.query(query);
  
      // Split data into two semesters
      const firstSemester = rows.filter(item => parseInt(item.month, 10) <= 6);
      const secondSemester = rows.filter(item => parseInt(item.month, 10) > 6);
  
      return {
        firstSemester,
        secondSemester
      };
    } catch (error) {
      throw new Error('Error fetching data');
    }
  }
  

  app.get('/admin/frs/monthly', async (req, res) => {
    try {
      const data = await getMonthlyFRSData();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/api/faculty', (req, res) => {
    const query = `SELECT
    @row_number := @row_number + 1 AS sNo,id AS facultyId,name AS facultyName,department,designation,frs AS frsScore FROM
    faculty_frs
  JOIN (SELECT @row_number := 0) AS rn
  WHERE
    role = 'user';
  `
    ;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching faculty data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(results);
    });
  });


app.get('/admin/frs/verticals', async (req, res) => {
    try {
      const query = `
        SELECT 
          vertical, 
          SUM(CASE WHEN frs_updated > 0 THEN CAST(frs_updated AS DECIMAL) ELSE 0 END) AS total_provided
        FROM frs_history
        GROUP BY vertical;
      `;
      const [rows] = await promisePool.query(query); // Directly handle the promise
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
