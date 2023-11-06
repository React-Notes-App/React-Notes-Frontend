-- create table notes (
--   id SERIAL PRIMARY KEY,
-- );

-- create table labels (
--   id SERIAL PRIMARY KEY,
-- );

-- create table notes_labels (
--   id SERIAL PRIMARY KEY,
--   notes_id INTEGER REFERENCES notes(id) ON UPDATE AND DELETE CASCADE,
--   labels_id INTEGER REFERENCES labels(id) ON UPDATE AND DELETE CASCADE,
--   UNIQUE(notes_id, labels_id)
-- );

-- ALTER TABLE notes_labels ADD CONSTRAINT notes_label_uniq UNIQUE(notes_id, labels_id);

-- -- First you run this, it inserts properly
-- INSERT INTO
--   notes_labels
-- VALUES
--   (1, 1)
-- ON CONFLICT ON CONSTRAINT notes_label_uniq
-- DO UPDATE
-- SET
--   id = EXCLUDED.id
-- RETURNING
--   *;

-- -- Second you run this, it basically no-op
-- INSERT INTO
--   notes_labels
-- VALUES
--   (1, 1)
-- ON CONFLICT ON CONSTRAINT notes_label_uniq
-- DO UPDATE
-- SET
--   id = EXCLUDED.id
-- RETURNING
--   *;

-- -- Grabs all of the labels that a user has created/used
-- select
--   distinct on (l.id)
--   l.*
-- from
--   labels l
-- join
--   notes_labels nl
-- on
--   nl.label_id = l.id
-- join
--   notes n
-- on
--   nl.note_id = n.id
-- where
--   n.user_id = $1

-- EXCEPT

-- -- Let's also excluding any existing labels tied to that note
-- select
--   distinct on (l.id)
--   l.*
-- from
--   labels l
-- join
--   notes_labels nl
-- on
--   nl.label_id = l.id
-- join
--   notes n
-- ON 
--   nl.note_id = n.id
-- where
--   n.id = $2;
  