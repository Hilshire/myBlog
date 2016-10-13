DROP TABLE if EXISTS blog;CREATE TABLE blog (  id INTEGER PRIMARY KEY AUTOINCREMENT,  title VARCHAR(30) NOT NULL,  content BLOB NOT NULL ,  summary BLOB NOT NULL,  time DATE NOT NULL);DROP TABLE if EXISTS article;CREATE TABLE article (    id INTEGER PRIMARY KEY AUTOINCREMENT,    title VARCHAR(30) NOT NULL,    content BLOB NOT NULL,    time DATE NOT NULL);DROP TABLE if EXISTS tag;CREATE TABLE tag (  id INTEGER PRIMARY KEY AUTOINCREMENT,  type CHAR(15) NOT NULL);DROP TABLE if EXISTS blog_tag;CREATE TABLE blog_tag(  blog_id INT NOT NULL ,  tag_id INT NOT NULL ,  CONSTRAINT blog_id_fk FOREIGN KEY (blog_id) REFERENCES blog(id),  CONSTRAINT tag_id_fk FOREIGN KEY (tag_id) REFERENCES tag(id));DROP TABLE if EXISTS article_tag;CREATE TABLE article_tag(    article_id INT NOT NULL,    tag_id INT NOT NULL,    CONSTRAINT article_id_fk FOREIGN KEY (article_id) REFERENCES article(id),    CONSTRAINT tag_id_fk FOREIGN KEY (tag_id) REFERENCES tag(id));DROP TABLE if EXISTS tips;CREATE TABLE tips(    id INTEGER PRIMARY KEY AUTOINCREMENT,    title VARCHAR(30) NOT NULL,    content BLOB,    time DATE NOT NULL);DROP TABLE if EXISTS about;CREATE TABLE about(    content BLOB);DROP TABLE if EXISTS account;CREATE TABLE account (  id INTEGER PRIMARY KEY AUTOINCREMENT,  username VARCHAR(30) NOT NULL,  password VARCHAR(32) NOT NULL,  type INT NOT NULL);INSERT INTO account VALUES(null, "admin", 123456, 0);--DROP TABLE if EXISTS project;--CREATE TABLE project (--  id INTEGER PRIMARY KEY AUTOINCREMENT,--  title VARCHAR(30) NOT NULL ,--  describe TEXT NOT NULL ,--  address VARCHAR(120) NOT NULL ,--  time DATE NOT NULL ,--  img VARCHAR(255) NOT NULL--);----DROP TABLE if EXISTS project_tag;--CREATE TABLE project_tag (--  project_id INT NOT NULL ,--  tag_id INT NOT NULL ,--  CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES project(id),--  CONSTRAINT tag_id FOREIGN KEY (tag_id) REFERENCES tag(id)--);