    function TrainWagon(bottomSeat, topSeat, bottomSideSeat, topSideSeat, options) {
  	    this.bottomSeat = bottomSeat;
  	    this.topSeat = topSeat;
  	    this.bottomSideSeat = bottomSideSeat;
  	    this.topSideSeat = topSideSeat;
  	    this.options = options;
    }

    function CompartmentWagon() {
  		  TrainWagon.apply(this, arguments);
        this.bottomPrice = 10;
        this.topPrice = 20;
        this.bottomSidePrice = 30;
        this.topSidePrice = 40;
  	}

    function ReservedWagon() {
  	    TrainWagon.apply(this, arguments);
        this.bottomPrice = 20;
        this.topPrice = 30;
        this.bottomSidePrice = 40;
        this.topSidePrice = 50;
    }

    function Sw() {
  		  TrainWagon.apply(this, arguments);
        this.bottomPrice = 60;
        this.topPrice = 70;
        this.bottomSidePrice = 80;
        this.topSidePrice = 90;
  	}

  	function PassengerTrain() {
      var counter = 1;
        this.addWagon = function(wagonName) {
          this[counter] = wagonName;
          counter++;
        }
  	}

    CompartmentWagon.prototype = Object.create(TrainWagon.prototype);
    ReservedWagon.prototype = Object.create(TrainWagon.prototype);
    Sw.prototype = Object.create(TrainWagon.prototype);

    TrainWagon.prototype.wagonIncome = function wagonIncome() {
        var options = this.options,
        totalSeats = this.bottomSeat+this.topSeat+this.bottomSideSeat+this.topSideSeat;
        total = 0;	
  	
  	    for (key in options) { 
  	        total+=options[key]*totalSeats;
  	    }

        total+=this.bottomSeat*this.bottomPrice;
        total+=this.topSeat*this.topPrice;
        total+=this.bottomSideSeat*this.bottomSidePrice;
        total+=this.topSideSeat*this.topSidePrice;


  	      return total
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


    var train = new PassengerTrain();
    var first = new CompartmentWagon(1,1,1,1);
    var second = new CompartmentWagon(1,1,1,1);
    train.addWagon(first);
    train.addWagon(second);