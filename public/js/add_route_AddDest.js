var addDestTemplate =
  '<div class="form_group"> \
  Next Destination Point #{{counter}}: <input type="text" name="location[{{counter}}]" class="destinationTextbox" id="location"><br> \
  <hr> \
  </div>';

var form_template = Hogan.compile(addDestTemplate);          
var counter = 0;