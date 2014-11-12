$(function() {

  var dialog; 
  var form = $("form");
  var name = $("#name");
  var pass = $("#password");
  var table = $("#charges tbody");

  var dialogOptions = {
    autoOpen: false,
    modal: true,
    width: 550,
    buttons: [
      { text: "Жазу", click: function() {
          savebase();
        }
      }
    ],
    close: function() {
      form[0].reset();
    }
  }

  function addtable( user ) {
        table.append("<tr>" +
          "<td>" + user.id + "</td>" +
          "<td>" + user.name + "</td>" +
          "<td>" + user.pass + "</td>" +
          '<td><button type="button" class="btn btn-default btn-xs">' +
          '<span class="glyphicon glyphicon-pencil" data-id="' + user.id + '"></span></button>' +
          '<button type="button" class="btn btn-default btn-xs">' +
          '<span class="glyphicon glyphicon-trash" data-id="' + user.id + '"></span></button></tr>' );
  }
  
  function myescape( text ) {
    var templ = '"<>&\'';
    var r = ['&quot', '&lt', '&gt', '&amp', '&#039'];
    var temp = '';

    for (var i=0; i<text.length; i++) {
      var j = templ.indexOf(text.charAt(i));
      temp += ((j<0) ? text.charAt(i) : r[j]);
    }
    return temp;
  }

  function savebase() {
    var temp = { name: myescape(name.val()), pass: myescape(pass.val()) };

    console.log( temp );

    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: temp,
      success: function( newUser ) {
        addtable( newUser );
        dialog.dialog("close");
      },
      error: function() {
        alert('error saving user');
      }
    });
  }
  dialog = $("#dialog-form").dialog(dialogOptions);

  $("#addcharges").click(function() { dialog.dialog("open") });

  $("#autocomplete").autocomplete( { source: "/geted" } );

  dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    savebase();
  });

  table.delegate('span', 'click', function () {
    if ($(this).hasClass('.glyphicon-pencil'))
    {
      // жазылған мәліметті өзгерту
    } else {
      // мәліметті өшіру
    }
  });

  $.ajax({
    type: 'GET',
    url: '/api/users',
    success: function( users ) {
      $.each( users, function(i, user) {
        addtable( user );
      });
    }
  });

});
