// --
// Copyright (C) 2012-2022 Znuny GmbH, http://znuny.com/
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

"use strict";

var Core = Core || {};
Core.Agent = Core.Agent || {};
Core.Agent.Admin = Core.Agent.Admin || {};


var config = []; 

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target) 
            || event.target.className === "zs-input"
            || event.target.className.startsWith("zs-dropdown")
            || event.target.className === "zs-option"
            || event.target.className === "zs-dropdown")) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const { createApp } = Vue;

const zsboxapp = createApp({
    data() {
        return {
            Engines: false,
            LastSearches: [],
            Params: [],
            Loading: false,
            InputText: '',
            InputParam: {type: 'input'},
            currentKind: null,
            currentLevel: null,
            currentParamIndex: null,
            currentDropdown: null,
            InputDisabled: 1,
            DropdownMessage: '',
            Labels: [],
            Operators: [],
            ShowTime: 0
        }
    },
    mounted () {
        this.Params.push(this.InputParam);
        var EnableInput = () => {
            this.InputDisabled = 0;
        };
        Core.AJAX.FunctionCall('/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=GetInitialData',{ TicketIDs: '[]' }, function (Response) {
            config = Response.Config;
            EnableInput();
            if(!$('div#TicketList')[1]) {
                $('#TicketList').html(Response.HTML);
            }
        });
    },
    watch: {    
        InputText(newText, oldText) {
            if (!this.currentDropdown) {
                return;
            }
            this.currentDropdown.items.forEach((item, i) => {
                if (item.text.toLowerCase().indexOf(newText.toLowerCase()) > -1) {
                    item.visible = true;
                } else {
                    item.visible = false;
                }
            });
        },
    },
    // directives: {
    //     'click-outside': {

    //     }
    // },
    methods: {
        ToggleEngines(e) {  
            this.Engines = !this.Engines;
        },
        clearAll() {
            this.Params = [this.InputParam];
            this.resetCurrents();
        },
        resetCurrents() {
            this.currentKind = null;
            this.currentLevel = null;
            this.currentParamIndex = null;
            this.removeCurrentDropdown();

            // remove stray Params
            this.Params.forEach((Param, i) => {
                if (Param.type === 'token' && (!Param.operator || !Param.value.length)) {
                    this.Params.splice(i, 1);
                }
            });
        },
                    
        createListLevel0 () {
            console.log('create')
            this.currentDropdown = {
                type: 'dropdown',
                items: []
            }
            config.forEach((item, i) => {
                this.currentDropdown.items.push({
                    text: item.label,
                    visible: true
                });
            });
            this.Params.splice(this.currentParamIndex + 1, 0, this.currentDropdown);

            // move dropdown to correct position
            this.$nextTick(() => {
                const labelEl = this.$refs.inputWrap[0];
                const offset = 5 + labelEl.offsetLeft + 'px';
                this.$refs.dropdown[0].style.left = offset;
            });
        },
        createListLevel1 () {

            // hardcoded operator list
            var myItems = [];
            config[this.currentKind].operators.forEach((operator) => {
                myItems.push({
                    text: operator.label,
                    code: operator.code,
                    visible: true
                });
            });
            if(config[this.currentKind].type === "api") {
                myItems = [
                    { 
                        text: "=",
                        code: "=",
                        visible: true
                    }
                ]; 
            }
            this.currentDropdown.items = myItems;

            // move dropdown to correct position
            this.$nextTick(() => {
                const labelEl = this.$refs['tokenLabel'+this.currentParamIndex][0];
                const offset = 5 + labelEl.offsetLeft + labelEl.clientWidth + 'px';
                this.$refs.dropdown[0].style.left = offset;
            });
        },
        createListLevel2 () {

            // hardcoded value list
            if (config[this.currentKind].type === 'values') {
                const myItems = [];
                config[this.currentKind].values.forEach((value) => {
                    myItems.push({
                        text: value,
                        visible: true
                    });
                });
                this.currentDropdown.items = myItems;
            }

            // API access value list
            if (config[this.currentKind].type === 'api') {
                const myItems = [];
                this.Loading = true;
                const http = new Http();
                http
                .get(config[this.currentKind].api)
                .then((res) => {
                    JSON.parse(res).forEach((item) => {
                        myItems.push({
                            text: item.name,
                            visible: true
                        });
                    });
                    this.currentDropdown.items = myItems;
                    this.Loading = false;
                })
                .catch((err) => {
                    console.error(err.error);
                    this.Loading = false;
                })
            }

            // Freetext
            if (config[this.currentKind].type === 'customtext') {
                this.currentDropdown.items = [];
                this.removeCurrentDropdown();
                this.$nextTick(() => {
                    this.$refs.inputField[0].focus();   
                });
                            
            }
            if (!this.currentDropdown) {
                return;
            }

            // move dropdown to correct position
            this.$nextTick(() => {
                const labelEl = this.$refs['tokenOperator'+this.currentParamIndex][0];
                const offset = 5 + labelEl.offsetLeft + labelEl.clientWidth + 'px';
                this.$refs.dropdown[0].style.left = offset;
            });
        },
        ClickedOnInput() {
            if (this.currentParamIndex === null) {
                this.startNewToken();
            }         
        },
        startNewToken() {
            this.resetCurrents();
            this.moveInputToEnd();
            this.currentParamIndex = this.Params.length - 1;
            this.Params.splice(this.currentParamIndex, 0, { type: 'token' });
            this.Params[this.currentParamIndex] = {
                value: [],
                text: ""
            };
            this.createListLevel0();
            this.currentLevel = 0;
            this.$nextTick(() => {
            this.$refs.inputField[0].focus();
                  
            });            
        },
        removeToken(i) {
            this.Params.splice(i, 1);
            this.removeCurrentDropdown();
        },
        moveInputToEnd() {
            const currentInputIndex = this.Params.findIndex((Param) => Param.type === 'input');
            this.Params.splice(currentInputIndex, 1);
            this.Params.push(this.InputParam);
        },
        moveInput() {
            const currentInputIndex = this.Params.findIndex((Param) => Param.type === 'input');
            this.Params.splice(currentInputIndex, 1);
            this.Params.splice(this.currentParamIndex, 0, this.InputParam);
        },
        removeCurrentDropdown() {
            if (this.currentDropdown) {
                const currentDropdownIndex = this.Params.findIndex((Param) => Param.type === 'dropdown');
                this.Params.splice(currentDropdownIndex, 1);
            }
            this.currentDropdown = null;
        },
        chooseFromList(entry, entryindex) {

            if (this.currentLevel === 0) {
                this.currentKind = entryindex;
                this.Params[this.currentParamIndex].label = entry.text;
                this.createListLevel1();
                this.currentLevel = 1;
                this.$refs.inputField[0].focus();
                this.InputText = '';
            } else if (this.currentLevel === 1) {
                this.Params[this.currentParamIndex].operator = entry;
                this.createListLevel2();
                this.currentLevel = 2;
                this.$refs.inputField[0].focus();
                this.InputText = '';
            } else if (this.currentLevel === 2) {
                
                var index = this.Params[this.currentParamIndex].value.indexOf(entry.text);

                if( index > -1) {
                    this.Params[this.currentParamIndex].value.splice(index, 1);
                    this.Params[this.currentParamIndex].text = JSON.stringify(this.Params[this.currentParamIndex].value).slice(1,-1);
                    $('#item'+entryindex).removeClass("active-zs-option");
                }
                else {
                    this.Params[this.currentParamIndex].value.push(entry.text);
                    this.Params[this.currentParamIndex].text = JSON.stringify(this.Params[this.currentParamIndex].value).slice(1,-1);
                    $('#item'+entryindex).addClass("active-zs-option");
                }
                
            }              
        },
        changeTokenValue(Param) {

            this.removeCurrentDropdown();
                        
            this.currentLevel = 2;
            this.currentParamIndex = this.Params.findIndex((item) => item.label === Param.label);
            this.currentKind = config.findIndex((item) => item.label === Param.label);

            this.currentDropdown = {
                type: 'dropdown',
                items: []
            }
            this.Params.splice(this.currentParamIndex + 1, 0, this.currentDropdown);
            this.createListLevel2();
            this.$nextTick(() => {
                this.$refs.inputField[0].focus();   
            });

        },
        dropdownKeystroke(e) {
            // down
            if (e.which === 40) {
                e.preventDefault();
                if (e.target.parentElement.nextElementSibling) {
                    e.target.parentElement.nextSibling.children[0].focus();
                } else {
                    this.$refs.inputField[0].focus();
                }
            }

            // up
            if (e.which === 38) {
                e.preventDefault();
                if (e.target.parentElement.previousElementSibling) {
                    e.target.parentElement.previousSibling.children[0].focus();
                } else {
                    this.$refs.inputField[0].focus();
                }
            }
        },
        inputKeystroke(e) {

            // pressing down: set focus to dropdown list, first entry
            if (e.which === 40 || e.which === 9) {
                e.preventDefault();
                this.$refs.dropdownbutton[0].focus();
            }
            // pressing up: set focus to dropdown list, last entry
            if (e.which === 38) {
                e.preventDefault();
                this.$refs.dropdownbutton[this.currentDropdown.items.length - 1].focus();
                
            }

            // pressing return 
            if (e.which === 13 && this.InputText.length > 0) {
                e.preventDefault();
                this.Params[this.currentParamIndex].value = this.InputText;
                this.resetCurrents();
                this.InputText = '';
            }
        },
        HideDropdown() {
            if(this.currentLevel < 2 || !(this.Params[this.currentParamIndex].value.length)) {
                this.removeToken(this.currentParamIndex);
            }
            this.resetCurrents();
        },
        Submit(e) {
            var LookupFields = [ "Queue", "State", "Type", "Priority", "SLA", "Service" ];
            e.preventDefault();


            var QueryParams = {};
            var QueryParamsSet = (Field, Operator, Value, Exist) => {

                if(LookupFields.indexOf(Field) != -1) {
                    if(!Exist) {
                        QueryParams[Field] = Value;
                    } else {
                        QueryParams[Field].push(...Value);
                    }
                } else {

                    if(!Exist) {
                        QueryParams[Field] = [
                            {
                                Operator: Operator, 
                                Value:  Value  
                            }
                        ];
                    }
                    else {
                        QueryParams[Field].push({ 
                            Operator: Operator,
                            Value: Value  
                        });
                    }
                }
                
            }
            for( let Param of this.Params ) {
                console.log(Param)
                var ParamValue = Param.value
                if (Param.type === 'token') {

                    try {
                        ParamValue = JSON.parse(ParamValue)
                    } catch (e) {}

                    var ParamAlreadyExist = QueryParams[Param.label] ? 1 : 0;

                    if(!ParamAlreadyExist) {
                        QueryParamsSet(Param.label, Param.operator.code, ParamValue);
                    }
                    else {
                        QueryParamsSet(Param.label, Param.operator.code, ParamValue, 1);
                    }
                }
            }
            this.Loading = true;

            var StopLoading = () => {
                this.Loading = false;
            }

            Core.AJAX.FunctionCall('/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=Search', { QueryParams: JSON.stringify(QueryParams), Time: this.showTime, StartHit: 1, StartWindow: 0 } , function (Response) {
                StopLoading();
                if (Response) {
                    if($('div#TicketList')[1]) {
                        $('div#TicketList')[1].remove();
                    }
                    $('#TicketList').html(Response.HTML);
                }
            });
        },
    },
});

zsboxapp.directive('click-outside', clickOutside);

zsboxapp.mount('#app');
// helper functions

// https://github.com/jakecyr/slim-javascript-http-request
function Http(){function n(e,t,n){var o=new XMLHttpRequest,r=void 0,s=void 0,i={};if("GET"==e)o.open(e,t,!0),o.send();else{if("POST"!=e)return console.error(e,"method not supported");o.open("POST",t,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded");var u=[];for(var a in n=n||{})u.push(a+"="+encodeURIComponent(n[a]||""));o.send(u.join("&"))}return o.onreadystatechange=function(){if(4==this.readyState){var e=o.getResponseHeader("content-type");200==this.status?r&&r("application/json"==e?JSON.parse(o.responseText):o.responseText):s&&s({status:o.status,body:o.responseText})}},i.then=function(e){return r=e,i},i.catch=function(e){return s=e,i},i}this.get=function(e){return n("GET",e)},this.post=function(e,t){return n("POST",e,t)}}

