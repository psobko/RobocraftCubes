APP.table.configureTable($('#cubeTable'), parts, $('#rowControls input'));

APP.errorMessages = {
  badFileType : 'Only JSON and CSV files are supported',

}
$('#cubeTable').stickyTableHeaders();
"use strict";

$table = $('#cubeTable');

$($table).editableTableWidget();

function showAlert(message) {
  $('#alertPlaceholder').html('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><p>'+message+'</p></div>');
}

function addTableControl(title, action)
{
  $('<button/>').attr('type','button')
                .addClass('btn btn-primary btn-xs')
                .click(action)
                .text(title)
                .appendTo($('#tableControls'));
}

function addTableControls(tableControls) {
  for(var title in tableControls) {
    addTableControl(title, tableControls[title]);
  }
}

function addDropdownControls(target, controls){
  for(var title in controls) {
    addDropdownOption(target, title, controls[title]);
  }
}

function addDropdownOption(parent, title, action) {
    parent.append($('<li/>')
          .append($('<a/>').click(action).text(title)));
}


addTableControls({
  'Insert Row':function() { APP.table.insertRow(); },
  'Delete Row':function() { APP.table.deleteRow(); },
  'Delete Selected':function() { APP.table.deleteSelectedRows(); },
  'Insert Col':function(){ },
  'Delete Col':function(){ }
  });

var $importDropdown = $('#importDropdown');
var $exportDropdown = $('#exportDropdown');
var $fileUpload = $('#fileUpload');

addDropdownControls($importDropdown, {
  Default:function(){ },
  Remote:function(){  },
  File:function(e){ $fileUpload.click();}
});

addDropdownControls($exportDropdown, {
  CSV:function(){  },
  JSON:function(){  }
});

$fileUpload.change(function (event) {
  var file = $(this).get(0).files[0];
  if(file.type == 'application/json') {

  } else if (file.type == 'text/csv') {

  } else {
    showAlert(APP.errorMessages.badFileType);
  }
  console.log(file);
});

