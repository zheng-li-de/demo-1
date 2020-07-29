DROP TABLE IF EXISTS profile;
 
CREATE TABLE profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  avatar VARCHAR(250) DEFAULT NULL,
  desc VARCHAR(250) DEFAULT NULL,
  link VARCHAR(250) DEFAULT NULL
);

INSERT INTO profile (username, avatar, desc, link) VALUES
  ('zl', 'https://www.w3schools.com/howto/img_avatar.png', 'software engineer', NULL);