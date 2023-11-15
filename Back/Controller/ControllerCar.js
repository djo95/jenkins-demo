const Cars = require("../Models/cars");
exports.addCar = function addCar(req, res) {
  try {
    console.log(req.body);
    const newCars = new Cars(req.body);

    newCars.save();

    res.status(200).send({ Msg: "Cars added", newCars });
  } catch (error) {
    res.status(500).send("could not add cars");
  }
};

exports.getAllCars = async function getAllCars(req, res) {
  try {
    const cars = await Cars.find();
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send("could not get cars");
  }
};

exports.getCarById = async function getCarsById (req,res){
    try {
        const car = await Cars.findById(req.params.id)
        res.status(200).send(car)


    } catch (error) {
        res.status(500).send('could not get cars')
    }
}

exports.updateCar = async function getCarsById (req,res){
    try {
        
        const car = await Cars.findByIdAndUpdate(req.params.id,{$set : req.body},{new: true})
        res.status(200).send(car)


    } catch (error) {
        res.status(500).send('could not get cars')
    }
}

exports.deleteCar = async function deleteCar (req,res){
    try {
        const {id} = req.params

        await Cars.findByIdAndDelete(id)

        res.status(200).send({Msg : 'car deleted'})
    } catch (error) {
        res.status(500).send('Could not delete car')
    }
}

exports.getMyCars = async function getMyCars (req,res){
    try {
        const {id} = req.params
        console.log(id)
    
        const Allposts = await Cars.find({owner : id})
        console.log(Allposts)

        res.status(200).send(Allposts)
    } catch (error) {
        
        res.status(500).send({ msg: 'Can not get my posts' })

    }
}

