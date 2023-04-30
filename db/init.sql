-- CREATE DATABASE IF NOT EXISTS `taskrdb`;
SELECT 'CREATE DATABASE taskrdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'taskrdb')\gexec