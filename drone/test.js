var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' },
  device:
    [{name: 'drone', driver: 'ardrone'},
    {name: 'nav', driver: 'ardroneNav'}],

  work: function(my) {

    my.drone.config('general:navdata_demo', 'TRUE');
    my.nav.on('update', function(data) {
      console.log("here")
      Logger.info(data);
    });

    my.drone.takeoff();
    after((2).seconds(), function() {
      my.drone.land();
    });
    after((3).seconds(), function() {
      my.drone.stop();
    });
  }
}).start();
