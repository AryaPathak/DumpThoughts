const pool = require('../../db')

const getUsers = (req, res) =>{
    pool.query("SELECT * FROM users", (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
        const result = await pool.query(
    'SELECT user_id, username, name, bio, profile_pic_url, created_at FROM users WHERE user_id = $1',
    [userId]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error while fetching user' });
  }
};

module.exports = {
    getUsers,
    getUserById
}