/************************************
 * APP
 ************************************/

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

/************************************
 * PARSING
 ************************************/

APP.parse = {
  toJSON: function(object) {
    console.log(JSON.stringify(object));
  },
  toCSV : function(object) {
    console.log(Papa.unparse(object));
  },
  fromJSON : function(json) {

  },
  fromCSV : function(csv) {

  }
}

APP.io = {
  exportData: function(data){},
  displayData: function(data){},
  importData: function(data){}
}


// var data = Papa.parse(csv);

// // Convert back to CSV
// var csv = Papa.unparse(data);

// // Parse local CSV file
// Papa.parse(file, {
//   complete: function(results) {
//     console.log("Finished:", results.data);
//   }


// var myObj = {
//       "myrows": myRows
//     };
//     console.log(JSON.stringify(myObj));

/************************************
 * TABLE
 ************************************/

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
        APP.table.selectedRows = this.table.find('tbody tr');
        APP.table.find('input[type=checkbox]').prop("checked", true);
      }
      else
      {
        APP.table.selectedRows = new Array();
        APP.table.find('input[type=checkbox]').prop("checked", false);
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
    // row.remove();
    // console.log(this.selectedRows);
    for( row in this.selectedRows) {
      // console.log(row);
      $(row).remove();
    }
    this.table.find('thead input').prop('checked', false);
    // for (var i = 0; i < indexes.length; i++) {
    //   this.table.find('tbody').find('tr').eq(index).remove();
    // }
    this.selectedRows = new Array();
  },
  exportContentsToObject : function() {
     var myRows = [];
    var headersText = [];
    var $headers = table.find('th:not(:first-child)');

    // Loop through grabbing everything
    var $rows = $("tbody tr").each(function(index) {
      $cells = $(this).find("td:not(:first-child)");
      myRows[index] = {};

      $cells.each(function(cellIndex) {
      // Set the header text
      if(headersText[cellIndex] === undefined) {
        headersText[cellIndex] = $($headers[cellIndex]).text();
      }
      // Update the row object with the header/cell combo
      myRows[index][headersText[cellIndex]] = $(this).text();
      });    
    });

    return myRows;
  }
}

  


// APP.JSON.convertTableDataToJSON($('#cubeTable'));
