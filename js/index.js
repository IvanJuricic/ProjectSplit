$(document).ready(function () {

     $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        centerMode: false,
        focusOnSelect: true
    });

    $('.modalTextWrapp').mCustomScrollbar();
    $('.daysItems').on('click', function () {
        $(this).toggleClass('click');
        if ($('.jmenuItems.click').length) {
            // $('.jButtonGo').toggleClass('buttonGo');
            $('.jButtonGo').toggleClass('hide');
        }
        for (var i = 0; i < 7; i++) {
            if (!($('.jdaysItems').eq(i)[0] === $(this)[0])) {
                $('.jdaysItems').eq(i).toggleClass('disabled');
                $('.jdaysItems').eq(i).toggleClass('daysItems');
            }
        }

    });

    $('#langCro').on('click', function () {
        $('#langCro').toggleClass('disabledLang');
        $('#langEng').toggleClass('disabledLang');
    });
    $('#langEng').on('click', function () {
        $('#langCro').toggleClass('disabledLang');
        $('#langEng').toggleClass('disabledLang');
    });

    $('.menuItems').on('click', function () {
        $(this).toggleClass('click');
        if ($('.jdaysItems.click').length) {
            // $('.jButtonGo').toggleClass('buttonGo');
            $('.jButtonGo').toggleClass('hide');
        }
        for (var i = 0; i < 4; i++) {
            if (!($('.jmenuItems').eq(i)[0] === $(this)[0])) {
                $('.jmenuItems').eq(i).toggleClass('disabled');
                $('.jmenuItems').eq(i).toggleClass('daysItems');
            }
        }
    });

    $('.card').on('click', function () {
        alert('hello');
    });

    $('.buttonGo').on('click', function () {
        $('.jmenuItems').toggleClass('userSelect');
        $('.jdaysItems').toggleClass('userSelect');
        $('#eventSection').toggleClass('eventSectionShow');
        $(this).toggleClass('hide');
    });
    $('.exitButton').on('click', function () {
        $('.jmenuItems').toggleClass('userSelect');
        $('.jdaysItems').toggleClass('userSelect');
        $('#eventSection').removeClass('eventSectionShow');
        $('.click').toggleClass('click');
        $('.disabled').toggleClass('daysItems');
        $('.disabled').toggleClass('disabled');
    });

    var $width = $(window).width();
    $('#nav').css('opacity', '0');
    $(window).scroll(function () {
        var $wscroll = $(this).scrollTop();
        var $viewportHeight = $(window).height();
        $('.headerItems').css({
            'transform': 'translate(0px, ' + $wscroll / 6 + '%)'
        });
        if ($wscroll > $viewportHeight / 10) {
            $('#nav').css({
                'opacity': ' 0' + $wscroll / ($viewportHeight - 100) + '',
                'pointer-events': 'all',
                'cursor': 'pointer'

            });
        } else {
            $('#nav').css({
                'opacity': 0,
                'pointer-events': 'none',
                'cursor': 'default'
            });
        }

    });


    var h = false;
    $(document).on('click', '.Beaches, .Culture, .Clubs, .Other', function () {
        if (h == false) {
            $(this).toggleClass('jOfferHidden');
            $('.jOfferHidden').toggleClass('disabled');
            if (!$('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
                $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
            }
            $(".heading").slideToggle(500);
            $(".carousel").slideToggle(1000);
            h = true;
        }
        else {
            $(this).toggleClass('jOfferHidden');
            $('.disabled').toggleClass('disabled');
            if (!$('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
                $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
            }
            $(".heading").slideToggle(500);
            $(".carousel").slideToggle(1000);
            h = false;
        }

    });

    var b = false;
    $("#mapimage").click(function () {
        if (b == false) {
            $("#mapText").toggle("slide");
            $(".mapLocation_descriptionBox").toggle("slide");
            b = true;
        }
        else {
            $("#mapText").toggle("slide");
            $(".mapLocation_descriptionBox").toggle("slide");
            b = false;
        }
    });

    $('#myModalEvent').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
    });
    $('#myModalLocation').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
    });


    $('#closeBtnInfoLocation').click(function () {
        $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
    });
        // Dio sa busevima
    
        var modal = document.getElementById('myModal');
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = document.getElementById('cityNetwork');
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    
        //linija omiš - split
        $(".omisLineDescription").click(function(){
            if(!($(".omisLineImage").hasClass(".isActive"))&&(!($(".airportLineImage")).hasClass(".isActive")||(!($(".ferryLineImage").hasClass(".isActive")))||(!($(".cityCentreLineImage").hasClass(".isActive"))))){ 
                $(".omisLineImage").removeClass("isActive");
                $(".airportLineImage").addClass("isActive");
                $(".ferryLineImage").addClass("isActive");
                $(".cityCentreLineImage").addClass("isActive");
            }
        });
    
        //linija k.sucurac - trajektna
        $(".ferryLineDescription").click(function(){
            if(!($(".ferryLineImage").hasClass(".isActive"))&&(!($(".airportLineImage")).hasClass(".isActive")||(!($(".omisLineImage").hasClass(".isActive")))||(!($(".cityCentreLineImage").hasClass(".isActive"))))){ 
                $(".ferryLineImage").removeClass("isActive");
                $(".airportLineImage").addClass("isActive");
                $(".omisLineImage").addClass("isActive");
                $(".cityCentreLineImage").addClass("isActive");
            }
    
        });
    
        //linija city centar - hnk
        $(".cityCentreLineDescription").click(function(){
            if(!($(".cityCentreLineImage").hasClass(".isActive"))&&(!($(".airportLineImage")).hasClass(".isActive")||(!($(".omisLineImage").hasClass(".isActive")))||(!($(".ferryLineImage").hasClass(".isActive"))))){ 
                $(".cityCentreLineImage").removeClass("isActive");
                $(".airportLineImage").addClass("isActive");
                $(".omisLineImage").addClass("isActive");
                $(".ferryLineImage").addClass("isActive");
            }
    
        })  ;
        
        //linija trogir - split
        $(".airportLineDescription").click(function(){
            if(!($(".airportLineImage").hasClass(".isActive"))&&(!($(".cityCentreLineImage")).hasClass(".isActive")||(!($(".omisLineImage").hasClass(".isActive")))||(!($(".ferryLineImage").hasClass(".isActive"))))){ 
                $(".airportLineImage").removeClass("isActive");
                $(".cityCentreLineImage").addClass("isActive");
                $(".omisLineImage").addClass("isActive");
                $(".ferryLineImage").addClass("isActive");
            }
    
        });

        //responsive prototip
        $(".expand1").click(function(){
            $(".moreAboutSustipan").fadeToggle(100);
            $(".sustipan").toggleClass("openedBar");
            $(".sustipan").toggleClass("closedBar");
        })
        $(".expand2").click(function(){
            $(".moreAboutDioklecijan").fadeToggle(100);
            $(".dioklecijan").toggleClass("openedBar");
            $(".dioklecijan").toggleClass("closedBar");
        })
        $(".expand3").click(function(){
            $(".moreAboutDuje").fadeToggle(100);
            $(".duje").toggleClass("openedBar");
            $(".duje").toggleClass("closedBar");
        })
        $(".expand4").click(function(){
            $(".moreAboutMarjan").fadeToggle(100);
            $(".marjan").toggleClass("openedBar");
            $(".marjan").toggleClass("closedBar");
        })
        $(".expand5").click(function(){
            $(".moreAboutWc").fadeToggle(100);
            $(".wc").toggleClass("openedBar");
            $(".wc").toggleClass("closedBar");
        })
        $(".expand6").click(function(){
            $(".moreAboutMestrovic").fadeToggle(100);
            $(".mestrovic").toggleClass("openedBar");
            $(".mestrovic").toggleClass("closedBar");
        })
        $(".expand7").click(function(){
            $(".moreAboutPeristil").fadeToggle(100);
            $(".peristil").toggleClass("openedBar");
            $(".peristil").toggleClass("closedBar");
        })
        $(".expand8").click(function(){
            $(".moreAboutKlis").fadeToggle(100);
            $(".klis").toggleClass("openedBar");
            $(".klis").toggleClass("closedBar");
        })
        $(".expand9").click(function(){
            $(".moreAboutSalona").fadeToggle(100);
            $(".salona").toggleClass("openedBar");
            $(".salona").toggleClass("closedBar");
        })

    
});

