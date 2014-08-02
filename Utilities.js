"use strict"
var Utilities = (function() {
    var indents = 0;
    return {

        /**
         * Number validator for an input text field.  Apply the following to the input field:
         *          onkeypress="Utilities.numericValidation(event)"
         *          OR
         *          myHTMLElement.addEventListener("keypress",Utilities.numericValidation);
         * @param event
         */
        numericValidation : function numericValidation(event) {
            var theEvent = event || window.event;
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode( key );
            var regex = /[0-9]|\./;
            if (event.currentTarget.value.indexOf(".") != -1) {
                regex = /[0-9]/;
            }
            if( !regex.test(key) ) {
                Utilities._stopTheEvent(theEvent);
            }
        },

        /**
         /**
         * For internal use only this is used to stop the input event.  Use if validation failed.
         * @private
         * @param event
         */
        _stopTheEvent : function _stopTheEvent(event) {
            if(event.preventDefault) {
                event.preventDefault();
            }
            else {
                event.returnValue = false; // older deprecated event cancelation
            }
        },


        /**
         * Checks if field is empty on blur.  If so, put the default value, such as 'Enter Age' back in.
         * Element should have a data-incompletevalue attr.
         *
         * @param event
         */
        checkEmptyOnBlur :function checkEmptyOnBlur(event) {
            var value = event.currentTarget.value;
            var defaultVal = event.currentTarget.getAttribute("data-incompletevalue");
            if (value.length == 0){
                event.currentTarget.value = defaultVal;
            }
        },

        /**
         * Removes the default string if present. Element should have a data-incompletevalue attr.
         * @param event
         * @returns
         */
        clearDefaultOnFocus : function clearDefaultOnFocus(event) {
            var value = event.currentTarget.value;
            var defaultVal = event.currentTarget.getAttribute("data-incompletevalue");
            if (value==defaultVal){
                event.currentTarget.value="";
            }
        },

        /**
         * Takes in raw numbers and converts to a currency format for HTML display.  Adds symbol, commas, and rounds
         * to two decimal places
         *
         * @param type - currently support Utilities.EURO, Utilities.DOLLAR, Utilities.POUND;
         * @param num - number to convert
         * @returns {string} - HTML encoded format for display
         */
        convertToCurrencyFormat : function convertToCurrencyFormat(type, num){
            var returnNumber = num.toFixed(2);
            var numberMain = returnNumber.split(".")[0];
            var numberDecimal = returnNumber.split(".")[1];
            var digitsCtr = 0;
            for (var i=numberMain.length-1; i>=0; i--){
                digitsCtr++;
                if((digitsCtr == 3)&&(i != 0)){
                    var pre = numberMain.substr(0, i);
                    var withPunctuation = pre.concat(",");
                    var final = withPunctuation.concat(numberMain.substr(i,numberMain.length ));
                    numberMain = final;
                    digitsCtr=0;
                }
            }
            if (type == Utilities.DOLLAR){
                return ("$"+numberMain + "." + numberDecimal);
            }
            else if (type == Utilities.EURO){
                return ("&euro;"+numberMain + "." + numberDecimal);
            }
            else if (type == Utilities.POUND){
                return ("&pound;"+numberMain + "." + numberDecimal);
            }
        },


        /**
         * Traverses the array recursively, prints to log when it gets to a key or a leaf, otherwise, recurses.
         *
         * @param o - the object
         * @private
         */
        inspectArray : function inspectArray(array){
            var spaces='';
            for (var i = 0;i<indents;i++){
                spaces = spaces.concat("    ");
            }
            var str = spaces.concat ("[");
            console.log(str)
         //   console.log("[")
            for (var i = 0;i< array.length; i++){
                var type = typeof array[i];

                if (Array.isArray(array[i])){
                 //   indents++;
                    Utilities.inspectArray(array[i]);

                }




                else if(typeof array[i] == "object"){
                    Utilities.inspectObject(array[i]);
                }
              //  else if (){//check for array in this array
                //
               // }
                else {
                    str = spaces.concat (array[i]);
                    console.log(str);
                }

            }
            str = spaces.concat ("]");
            console.log(str);

        },


        /**
         * Logs a JSON type object to the console in so that the developer can quickly see the schema.
         * Resets indentation, then calls _inspectObject
         * @param o - the JSON object
         */
        inspect: function inspect(o){
            indents=0;
            Utilities.inspectObject(o);

        },
        /**
         * Traverses the object recursively, prints to log when it gets to a key or a leaf, otherwise, recurses.
         *
         * @param o - the object
         * @private
         */
        inspectObject : function inspectObject(o){
            for (var key in o){
                var str = "";
                var spaces = "";
                for (var i = 0;i<indents;i++){
                    spaces = spaces.concat("    ");
                }
                str = spaces.concat ("{key: " + key);
                console.log(str );
                if (Array.isArray(o[key])){
                    indents++;
                    Utilities.inspectArray(o[key]);

                }
                else if (typeof o[key] == "object"){
                    indents++;
                    Utilities.inspectObject(o[key]);
                }
                else {
                    str = spaces.concat (" val: " + o[key]);
                    console.log(str );
                  //  console.log("value: " + o[key]);
                }
                str = spaces.concat ("}" );
                console.log(str)

            }
        },

        /**
         * Checks if string can be converted to number.
         *
         * @param str
         * @returns {boolean}
         */
        isStringNumber : function isStringNumber (str){
            if (isNaN(str)){
                return false;
            }else {
                return true;
            }
        },

        /**
         * Takes in a string, converts to a number if possible, otherwise returns the string
         *
         * @param str
         * @returns Number, if possible, otherwise String
         */
        convertStringToNumberIfPossible : function convertStringToNumberIfPossible(str){
            if (Utilities.isStringNumber(str)){//check if is number
                return parseFloat(str);
            }else {//otherwise return string
                return str;
            }
        }
    };
})();

Utilities.EURO="euro";
Utilities.DOLLAR="dollar";
Utilities.POUND="pound";

