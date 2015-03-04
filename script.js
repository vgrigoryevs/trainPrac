function makeNewWagon() {
    var name = document.getElementById("nameOfWagon").value,
        e = document.getElementById("newWagon"),
        wagonClass = e.options[e.selectedIndex].value,
        bottomSeat = document.getElementById("bottomSeat").value,
        topSeat = document.getElementById("topSeat").value,
        bottomSideSeat = document.getElementById("bottomSideSeat").value,
        topSideSeat = document.getElementById("topSideSeat").value;

    if(isNaN(+bottomSeat)||isNaN(+topSeat)||isNaN(+bottomSideSeat)||isNaN(+topSideSeat)) {
        return alert("Неправильный ввод данных");
    }

    if(wagonClass === "CompartmentWagon") {
        window.wagons[name] = new CompartmentWagon(bottomSeat, topSeat, bottomSideSeat, topSideSeat);
    }
    else if(wagonClass === "ReservedWagon") {
        window.wagons[name] = new ReservedWagon(bottomSeat, topSeat, bottomSideSeat, topSideSeat);
    }
    else {
        window.wagons[name] = new Sw(bottomSeat, topSeat, bottomSideSeat, topSideSeat);     
    }

    train.addWagon(window.wagons[name]);
    addWagonToHtml(window.wagons[name]);

    alert("Доходность вагона " + window.wagons[name].wagonIncome());
}

function choseOption() {
    var wagonClass = document.getElementById("newWagon").value;
    if(wagonClass === "ReservedWagon") {
        document.getElementById("bottomSideSeatText").style.display = "none";
        document.getElementById("bottomSideSeat").style.display = "none";
        document.getElementById("topSideSeat").style.display = "none";
        document.getElementById("topSideSeatText").style.display = "none";
        document.getElementById("topSeat").style.display = "block"
        document.getElementById("topSeatText").style.display = "block"
    }
    else if(wagonClass === "CompartmentWagon") {
        document.getElementById("bottomSideSeatText").style.display = "block";
        document.getElementById("bottomSideSeat").style.display = "block";
        document.getElementById("topSideSeat").style.display = "block";
        document.getElementById("topSideSeatText").style.display = "block";
        document.getElementById("topSeat").style.display = "block"
        document.getElementById("topSeatText").style.display = "block"
    }
    else {
        document.getElementById("bottomSideSeatText").style.display = "none";
        document.getElementById("bottomSideSeat").style.display = "none";
        document.getElementById("topSideSeat").style.display = "none";
        document.getElementById("topSideSeatText").style.display = "none";
        document.getElementById("topSeat").style.display = "none"
        document.getElementById("topSeatText").style.display = "none"
    }
}

function addWagonToHtml(wagonName) {
    var table = document.getElementById("allWagons"),
        tr = table.insertRow(-1),
        name = tr.insertCell(0),
        type = tr.insertCell(1),
        bottomSeat = tr.insertCell(2),
        topSeat = tr.insertCell(3),
        bottomSideSeat = tr.insertCell(4),
        topSideSeat = tr.insertCell(5),
        income = tr.insertCell(6),
        e = document.getElementById("newWagon"),
        wagonClass = e.options[e.selectedIndex].innerHTML;
        name.innerHTML = document.getElementById("nameOfWagon").value;
        bottomSeat.innerHTML = wagonName.bottomSeat;
        topSeat.innerHTML = wagonName.topSeat;
        bottomSideSeat.innerHTML = wagonName.bottomSideSeat;
        topSideSeat.innerHTML = wagonName.topSideSeat;
        type.innerHTML = wagonClass;
        income.innerHTML = wagonName.wagonIncome();
}

function TrainWagon(bottomSeat, topSeat, bottomSideSeat, topSideSeat, options) {
    'use strict';
    this.bottomSeat = bottomSeat;
    this.topSeat = topSeat;
    this.bottomSideSeat = bottomSideSeat;
    this.topSideSeat = topSideSeat;
    this.options = options;
}

function CompartmentWagon() {
    'use strict';
    TrainWagon.apply(this, arguments);
    this.bottomPrice = 10;
    this.topPrice = 20;
    this.bottomSidePrice = 30;
    this.topSidePrice = 40;
}

function ReservedWagon() {
    'use strict';
    TrainWagon.apply(this, arguments);
    this.bottomPrice = 20;
    this.topPrice = 30;
    this.bottomSidePrice = 40;
    this.topSidePrice = 50;
}

function Sw() {
    'use strict';
    TrainWagon.apply(this, arguments);
    this.bottomPrice = 60;
    this.topPrice = 70;
    this.bottomSidePrice = 80;
    this.topSidePrice = 90;
}

function PassengerTrain() {
    'use strict';
    var counter = 1;
    this.addWagon = function (wagonName) {
        this[counter] = wagonName;
        counter +=1;
    }
}

CompartmentWagon.prototype = Object.create(TrainWagon.prototype);
ReservedWagon.prototype = Object.create(TrainWagon.prototype);
Sw.prototype = Object.create(TrainWagon.prototype);

TrainWagon.prototype.wagonIncome = function wagonIncome() {
    'use strict';
    var options = this.options,
        totalSeats = this.bottomSeat + this.topSeat + this.bottomSideSeat + this.topSideSeat,
        total = 0;  
    
        for (key in options) { 
            total+=options[key] * totalSeats;
    }

    total+=this.bottomSeat * this.bottomPrice;
    total+=this.topSeat * this.topPrice;
    total+=this.bottomSideSeat * this.bottomSidePrice;
    total+=this.topSideSeat * this.topSidePrice;


    return total;
}

PassengerTrain.prototype.trainIncome = function trainIncome() {
    var total = 0;
        for (key in this) {
            if (typeof  this[key] === "object") {
                total+=this[key].wagonIncome();
            }

        }

    return total;
}


var train = new PassengerTrain(),
    wagons = {};

