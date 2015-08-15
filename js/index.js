APP.table.configureTable($('#cubeTable'), parts, $('#rowControls input'));

APP.errorMessages = {
  badFileType : 'Only JSON and CSV files are supported.',
  unknownError: 'An unknown error has occured.'
}

function showAlert(message) {
  $('#alertPlaceholder').html('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><p>'+message+'</p></div>');
}

/**
 * Table Config
 */

var $table = $('#cubeTable');
$table.editableTableWidget();
$table.stickyTableHeaders();
var $importDropdown = $('#importDropdown');
var $exportDropdown = $('#exportDropdown');
var $fileUpload = $('#fileUpload');


function addTableControls(tableControls) {
  for(var title in tableControls) {
    $('<button/>').attr('type','button')
                  .addClass('btn btn-primary btn-xs')
                  .click(tableControls[title])
                  .text(title)
                  .appendTo($('#tableControls'));
  }
}

function addDropdownControls(target, controls){
  for(var title in controls) {
    target.append($('<li/>')
          .append($('<a/>').click(controls[title]).text(title)));
  }
}

/**
 * Menu 
 */

addTableControls({
  '+ Row':function() { APP.table.insertRow(); },
  '- Row':function() { APP.table.deleteRow(); },
  '- Selected':function() { APP.table.deleteSelectedRows(); },
  // '+ Col':function(){ },
  // '- Col':function(){ }
  });

addDropdownControls($importDropdown, {
  Default:function(){ 
    $.get('robocraftCubes.json', function(data) {
      try {APP.table.populateTable(APP.parse.fromJSON(r.result)); }
      catch(e){   showAlert(e['message'] ? e['message'] : APP.errorMessages.unknownError); }
    });
  },
  // Remote:function(){  },
  File:function(e){ $fileUpload.click();}
});

addDropdownControls($exportDropdown, {
  CSV:function(){ APP.io.displayData(APP.parse.toCSV(APP.table.toObject())) },
  JSON:function(){ APP.io.displayData(APP.parse.toJSON(APP.table.toObject())) }
});

/**
 * File Upload
 */

$fileUpload.change(function (event) {
  var file = $(this).get(0).files[0];
  var stringData;
  try {
    var r = new FileReader();
    if(file.type == 'application/javascript') {
      r.onload = function(){
        try{
          APP.table.populateTable(APP.parse.fromJSON(r.result));
        }catch(e){
          showAlert(e['message'] ? e['message'] : APP.errorMessages.unknownError);
        }
      }
      stringData = r.readAsText(file);
    } else if (file.type == 'text/csv') {
      r.onload = function(){
        try{
          result = APP.parse.fromCSV(r.result);
        }catch(e){
          showAlert(e['message'] ? e['message'] : APP.errorMessages.unknownError);
        }
      }
      stringData = r.readAsText(file);
    } else {
      showAlert(APP.errorMessages.badFileType);
      return;
    }
  } catch (e) {
    showAlert(e['message'] ? e['message'] : APP.errorMessages.unknownError);
  }
});


