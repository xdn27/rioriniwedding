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
    apiKey: "AIzaSyDMYJq8GBTstvfdaAMqEeLOqDaRsDilWf0",
    authDomain: "riowedding-1f06b.firebaseapp.com",
    databaseURL: "https://riowedding-1f06b-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "riowedding-1f06b",
    storageBucket: "riowedding-1f06b.appspot.com",
    messagingSenderId: "840421623983",
    appId: "1:840421623983:web:8c5cd3bdad6fbdc1d12c5a"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

AOS.init();
let isAnimate = false;

new fullpage('#fullpage', {
    autoScrolling: true,
    responsiveHeight: 600,
    afterSlideLoad: function(origin, destination){
        $('.slide.active [data-aos]').addClass("aos-animate");
    },
    afterLoad: function(origin, destination){
        $('.section.active [data-aos]').addClass("aos-animate");

        if(destination.isLast && !isAnimate){

            isAnimate = true;
        }
    }
});

setTimeout(function(){
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });
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
        let narr = [];

        $.each(d, function(i, v){
            let ucapan = v.ucapan + " - " + v.name;
            narr.push(ucapan);
        });
        
        shuffle(narr);
        
        narr.forEach(function(m, i){ 
            let timeout = (i+1) * getRandomArbitrary(5000, 6000);
            setTimeout(function(){
                displayToast(m);
            }, timeout);
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
        backgroundColor: 'linear-gradient(to right, #874f24, #d17d3d)',
        stopOnFocus: false,
    }).showToast();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }