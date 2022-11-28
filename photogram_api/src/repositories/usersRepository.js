const findOne = async (client, email, password) => {
  return await client.query(
    `
      SELECT id
        FROM users
       WHERE email = $1
         AND password = $2
  `,
    [email, password]
  );
};

const saveUser = async (client, username, email, password) => {
  return await client.query(
    `
     INSERT INTO users (username, email, password) VALUES ($1,$2,$3)
  `,
    [username, email, password]
  );
};

module.exports = { findOne, saveUser };
