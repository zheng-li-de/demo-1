DROP TABLE IF EXISTS profile;
 
CREATE TABLE profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  avatar VARCHAR(250) DEFAULT NULL,
  desc VARCHAR(250) DEFAULT NULL,
  link VARCHAR(250) DEFAULT NULL
);

INSERT INTO profile (username, avatar, desc, link) VALUES
  ('zl', 'https://ibm.com', 'software engineer', NULL),
  ('zl2', 'https://google.com', 'software tester', 'https://google.com');