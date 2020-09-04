module.exports = {
  getCars: (req, res) => {
    let query = "select c.name as modele, f.name as construteur, c.years as annee, c.price as prix, c.image as image FROM \
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
    let query = "select c.name as modele, f.name as construteur, c.years as annee, c.price as prix, c.image as image from cars as c join factories as f on c.factoryId = f.id where c.id = 'id' order by c.price  asc;"

    db.query(query, (err, result) => {
      console.log(result);
      if (err) {
        res.send(err)
      }
      res.render("index", {
        cars: result
      })
    })
  },

  getEditCar: (req, res) => {
 const id = req.params.id
    let query = [
      "SELECT c.name AS modele, f.name AS construteur, c.years AS annee, c.price AS prix, e.name AS carburant, c.image AS image FROM cars AS c JOIN factories AS f ON c.factoryId = f.id join energies AS e ON c.energyId = e.id WHERE c.id = '"+ id +"' ", 
      "SELECT name FROM factories"
    ]

    db.query(query.join(";"), (err, result) => {
      console.log(result);
      if (err) {
        res.send(err)
      }
      res.render("edit", {
        car: result[0][0],
        factories: result[1]
      })
    })
  }

}