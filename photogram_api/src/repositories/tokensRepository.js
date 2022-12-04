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
  };
};

module.exports = createTokensRepository;
