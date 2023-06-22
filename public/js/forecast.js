
class Thermometer {
    constructor (element, value, fahrenheit) {
        this.valueEl = value;
        this.fillEl = element.querySelector('.bar-fill');
        this.circleFillEl = element.querySelector('.circle-fill');
        this.fahrenheitEl = fahrenheit;
        this.setTemp(this.valueEl.innerHTML);

       // console.log(this.valueEl);
       // console.log(this.fillEl);
    }

    changeColor(percentage) {
        let color = "";

        if (percentage > 90) color = "#ff0000"
        else if (percentage < 90 && percentage > 70) color = " #ff4d00"
        else if (percentage < 70 && percentage > 50) color = "#ff6600"
        else if (percentage < 50 && percentage > 30) color = "#ffff00"
        else if (percentage < 30 && percentage > 10) color = "#008cff"
        else if (percentage < 10) color = "0000ff"

        this.fillEl.style.backgroundColor = color;
        this.circleFillEl.style.backgroundColor = color;

    }

    setTemp(newTemp) {

        newTemp = parseFloat(newTemp);

        //set temp limits
        if(newTemp < -20) {
            newTemp = -20;
        }
        if(newTemp > 50) {
            newTemp = 50;
        }
        this.value = newTemp;
        this.update();
    }

    update() {
        // Changing the thermometer animation
        
        const percentage = ((20 + this.value)/70) * 100;
        console.log(percentage);
        this.fillEl.style.height = percentage + '%';
        this.changeColor(percentage);
        // Setting fahrenheit temp
        const fahrenheit_value = (parseFloat(this.valueEl.innerHTML)*9/5) + 32
        this.fahrenheitEl.innerHTML = fahrenheit_value + "°F";
    }
}


class Time {
    constructor(element, timeInfo) {
        this.dateEl = element;
        this.infoEl = timeInfo;

        const rawData = new Date(this.dateEl.innerHTML); 
        this.day = this.findWeekDay(rawData.getDay());
        this.date = rawData.getDate() + "/" + rawData.getMonth() + "/" + rawData.getFullYear();
        this.time = rawData.getHours() + ":" + rawData.getMinutes();

        console.log(this.date);
        console.log(this.time);
        
        this.update();
    }
    
    findWeekDay(day) {
        switch(day) {
            case 0 : return("Sunday");
            case 1 : return("Monday");
            case 2 : return("Tuesday"); 
            case 3 : return("Wednesday"); 
            case 4 : return("Thursday"); 
            case 5 : return("Friday"); 
            case 6 : return("Saturday");  
        }
    }

    update() {
        this.dateEl.innerHTML = this.day;
        this.infoEl.innerHTML = "Caught by ESP32 in " + this.date + " at " + this.time;
    }
}

const thermometer = new Thermometer(document.querySelector('.thermometer'), 
                                    document.querySelector('.celsius-value'),
                                    document.querySelector('.fahrenheit-value'));

const time = new Time(document.querySelector('.time-value'), document.querySelector('.time-info'))