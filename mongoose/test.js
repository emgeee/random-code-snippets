var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')

// mongoose.connection.on('error', function(err) {
//   console.error('Mongoose connection error:', err)
// })

var TestSchema = mongoose.Schema({
  test: {
    type: String,
    required: true
  },
  test_enum: {
    type: String,
    enum: [ 'a', 'b', 'c' ],
    required: true
  }
})

var Test = mongoose.model('Test', TestSchema)

var a = new Test({})

a.save(function (err) {
  console.log('\n\nsaving a:', err)
})

var a2 = new Test({
  test: 'hello world',
  test_enum: undefined
})

a2.save(function (err) {
  console.log('\n\nsaving a2:', err)
})
