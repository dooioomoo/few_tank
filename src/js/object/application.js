var hi = require('./module');

var app = new Vue({
    el: '#header',
    data: {
        title: hi.hi(),
        dake: hi.he(),
        logo_image: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/757px-Apple_logo_black.svg.png" width="200px">',
    }
})


var example1 = new Vue({
    el: '#example-1',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
})
