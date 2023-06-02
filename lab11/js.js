var print = console.log;

/*
Create a 'Student' constructor, like we did for Cat in class.
It should have the following fields:
*firstName
*lastName
*studentID
*display -- A function that prints out the firstName, lastName, and studentID number.
      To invoke it, you should call `student.display()`.
*/
function Student(firstName, lastName, studentID){
  this.firstName = firstName;
  this.lastName = lastName;
  this.studentID = studentID;
  this.display = function(){
    print("First Name: " + this.firstName);
    print("Last Name: " + this.lastName); 
    print("Student ID: " + this.studentID);
  }
}

var child1 = new Student('child', 'ren', '1');
child1.display();

var child2 = new Student('child', 'ren', '2');
child2.display();
child2.graduated = true;

var children = [child1, new Student('child', 'ren', '3'), child2];

var forEach = function(arr, f) {
  var i;
  for (i = 0; i < arr.length; i++) {
    f(arr[i]);
  }
};

print("Displaying all children");
//forEach(children, print);

var child3 = { 
  firstName: 'child', 
  lastName: 'ren', 
  studentID: '4',
};
child3.__proto__.display = children[0].display;

child3.display();
