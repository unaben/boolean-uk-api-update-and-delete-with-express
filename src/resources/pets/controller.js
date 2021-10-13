const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM pets;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM pets
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById (req, res) {
  console.log({params: req.params, body: req.body});

  const petToUpdate = {
    id: req.params.id,
    ...req.body
  }

  const updateOneByIdSQL =`
  UPDATE pets
  SET name = $1,
  age = $2,
  type = $3,
  breed = $4,
  microchip = $5
  WHERE id = $6;
  `;

  const {name, age, type, breed, microchip, id} = petToUpdate

  db.query(updateOneByIdSQL, [name, age, type, breed, microchip, id])
 .then((result) => res.json({ data: result.rows[0]}))
 .catch(console.error);
}

function deletePetById (req, res) {
  console.log({params: req.params});
  const id = req.params.id

  const deletePetByIdSQL =`
  DELETE FROM pets
  WHERE id = $1;
  `;

  db.query(deletePetByIdSQL, [id])
  .then((result) => res.json({ data: result.rows[0]}))
  .catch(console.error);  
};

function patchOnePetById(req, res) {
  const id = req.params.id;
  console.log(req.body);
  const petToUpdate = req.body;

  let sqlTemplate = `
  UPDATE pets SET
  `;

  console.log("petToUpdate object: ", petToUpdate);

  const sqlParams = [];

  let i = 1;
  for (const key in petToUpdate) {
    sqlTemplate += `${key} = $`;
    sqlTemplate += i;
    sqlTemplate += ','
    sqlParams.push(petToUpdate[key])
    i = i + 1;
  }

  sqlParams.push(id);

  sqlTemplate = sqlTemplate.slice(0, sqlTemplate.length - 1);
  sqlTemplate += `WHERE id = $`;
  sqlTemplate += i;
  sqlTemplate += `RETURNING *`

  console.log(sqlTemplate);
  console.log(sqlParams);

  db.query(sqlTemplate, sqlParams)
  .then((result) => res.json({ data: result.rows[0]}))
  .catch(console.error);
};


module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  deletePetById,
  patchOnePetById

};
