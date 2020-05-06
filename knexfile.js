const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news'
      // user,
      // password
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
      // user,
      // password
    }
  },
  production: {
    connection: {
      connectionString: 'postgres://kuatcbmxquycxy:0c255198367816055ba60bf1527b45bb04321033fe54cbcf167183ab26aff7dc@ec2-52-44-166-58.compute-1.amazonaws.com:5432/dfjce2t941hnqr',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
