/**
 * APP
 */

var APP = APP || {}

APP.common = {
  toggleInArray : function(array, element){
    //TODO: no array = intialize one
    if(array.indexOf(element) > -1)
    {
      array.splice(array.indexOf(element), 1);
    }
    else
    {
      array.push(element);
    }
  }
}

/**
 * PARSING
 */

APP.parse = {
  toJSON: function(object) {
    return JSON.stringify(object);
  },
  toCSV : function(object) {
    return Papa.unparse(object);
  },
  fromJSON : function(json) {
    return JSON.parse(json);
  },
  fromCSV : function(csv) {
    return Papa.parse(csv);
  }
}

APP.io = {
  displayData: function(data){
    var newWindow = window.open();
    newWindow.location.href = "data:text/plain;charset=UTF-8," + data;
    $(newWindow.document.body).html(data);
  },
}

/**
 * TABLE
 */

APP.table = {
  data : undefined,
  table : undefined,
  properties : new Array(),
  rowControls : undefined,
  selectedCol : undefined,
  selectedRow : undefined,
  selectedRows: new Array(),

  configureTable : function(table, objects, controls){
    this.data = objects;
    this.properties = Object.keys(objects[0]);
    this.table = table;
    this.rowControls = controls;
    this.generateHeader()
    this.populateTable(objects);
  },
  populateTable : function(objects)
  {
    var hasRowControls = (this.rowControls != undefined);
    this.table.find('tbody').empty();

    var tr = $('<th/>').appendTo(this.table.find('tbody'));

    for (var i = 0; i < objects.length ; i++) {
        var item = objects[i];
        var $tr =  $('<tr/>');
          if(hasRowControls)
          {
            var td = $('<td/>').append(this.rowControls.clone()).appendTo($tr);
            td.click(function(e){
              APP.common.toggleInArray(APP.table.selectedRows, $(this).parent());
            });
          }
          for (var x = 0; x < this.properties.length; x++) {
            var propertyKey = this.properties[x];
            var value = item[propertyKey];
            var td = $('<td/>').attr('tabindex','1')
                               .text(value)
                               .appendTo($tr);
          }
          $tr.appendTo(this.table);
        }

        $("#cubeTable tbody").delegate('tr', 'click', function () {
          APP.table.selectedRow = $(this);
        });
        // Unused validation
        // $("#cubeTable tbody").delegate('td', 'validate', function (evt, newValue) {
        //   var hasRowControls = (this.rowControls != undefined);
        //   if($(this).indexOf() >= $.isNumeric(newValue))
        // });
  },
  generateHeader: function()
  {
    this.table.find('thead').empty();
    var tr = $('<tr/>').appendTo(this.table.find('thead'));
    if(this.rowControls != undefined )
    {
      $('<th/>').append(this.rowControls.clone()).appendTo(tr);
    }
    for (var propertyKey in this.properties) {
      var td = $('<th/>').attr('tabindex','1')
      .text(this.properties[propertyKey])
      .appendTo(tr);
    }
    $("#cubeTable thead").delegate('td', 'click', function () {
      APP.table.selectedCol = $(this);
    });

    $("#cubeTable thead input").click(function(event){
      if($(this).prop('checked'))
      {
        APP.table.selectedRows = APP.table.table.find('tbody tr');
        APP.table.table.find('input[type=checkbox]').prop("checked", true);
      }
      else
      {
        APP.table.selectedRows = new Array();
        APP.table.table.find('input[type=checkbox]').prop("checked", false);
      }
    });
  
  },
  addColumn: function() {
    for(var tableRow in this.table.find('tr')) {
      $('<td/>').attr('tabindex','1').appendTo(tableRow);
    }
  },
  deleteColumn: function() {
    for(var tableRow in this.table.find('tr')) {
      tableRow.find('td').eq(this.selectedCol).remove();
    }
    this.selectedCol = undefined;
  },
  insertRow : function() {
    var hasRowControls = (this.rowControls != undefined);
    var $tr = $('<tr/>').insertAfter(this.selectedRow);
    if(hasRowControls) {
          var controls =     $('<td/>').append(this.rowControls.clone());
          controls.appendTo($tr);
            }
    for (var i = 0; i < this.properties.length; i++) {
      $('<td/>').attr('tabindex','1').appendTo($tr);
    };
  },
  deleteRow: function(){
    this.selectedRow.remove();
    this.selectedRow = undefined;
  },
  deleteSelectedRows : function() {
    console.log(this.selectedRows);
    for( row in this.selectedRows) {
      $(this.selectedRows[row]).remove();
      row = null;
    }
    this.table.find('thead input').prop('checked', false);
    this.selectedRows = new Array();
  },
  toObject : function() {
   var myRows = [];
    var headersText = [];
    var $headers = this.table.find('th:not(:first-child)');

    var $rows = $("tbody tr").each(function(index) {
      $cells = $(this).find("td:not(:first-child)");
      myRows[index] = {};

      $cells.each(function(cellIndex) {
      if(headersText[cellIndex] === undefined) {
        headersText[cellIndex] = $($headers[cellIndex]).text();
      }
      myRows[index][headersText[cellIndex]] = $(this).text();
      });    
    });

    return myRows;
  }
}