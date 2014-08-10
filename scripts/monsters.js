/**
 * Created with JetBrains PhpStorm.
 * User: Slight
 * Date: 10.08.14
 * Time: 18:36
 * To change this template use File | Settings | File Templates.
 */

function Monster(name, health, currentHealth){
    this.name=name;
    this.health=health;
    this.curreHealth=currentHealth;
    //я подозреваю что health и currentHealth стоит убрать из базового объекта
    //потому что их всё равно приходится переопределять в прототипах
}
Monster.prototype.sayName=function(){
    console.log("My name is ", this.name);
};

Monster.prototype.wound=function(Enemy){
    Enemy.currentHealth-=5;
    console.log(this.name, "damaged", Enemy.name);
}; //возникла сложность при переопределении для разных прототипов - в связи с разным уровнем повреждений :(

function CatMonster (){
    Monster.apply(this, arguments);
    this.health=50;
    this.currentHealth=50;
}

CatMonster.prototype=Object.create(Monster.prototype);
CatMonster.prototype.scratch=Monster.prototype.wound.bind(CatMonster);


function BirdMonster(name, health){
    Monster.call(this, name, health);
    this.health=60;
    this.currentHealth=60;
}
BirdMonster.prototype=Object.create(Monster.prototype);
BirdMonster.prototype.peck=function(Enemy){
    Enemy.currentHealth-=3;
    console.log(this.name, "damaged", Enemy.name);
};

var cat1=new CatMonster("cat1");
console.log(cat1);
cat1.sayName();
var cat2=new CatMonster("cat2");
console.log(cat2);
cat2.sayName();

var bird1=new BirdMonster("bird1");
console.log(bird1);
bird1.sayName();
var bird2=new BirdMonster("bird2");
console.log(bird2);
bird2.sayName();

cat1.scratch(bird1);
console.log(bird1.currentHealth);
bird2.peck(cat2);
console.log(cat2.currentHealth);