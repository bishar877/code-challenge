function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const demeritPointsPer5KmOver = 1;
    const pointsThresholdForSuspension = 12;

    try {
      
        speed = parseFloat(speed);

        if (!isNaN(speed)) {
        
            let demeritPoints = Math.floor((speed - speedLimit) / 5);

            if (demeritPoints > pointsThresholdForSuspension) {
                console.log("License suspended");
            } else if (demeritPoints > 0) {
                console.log(`Points: ${demeritPoints}`);
            } else {
                console.log("Ok");
            }
        } else {
            console.log("Invalid input! Please enter a valid numerical value for speed.");
        }
    } catch (error) {
        console.log("An error occurred. Please try again.");
    }
}


