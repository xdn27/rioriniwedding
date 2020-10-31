$.fn.shuffleChildren = function() {
    $.each(this.get(), function(index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function() {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

var firebaseConfig = {
    apiKey: "AIzaSyDhAbv34tHgW7PywCYybavvP7ZKqB09qSk",
    authDomain: "nitadeniswedding.firebaseapp.com",
    databaseURL: "https://nitadeniswedding.firebaseio.com",
    projectId: "nitadeniswedding",
    storageBucket: "nitadeniswedding.appspot.com",
    messagingSenderId: "315623021370",
    appId: "1:315623021370:web:68e09b4efda08571e40e03",
    measurementId: "G-Z08DK2M4GX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

AOS.init();

new fullpage('#fullpage', {
    autoScrolling: true,
    responsiveHeight: 800,
    afterSlideLoad: function(){
        $('.slide.active [data-aos]').addClass("aos-animate");
    },
    afterLoad: function(){
        $('.section.active [data-aos]').addClass("aos-animate");
    }
});

$('.grid').shuffleChildren();

setTimeout(function(){
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    let ch = $('.grid-wrapper').closest('.fp-tableCell').attr('style').split(':');
    let gh = $('.grid-wrapper')[0].scrollHeight;

    animate1();

    function animate1(){
        $('.grid').animate({
            top: ((gh-parseInt(ch[1])) * -1)
        }, 80000, function(){
            animate2();
        });
    }

    function animate2(){
        $('.grid').animate({
            top: 0
        }, 80000, function(){
            animate1();
        });
    }
}, 400);

let is_play = false;
$(document).on('click', 'body', function(){

    if(!is_play){
        var bgm = document.getElementById('bgm');
        bgm.play();
        is_play = true;
    }
});

$(document).on('click', '.exit-covid', function(e){
    e.preventDefault();
    $('#covid').fadeOut(500);
});

function saveToFirebase(name, ucapan) {
    var obj = {
        name: name,
        ucapan: ucapan,
        timestamp: -1 * new Date().getTime()
    };

    firebase.database().ref('ucapan').push().set(obj)
        .then(function(snapshot) {
            
        }, function(error) {
            
        });
}

$(document).on('click', '.button-ucapan a', function(e){
    e.preventDefault();
    $('.form').show();
    $('.thanks').hide();

    $('.dialog-ucapan').fadeIn();
});

$(document).on('click', '.form-close', function(e){
    e.preventDefault();

    $('.dialog-ucapan').fadeOut();
});

$(document).on('click', '.form-subimt', function(e){
    e.preventDefault();

    let n = $('input[name="name"]').val();
    let u = $('textarea[name="ucapan"]').val();

    if(n != '' && u != ''){
        saveToFirebase(n, u);
        $('input[name="name"]').val('');
        $('textarea[name="ucapan"]').val('');
        $('.form').hide(1, function(){
            $('.thanks').fadeIn();
        });
    }
});

$(window).on('load', function(){
    firebase.database().ref('ucapan').orderByChild('timestamp').on('value', function(snapshot){
         
        let d = snapshot.val();
        let n = 1;

        $.each(d, function(i, v){
            let timeout = n * getRandomArbitrary(5000, 6000);
            let ucapan = v.ucapan + " - " + v.name;
            
            setTimeout(function(){
                displayToast(ucapan);
            }, timeout);

            n++;
        });
    });               
});

function displayToast(ucapan){

    Toastify({
        text: ucapan,
        duration: 5000, 
        close: true,
        gravity: 'bottom',
        position: 'center',
        backgroundColor: 'linear-gradient(to right, #67a442, #96c93d)',
        stopOnFocus: false,
    }).showToast();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}