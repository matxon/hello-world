$(function() {
  var dialog; 
  var form = $("form");
  var name = $("#name");
  var ed = $("#autocomplete");
      
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
    
    if ( valid ) {
      $( "#charges tbody" ).append( "<tr>" +
                                 "<td>+</td>" +
        "<td>" + name.val() + "</td>" +
          "<td>" + ed.val() + "</td>" +
            "</tr>" );
      dialog.dialog( "close" );
    }
    return valid;
  }

  dialog = $("#dialog-form").dialog(dialogOptions);
  $("#addcharges").click(function() { dialog.dialog("open") });

  $("#autocomplete").autocomplete( { source: "/geted" } );
});
