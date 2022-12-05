const createTokensRepository = (db) => {
  const query = async (text, params) => {
    try {
      const res = await db.query(text, params);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    async save(token) {
      return await query(`INSERT INTO tokens (user_id, token) VALUES ($1,$2)`, [
        token.userId,
        token.value,
      ]);
    },
    async findUserIdByToken(token) {
      return await query(`SELECT user_id FROM tokens WHERE token = $1`, [
        token,
      ]);
    },
  };
};

module.exports = createTokensRepository;
