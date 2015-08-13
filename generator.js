var APP = APP || {}

APP.common = {
  toggleInArray : function(array, element){
    //TODO: no array = intialize one
    if(array.indexOf(element) > -1)
    {
      array.splice(array.index(element), 1);
    }
    else
    {
      array.push(element);
    }
  }
}

APP.JSON = {
  convertObjectToJSON: function(object){
    console.log(JSON.stringify(object));
  },
  convertTableDataToJSON : function)
}

APP.table = {
  table : undefined,
  properties : new Array(),
  rowControls : undefined,
  selectedCol : undefined,
  selectedRow : undefined,
  selectedRows: new Array(),

  configureTable : function(table, objects, controls){
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

    var tr = $('<tr/>').appendTo(this.table.find('tbody'));

    for (var i = 0; i < objects.length ; i++) {
        var item = objects[i];
        var $tr =  $('<tr/>');
          if(hasRowControls)
          {
            var td = $('<td/>').append(this.rowControls.clone()).appendTo($tr);
            td.click(function(e){
            APP.common.toggleInArray(APP.table.selectedRows, $(this).index());
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
          // $(this)
        });
        // $("#cubeTable tbody").delegate('td', 'click', function (e) {
          
        // });
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
      $('<td/>').append(this.rowControls.clone()).appendTo(tr);
    }
    for (var propertyKey in this.properties) {
      var td = $('<td/>').attr('tabindex','1')
      .text(this.properties[propertyKey])
      .appendTo(tr);
    }
    $("#cubeTable thead").delegate('td', 'click', function () {
      APP.table.selectedCol = $(this);
    });

    $("#cubeTable thead input").click(function (e) {
      if($(this).prop('checked'))
      {
        APP.table.selectedRows = APP.table.table.find('tbody td');
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
    for(tableRow in this.table.find('tr')) {
      $('<td/>').attr('tabindex','1').appendTo(tableRow);
    }
  },
  deleteColumn: function() {
    for(tableRow in this.table.find('tr')) {
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
  deleteRows : function(indexes) {
    for (var i = 0; i < indexes.length; i++) {
      this.table.find('tbody').find('tr').eq(index).remove();
    }
        this.selectedRow = undefined;
  }
}

  APP.table.configureTable($('#cubeTable'), parts, $('#rowControls input'));

    $('#cubeTable').stickyTableHeaders();

