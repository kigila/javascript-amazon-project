class Car{
  #brand;
  #model;
  speed;
  constructor(carDetails){
    this.#brand=carDetails.brand;
    this.#model=carDetails.model;
    this.speed=0;
    this.isTrunkOpen=false;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, trunkOpen: ${this.isTrunkOpen}`)
  }

  go(){
   if(this.speed<200 && this.isTrunkOpen===false) this.speed +=5;
  }
  brake(){
   if(this.speed>0){
    this.speed -=5;
   }
  }

  openTrunk(){
   if(this.speed===0) {
    this.isTrunkOpen=true
  }
  }

  closeTrunk(){
    this.isTrunkOpen=false;
  }
}


class RaceCar extends Car{
  acceleration;
  constructor(carDetails){
    super(carDetails);
    this.acceleration=carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}


const car1=new Car({brand: 'Toyota',model: 'Corolla'});
const car2=new Car({brand: 'Tesla',model: 'Model 3'});
const car3=new RaceCar({brand: 'McLaren',model: 'F1', acceleration: 20});
console.log(car1)
console.log(car2)
console.log(car3)
car1.displayInfo()
car2.displayInfo()
car2.isTrunkOpen=true;
car3.openTrunk();
console.log(car2)



for (let i=0;i<=10;i++){
  if(Math.random()>0.5){
    car3.go();
  } else{
    car3.brake()
  }
  car3.displayInfo()
}
