$(document).ready(() => {
    var waypoint = new Waypoint({
        element: document.getElementsByClassName('section-about'),
        handler: function (direction) {
            $('header nav').toggleClass('sticky');
        },
        offset: '25%'
    })
})