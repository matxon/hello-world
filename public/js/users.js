$(function() {
  var dialog; 
  var form = $("form");
  var name = $("#name");
  var pass = $("#password");
      
  var dialogOptions = {
    autoOpen: false,
    modal: true,
    width: 550,
    buttons: [
      { text: "Жазу", click: function() {
          console.log(form[0]);
          addTable();
        }
      }
    ]
  }


  function addTable() {
    var valid = true;
    
    var regexp = "\[0-9A-za-z]";

    if ( valid ) {
      $( "#charges tbody" ).append( "<tr>" +
                                 "<td>+</td>" +
        "<td>" + name.val() + "</td>" +
          "<td>" + pass.val() + "</td>" +
          '<td><button type="button" class="btn btn-default btn-xs">' +
          '<span class="glyphicon glyphicon-pencil"></span></button>' +
          '<button type="button" class="btn btn-default btn-xs">' +
          '<span class="glyphicon glyphicon-trash"></span></button></tr>' );
      form[0].reset();
      dialog.dialog( "close" );
    }
    return valid;
  }

  dialog = $("#dialog-form").dialog(dialogOptions);

  $("#addcharges").click(function() { dialog.dialog("open") });

  $("#test").click( function() { 
    var td = $("td");
    var temp = [];
    for (var i = 0; i < td.length; i += 4) {
      temp.push({ id:'', name: td[i+1].innerText, pass: td[i+2].innerText });
    }

    console.log(temp);
  });
  dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addTable();
  });

  $("#autocomplete").autocomplete( { source: "/geted" } );
});
