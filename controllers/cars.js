module.exports = {
  getCars: (req, res) => {
    let query = "select c.id, c.name as modele, f.name as construteur, c.years as annee, c.price as prix, c.image as image FROM \
         cars as c JOIN factories as f on c.factoryId = f.id order by c.price  asc;"

    db.query(query, (err, result) => {
      if (err) {
        res.send(err)
      }
      res.render("index", {
        cars: result
      })
    })
  },

  getSingleCar: (req, res) => {
    const id = req.params.id
    let query = "select c.id, c.name as modele, f.name as construteur, c.years as annee, c.price as prix, c.image as image from cars as c join factories as f on c.factoryId = f.id where c.id = '"+ id +"'  order by c.price  asc;"

    db.query(query, (err, result) => {
      if (err) {
        res.send(err)
      }
      res.render("singleCar", {
        cars: result[0]
      })
    })
  },

  getEditCar: (req, res) => {
 const id = req.params.id
    let query = [
      "SELECT c.id, c.name AS modele, f.name AS construteur, c.years AS annee, c.price AS prix, e.name AS carburant, c.image AS image FROM cars AS c JOIN factories AS f ON c.factoryId = f.id join energies AS e ON c.energyId = e.id WHERE c.id = '"+ id +"' ", 
      "SELECT id,name FROM factories", "SELECT id,name from energies"
    ]
    db.query(query.join(";"), (err, result) => {
      console.log(result);
      if (err) {
        res.send(err)
      }
      res.render("edit", {
        car: result[0][0],
        factories: result[1],
        energies: result[2]
      })
    })
  },

  putEditCar : (req, res) => {
    const id = req.params.id 
    const name = req.body.name
    const factory = req.body.factory
    const energy = req.body.energy

    const query = "update cars set name = '" + name + "', factoryId = '" + factory + "', energyId = '" + energy + "' where id = '" + id + "';"
 
    db.query(query, (err, result) => {
      console.log(result);
      if (err) {
        res.send(err)
      }
      res.redirect("/")
    })
  },

  addEditCar : (req, res) => {
    
    const name = req.body.name
    const factory = req.body.factory
    const energy = req.body.energy
    
    const query = "INSERT INTO cars ( name, factoryId, years, price, energyId, image) values (?, ?, ?, ?, ?,?);"
  
  db.query(query,[name,factory,energy], (err, result) => {
    if (err) {
      res.send(err)
    }
     res.redirect("/")
  })
  }

}