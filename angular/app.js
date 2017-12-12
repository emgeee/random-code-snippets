
;(function(window) {

function myService() {
  var self = this;

  this.hello = 'world'

  this.printHello = function() {
    console.log('from this: hello', self.hello)
  }

}

myService.prototype.b = function() {
  console.log('From prototype: hello', this.hello)
}


angular.module('app', [])
.service('myService', myService)
.factory('myFactory', function() {
  return myService;
})
.run(function(myService, myFactory) {
  console.log(myService)
  myService.printHello()
  myService.b()

  console.log('myFactory')

  var factory = new myFactory()
  factory.printHello();
  factory.b();
})


})(window);
