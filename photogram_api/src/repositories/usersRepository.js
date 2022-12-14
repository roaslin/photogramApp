const createUsersRepository = (db) => {
  const query = async (text, params) => {
    try {
      const res = await db.query(text, params);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    async findOneByEmail(email) {
      return await query(
        `SELECT id, password
         FROM users
        WHERE email = $1`,
        [email]
      );
    },
    async findOne(userId) {
      return await query(
        `SELECT username
         FROM users
        WHERE id = $1`,
        [userId]
      );
    },
    async saveUser(user) {
      return await query(
        `
         INSERT INTO users (username, bio, avatar, phone, email, password) VALUES ($1,$2,$3,$4,$5,$6)
      `,
        [
          user.username,
          user.bio,
          user.avatar,
          user.phone,
          user.email,
          user.password,
        ]
      );
    },
  };
};

module.exports = createUsersRepository;
