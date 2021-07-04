// Developed by Davidi Sheleg, 2020.

function Calendar(element_id,start_date,end_date,selected_date,events) {
    if(element_id==null)
    throw new Error("id of the Calendar is null");

    if(start_date!=null)
    this.StartDate = new Date(start_date); //The min date of the calendar
    else
    this.StartDate = new Date(1900,1,1);

    if(end_date!=null)
    this.EndDate = new Date(end_date);//The max date of the calendar
    else
    this.EndDate = new Date(1900,1,1);

    
    if(selected_date!=null)
    this.SelectedDate=new Date(selected_date); //The binded month
    else
    this.SelectedDate=new Date(); //If selected_date is null, then the this.SelectedDate is the current day
     
    if(events!=null)
    this.events=events;
    
//CREATE Calendar TABLE
this.create=function()
{
    var id=element_id;
    var datestr=this.SelectedDate;
    let events=this.events;
    let x = document.getElementById(id+"_table");
    var date=new Date(datestr);
    var table="";
    table+="<h1>"+months[date.getMonth()]+" "+date.getFullYear()+"</h1>";
     table+="<div class='grid-container'>";
    //CREATE THE DAYS CELLS

    for(var i=0;i<7;i++)
    table+= "<div class='grid-item header'>"+days[i]+"</div>";


    //FIRST ROW
    //GET THE LAST DAYS OF LAST month
    var first_day=FirstDayOfMonth(date.getFullYear(),date.getMonth());
    var last_month_date=date;
    last_month_date.setMonth(last_month_date.getMonth()-1);
    var days_in_last_month=daysInMonth(last_month_date.getFullYear(),last_month_date.getMonth()+1);
    days_in_last_month=days_in_last_month-first_day+1;

    for(var i=0;i<first_day;i++) {
        
        if(events==null) { 
            table+= "<div class='grid-item not_month_date'>"+days_in_last_month+"</div>"; 
        }
        else{
            let thisdate=new Date(last_month_date.getFullYear(),last_month_date.getMonth(),days_in_last_month);
            let event=events.find(x => checkIfDatesEqual(x,thisdate));
            if(event!=null)
            table+= "<div class='grid-item not_month_date'>"+days_in_last_month+" <span>"+event.name+"</span></div>"; 
            else
            table+= "<div class='grid-item not_month_date'>"+days_in_last_month+"</div>"; 
        }
       
        days_in_last_month++;
    }
    days_in_last_month=days_in_last_month-1;
    date.setMonth(date.getMonth()+1);

    //PRINT SELECTED MONTH DAYS - FIRST ROW
    var count=1;
    for(var i=first_day;i<7;i++) {
    if(events==null)   {
        table+= "<div class='grid-item'>"+count+"</div>";
    } 
    else{
        let thisdate=new Date(date.getFullYear(),date.getMonth(),count);
        let event=events.find(x => checkIfDatesEqual(x,thisdate));
        if(event!=null)
        table+= "<div class='grid-item'>"+count+" <span>"+event.name+"</span></div>";
        else
        table+= "<div class='grid-item'>"+count+"</div>";
    }
    count++;
    }

    //THE OTHER ROWS
var days_in_month=daysInMonth(date.getFullYear(),date.getMonth()+1);
console.log(days_in_month+" "+date.getMonth());
var total_rows=parseInt((7-count+days_in_month)/7);
var row_num=3;
var next_month_days=1;
for(var i=0;i<total_rows;i++)
{
  for(var j=0;j<7;j++)
  {

      if(count<=days_in_month)
      {
        if(events==null) {
        table+= "<div class='grid-item'>"+count+"</div>";
        } 
        else{
        let thisdate=new Date(date.getFullYear(),date.getMonth(),count);
        let event=events.find(x => checkIfDatesEqual(x,thisdate));
        if(event!=null)
        table+= "<div class='grid-item'>"+count+" <span>"+event.name+"</span></div>";
        else
        table+= "<div class='grid-item'>"+count+"</div>";
        }
        count++;
      }
      else {
        if(events==null) {  
        table+= "<div class='grid-item not_month_date'>"+next_month_days+"</div>";
        }
        else{
            let thisdate=new Date(date.getFullYear(),date.getMonth()+1,next_month_days);
            let event=events.find(x => checkIfDatesEqual(x,thisdate));
            if(event!=null)
            table+= "<div class='grid-item not_month_date'>"+next_month_days+" <span>"+event.name+"</span></div>"; 
            else
            table+= "<div class='grid-item not_month_date'>"+next_month_days+"</div>"; 
        }
        next_month_days++;
       }
  }

  row_num++;
}

    //========BIND
    x.innerHTML=table;
}
//==================END==================


//FIRST BUILD
var table_div=document.createElement("DIV");
table_div.setAttribute("id",element_id+"_table");
document.getElementById(element_id).appendChild(table_div);

var buttons_div=document.createElement("DIV");
buttons_div.setAttribute("id",element_id+"_buttons");
document.getElementById(element_id).appendChild(buttons_div);

var next_btn = document.createElement("BUTTON");
next_btn.setAttribute("id", element_id+"_next");
next_btn.setAttribute("class", "next");
next_btn.innerHTML = "Next Month >>";

var prev_btn = document.createElement("BUTTON");
prev_btn.innerHTML = "<< Prev Month";
prev_btn.setAttribute("id", element_id+"_prev");
prev_btn.setAttribute("class","prev");
document.getElementById(element_id+"_buttons").appendChild(prev_btn);
document.getElementById(element_id+"_buttons").appendChild(next_btn);
this.create();

//==================END==================


//NEXT AND PREV MONTH METHODS
    this.next_month = function() {
      let next_month=this.SelectedDate;
      next_month.setMonth(next_month.getMonth()+1);

       if(next_month.getMonth()>=this.EndDate.getMonth() && next_month.getFullYear()==this.EndDate.getFullYear())
        document.getElementById(element_id+"_next").disabled = true;
       else
        document.getElementById(element_id+"_prev").disabled = false;  

        this.SelectedDate=next_month;
        this.create();         
     };

     this.prev_month = function() {
      let prev_month=this.SelectedDate;
      prev_month.setMonth(prev_month.getMonth()-1);

       if(prev_month.getMonth()<=this.StartDate.getMonth() && prev_month.getFullYear()==this.StartDate.getFullYear())
        document.getElementById(element_id+"_prev").disabled = true;
       else
        document.getElementById(element_id+"_next").disabled = false;  

        this.SelectedDate=prev_month;
        this.create();           
    };



   document.getElementById(element_id+"_next").addEventListener('click', () => this.next_month());
   document.getElementById(element_id+"_prev").addEventListener('click', () => this.prev_month());



//==================END==================

  }//Calendar

  function daysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}


function FirstDayOfMonth(year, month)
{
    return new Date(year, month, 1).getDay();
}


function betweenDates(todate,fromdate,date)
{
   return date > fromdate && date < todate;
}

function checkIfDatesEqual(x,thisdate)
{
    let eventdate=new Date(x.date);
    if(eventdate.getFullYear() == thisdate.getFullYear() &&
    eventdate.getMonth() == thisdate.getMonth() &&
    eventdate.getDate() == thisdate.getDate())
    return x;
}


var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


