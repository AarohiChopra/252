"use strict";

function addMixin(o, mixin) {
  //
  // ***YOUR CODE HERE***
  //
}

// A sample mixin.
let PlayableMixin = {
  // Plays a system bell 3 times
  play: function() {
    console.log("\u0007");
    console.log("\u0007");
    console.log("\u0007");
  },
  duration: 100,
};

function Song(name, performer, duration) {
  this.name = name;
  this.performer = performer;
  this.duration = duration;
}
Song.prototype = addMixin(Song.prototype, PlayableMixin);

Song.prototype.display = function() {
  console.log(`Now playing "${this.name}", by ${this.performer}. (${this.duration})`);
}

let s = new Song("Gun Street Girl", "Tom Waits", "4:17");
s.display();
s.play();

console.log(s.duration);

s = s.__original;

console.log(s.play);

