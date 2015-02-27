    function TrainWagon(bottomSeat, topSeat, bottomSideSeat, topSideSeat, options) {
  	    this.bottomSeat = bottomSeat;
  	    this.topSeat = topSeat;
  	    this.bottomSideSeat = bottomSideSeat;
  	    this.topSideSeat = topSideSeat;
  	    this.options = options;
    }

    function CompartmentWagon() {
  		  TrainWagon.apply(this, arguments);
  	}

    function ReservedWagon() {
  	    TrainWagon.apply(this, arguments);
    }

    function Sw() {
  		  TrainWagon.apply(this, arguments);
  	}

  	function PassengerTrain() {

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

  	      return total
  }
