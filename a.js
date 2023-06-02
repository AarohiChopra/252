function Car(make, model, year) {
this.make = make;
this.model = model;
this.year = year;
this.honk = function() { console.log("honk!"); }
}
Car.prototype.honk = function() { console.log("Meep!"); }
var car1 = new Car("Chevy", "Nova");
var car2 = new Car("Tesla", "Model S", 2014);
var car3 = Car("Ford", "Explorer", 2001); // Forgot to call "new"
car1.honk();
delete car2.honk;
car1.honk();
car2.honk();
//car3.honk();
console.log(model);