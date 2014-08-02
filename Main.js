"use strict"

function init(){
    initHandlers();
    //Tests for Utilities.inspect()
    Utilities.inspect({"a":[1,2]})
    Utilities.inspect({"a":[{"d":"e"},{"f":"g"}]})
    Utilities.inspect({"a":{"b":"c"}});

    Utilities.inspect(
        {
            "a": [
                {
                    "d": "e"
                },
                {
                    "f": "g"
                }
            ]
        }
    );

    Utilities.inspect(
        {
            "a":
                [
                    {
                        "d": "e"
                    },
                    {
                        "f": [
                            {
                                "k": "l"
                            },
                            {
                                "m": "n"
                            }
                        ]
                    }
                ]
        }
    );
}

function initHandlers(){
    var currButton = document.getElementById("currencySubmit");
    currButton.addEventListener("click", currencySubmitHandler);
    var currInput=document.getElementById("currencyInput")
    currInput.addEventListener("keypress",Utilities.numericValidation);
    currInput.addEventListener("focus",Utilities.clearDefaultOnFocus);
    currInput.addEventListener("blur",Utilities.checkEmptyOnBlur);

    var convertButton = document.getElementById("stringToNumberSubmit");
    convertButton.addEventListener("click", stringConversionHandler);
    var convertInput=document.getElementById("stringToNumInput")
    //convertInput.addEventListener("keypress",Utilities.numericValidation);
    convertInput.addEventListener("focus",Utilities.clearDefaultOnFocus);
    convertInput.addEventListener("blur",Utilities.checkEmptyOnBlur);

}

function stringConversionHandler(e){
    var str = document.getElementById(e.target.getAttribute("data-input")).value;
    var type = typeof Utilities.convertStringToNumberIfPossible(str);
    var result = Utilities.convertStringToNumberIfPossible(str);
    document.getElementById("resultStringToNumber").innerHTML=result;
    document.getElementById("typeStringToNumber").innerHTML=type;
}

function currencySubmitHandler(e){
    var num = document.getElementById(e.target.getAttribute("data-input")).value;
    if (!Utilities.isStringNumber(num)){// in case they enter the default value
        return
    }
    else {
        num = Utilities.convertStringToNumberIfPossible(num);
    }
    var euro = Utilities.convertToCurrencyFormat(Utilities.EURO, num);
    var pound = Utilities.convertToCurrencyFormat(Utilities.POUND, num);
    var dollar = Utilities.convertToCurrencyFormat(Utilities.DOLLAR, num);
    document.getElementById("formatEuros").innerHTML=euro;
    document.getElementById("formatPounds").innerHTML=pound;
    document.getElementById("formatDollars").innerHTML=dollar;
}
