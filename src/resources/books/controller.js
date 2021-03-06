const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO books
      (name, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM books;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById(req, res) {
  console.log({ param: req.params, body: req.body });

  const bookToUpdateById = {
    id: req.params.id,
    ...req.body,
  };
  const updateOneByIdSQL = `
  UPDATE books
  SET title = $1,
  type = $2,
  author = $3,
  topic = $4,
  publicationdate = $5
  WHERE id = $6  
  RETURNING *;
  `;

  const { title, type, author, topic, publicationdate, id } = bookToUpdateById;

  db.query(updateOneByIdSQL, [title, type, author, topic, publicationdate, id])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneByTitle(req, res) {
  console.log({ params: req.params, body: req.body });

  const bookToUpdateByTitle = {
    id: req.params.id,
    ...req.body,
  };
  const updateOneByTitleSQL = `
 UPDATE books
 SET type = $1,
 author = $2,
 topic = $3,
 publicationdate = $4
 WHERE title = $5  
 RETURNING *;
 `;

  const { type, author, topic, publicationdate, title } = bookToUpdateByTitle;

  db.query(updateOneByTitleSQL, [type, author, topic, publicationdate, title])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function patchOneBookById(req, res) {
  const id = req.params.id;
  console.log(req.body);
  const bookToUpdate = req.body;

  let sqlTemplate = `
  UPDATE books SET
  `;

  console.log("bookToUpdate object: ", bookToUpdate);

  const sqlParams = [];

  let i = 1;
  for (const key in bookToUpdate) {
    sqlTemplate += `${key} = $`;
    sqlTemplate += i;
    sqlTemplate += ",";
    sqlParams.push(bookToUpdate[key]);
    i = i + 1;
  }

  sqlParams.push(id);

  sqlTemplate = sqlTemplate.slice(0, sqlTemplate.length - 1);
  sqlTemplate += `WHERE id = $`;
  sqlTemplate += i;
  sqlTemplate += `RETURNING *`;

  console.log(sqlTemplate);
  console.log(sqlParams);

  db.query(sqlTemplate, sqlParams)
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

// function deleteBookById(req, res) {
//   console.log({ params: req.params });
//   const id = req.params.id;

//   const deleteBookByIdSQL = `
//   DELETE FROM books
//   WHERE id = $1;
//   `;

//   db.query(deleteBookByIdSQL, [id])
//     .then((result) => res.json({ message: "Delete Successful!" }))
//     .catch(console.error);
// };

const deleteBookById = async (req, res) => {
  console.log({ params: req.params});

  const id = req.params.id; 

  const deleteBookByIdSQL = `
  DELETE FROM books 
  WHERE id = $1
  `;

  try {
    const result = await db.query(deleteBookByIdSQL, [id]);
    res.json({ message: "Delete Successful!" });
  } catch (error) {
    console.error("ERROR deleteBookById: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  updateOneByTitle,
  patchOneBookById,
  deleteBookById,
};
