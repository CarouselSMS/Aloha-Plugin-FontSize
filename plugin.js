/**
 * Font Size Plugin
 */
GENTICS.Aloha.FontSize = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.FontSize');

/**
 * Configure the available languages
 */
GENTICS.Aloha.FontSize.languages = ['en'];

/**
 * Initialize the plugin and set initialize flag on true
 */
GENTICS.Aloha.FontSize.init = function () {	
	
  var that = this,
      buttons = [],
      names = ['increase', 'decrease'],
      stylePath = GENTICS_Aloha_base + '/plugins/com.gentics.aloha.plugins.FontSize/css/FontSize.css';

  jQuery('<link rel="stylesheet" />').attr('href', stylePath).appendTo('head');
  jQuery.each(names, function(index, value){
    buttons.push(new GENTICS.Aloha.ui.Button({
      "iconClass" : "GENTICS_button_" + value,
      "size" : "small",
      "onclick": function () {
        if (GENTICS.Aloha.activeEditable) {
  				GENTICS.Aloha.activeEditable.obj[0].focus()
  			}

  			var newSize,
  			    markup = jQuery('<span></span>'),
  			    rangeObject = GENTICS.Aloha.Selection.rangeObject,
  			    foundMarkup = rangeObject.findMarkup(function() {
  				    return this.nodeName.toLowerCase() == markup.get(0).nodeName.toLowerCase()
  			    }, GENTICS.Aloha.activeEditable.obj);

  			if (foundMarkup) {  			  
  			  newSize = (parseInt(jQuery(foundMarkup).css('font-size')) + (index === 0?1:-1)) + 'px';
  			  jQuery(foundMarkup).css('font-size', newSize);  				
  			} else {
  				GENTICS.Utils.Dom.addMarkup(rangeObject, markup)
  			}

  			rangeObject.select();
  			return false
      }
    }));
  });
  
  
  for (var i=0; i < names.length; i++) {
    GENTICS.Aloha.FloatingMenu.addButton(
      "GENTICS.Aloha.continuoustext", 
      buttons[i], 
      that.i18n("floatingmenu.tab.format"), 
      1
    );
  }
};