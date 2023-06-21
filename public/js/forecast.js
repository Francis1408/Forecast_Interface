
class Thermometer {
    constructor (element, value) {
        this.valueElem = value;
        this.fillElem = element.querySelector('.bar-fill');
        this.circleFillElem = element.querySelector('.circle-fill');
        this.setTemp(this.valueElem.innerHTML);

       // console.log(this.valueElem);
       // console.log(this.fillElem);
    }

    changeColor(percentage) {
        let color = "";

        if (percentage > 90) color = "#ff0000"
        else if (percentage < 90 && percentage > 70) color = " #ff4d00"
        else if (percentage < 70 && percentage > 50) color = "#ff6600"
        else if (percentage < 50 && percentage > 30) color = "#ffff00"
        else if (percentage < 30 && percentage > 10) color = "#008cff"
        else if (percentage < 10) color = "0000ff"

        this.fillElem.style.backgroundColor = color;
        this.circleFillElem.style.backgroundColor = color;

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
        const percentage = ((20 + this.value)/80) * 100;
        console.log(percentage);
        this.fillElem.style.height = percentage + '%';
        this.changeColor(percentage);
    }
}

const thermometer = new Thermometer(document.querySelector('.thermometer'), 
                                    document.querySelector('.temp-value'));

