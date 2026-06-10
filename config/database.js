const path = require("path");

module.exports = ({ env }) => {
  // Railway provides MYSQL_URL automatically when MySQL plugin is added
  // mysql2 does NOT support connectionString — parse URL manually
  const mysqlUrl = env("MYSQL_URL");

  if (mysqlUrl) {
    const url = new URL(mysqlUrl);
    return {
      connection: {
        client: "mysql2",
        connection: {
          host: url.hostname,
          port: parseInt(url.port) || 3306,
          database: url.pathname.replace("/", ""),
          user: url.username,
          password: url.password,
          ssl: { rejectUnauthorized: false },
        },
        pool: {
          min: env.int("DATABASE_POOL_MIN", 2),
          max: env.int("DATABASE_POOL_MAX", 10),
        },
        acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
      },
    };
  }

  // Fallback: individual env vars (local dev with Hostinger or SQLite)
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    mysql2: {
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true),
        },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          env("DATABASE_FILENAME", "data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
