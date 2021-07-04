# Javascript-Calendar
A simple responsive calendar with events.

## Installation
* Add the Calendar files to your project.
* Create an element and give it id.
* Build the Calendar with the Calendar object.

```
<div id="cal" class="calendar"></div>

<script src="calendar.js"></script>

<script>
    var my_cal = new Calendar("cal");
</script>
```

## About the Calendar object

`Calendar(element_id,start_date,end_date,selected_date,events)`

* element id (required): The element you want to build the calendar on
* start_date: The minimum date of the Calendar. Default: 1900/01/01
* end_date: The maximum date of the Calendar. Default: 1900/01/01
* selected_date: The displayed date. Default: current date
* events: An array that contains events displayed on the Calendar

### events parameter
The array is built from the following object:
`{name:string,date:string}`

For example:
```
const events=[
    {name:"My BirthDay",date:"2021-07-23"},
    {name:"Meeting",date:"2021-07-12"},
    {name:"Holiday",date:"2021-08-1"}
];

    var my_cal = new Calendar("cal","2020-01-01","2022-01-01","2021-07-01",events);
```


### Multi language
You can find in the `calendar.js` file the arrays:
```
var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
```
and change the months and days to whatever language you want.

#### The design is very basic, so you can easily integrate the calendar into your project.

Demo: https://codepen.io/DavidiSheleg/pen/RwVWyvM
