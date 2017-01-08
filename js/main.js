
function sendMail() {
  nombres = $('#nombres').val();
  mail = $('#mail').val();
  destino = $('#destino').val();
  date = $('#date').val();
  date2 = $('#date2').val();
  adultos = $('#adultos').val();
  ninos = $('#ninos').val();

  mandrill_client = new mandrill.Mandrill('3Tc861aMBCeJTh2_U-znVA');
  var params = {
    "message": {
      "html": "<p>Example HTML content</p>",
      "text": "1",
      "subject": "2",
      "from_email": "3",
      "from_name": "4",
      "to": [{
        "email": "jorgeparraandrade@gmail.com",
        "name": "Jorge Parra",
        "type": "to"
      }],
      "headers": {
        "Reply-To": "message.reply@example.com",
      },
      "important": false,
      "track_opens": null,
      "track_clicks": null,
      "auto_text": null,
      "auto_html": null,
      "inline_css": null,
      "url_strip_qs": null,
      "preserve_recipients": null,
      "view_content_link": null,
      "bcc_address": "",
      "tracking_domain": null,
      "signing_domain": null,
      "return_path_domain": null,
      "merge": true,
      "merge_language": "mailchimp",
    },
    "async": false
  };
  var async = false;

  //date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = mm+'/'+dd+'/'+yyyy;

  var send_at = today;

  mandrill_client.messages.send({"message": params, "async": async, "send_at": send_at}, function(result) {
      console.log(result);
      /*
      [{
              "email": "recipient.email@example.com",
              "status": "sent",
              "reject_reason": "hard-bounce",
              "_id": "abc123abc123abc123abc123abc123"
          }]
      */
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
}



function functionVal(){
  var bandera = 0;

  $("input").each(function(index, el) {
    if (el.value=="") {
      $(this).addClass('error-box');
      el.focus();
      return false;
    }else {
      bandera++;
      return true;
    }
  });

  if (bandera!=0) {
    sendMail();
  }

}

var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split('&');
var val = sURLVariables[0].split('=')[1];


$(document).ready(function() {


  $( "#date,#date2" ).datepicker({
    numberOfMonths: [ 1, 2 ],
    minDate: 0,
  });

  $('#destino').selectmenu();

  if(val=="" || val==undefined){
  }else{
    $('#destino').val(val);
    $('#destino').selectmenu('refresh');
  }


  $('.menutoggle').click(function(e) {
    $('.container-menu-mobile').animate({width: 'toggle'});
  });


  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };

  $("input").not("input.mailfield").on("keyup change", function() {
     if (this.value=="") {
       $(this).addClass('error-box');
       $(this).focus();
       return false;
     }else{
       $(this).removeClass('error-box');
     };
  });

  $("input.mailfield").on("keyup change", function() {
     if (this.value=="" || !isValidEmailAddress(this.value)) {
       $(this).addClass('error-box');
       $(this).focus();
       return false;
     }else{
       $(this).removeClass('error-box');
     };
  });

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
