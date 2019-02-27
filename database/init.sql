-- -----------------------------------------------------
-- Database
-- -----------------------------------------------------


-- -----------------------------------------------------
-- Schema
-- Search Path
-- Timezone
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS pundit;
SET search_path=pundit, public;
SET timezone TO 'UTC';


-- -----------------------------------------------------
-- Table BookList
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS BookSearchList (
  search_book_title TEXT UNIQUE NOT NULL,
  book_list JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT BookSearchList_search_book_title_pk
    PRIMARY KEY (search_book_title)
)
WITH (
  OIDS=FALSE
);


-- -----------------------------------------------------
-- Table Review
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Review (
  book_id BIGINT UNIQUE NOT NULL,
  reviews JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT Review_book_id_pk
    PRIMARY KEY (book_id)
)
WITH (
  OIDS=FALSE
);


-- -----------------------------------------------------
-- TRIGGER
-- update_last_updated
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_last_updated BEFORE UPDATE
  ON pundit.booksearchlist FOR EACH ROW EXECUTE PROCEDURE
  update_last_updated();
CREATE TRIGGER update_last_updated BEFORE UPDATE
  ON pundit.review FOR EACH ROW EXECUTE PROCEDURE
  update_last_updated();
