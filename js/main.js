

$(document).ready(function() {


//smooth scroll
$('a[href*="#"]:not([href="#"])').not(".carousel-control,.no-smooth").click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 1000);
      return false;
    }
  }
});

//plus minus controls
$('.btn-number').click(function(e){
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});


$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });




  //navbar control
  $(window).scroll(function(){
      if ($(this).scrollTop() > 200) {
          $('#menu-scroll-show').fadeIn(100);
      } else {
          $('#menu-scroll-show').fadeOut(100);
      }
  });

  //mostrar grid
  $('#grid-trigger, #grid-trigger-close').click(function(){
    $('#articulos').fadeToggle('slow');
    $('.button-articulo').toggle();
    $('section').not('.grid-articulos,#carta').toggle();
  });

  //mostrar menu
  $('#slide-trigger,#sidebar-menu-close').click(function(e){
     e.preventDefault();
    $('.sidebar-menu').animate({width: 'toggle'});
  });

  $('.coltrigger').click(function(){

    if ($(this).next('.container-sub-articulo').css('display') == 'none') {
      $('.container-sub-articulo').slideUp();
      $(this).next('.container-sub-articulo').slideToggle();
    }else{
      $(this).next('.container-sub-articulo').slideUp();
    }


  });

  //mostrar carta editor
  $('#carta-editor-trigger, #carta-close').click(function(){
    $('#carta').fadeToggle('slow');
    $('.button-articulo').toggle();
  });


});
