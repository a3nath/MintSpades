// Accepts 2 Player objects on same team, returns their combined points & bet
export const sumTeamScores = (firstMember, secondMember) => {
    const combinedPoints = {
        points: firstMember.points + secondMember.points,
        bet: firstMember.bet + secondMember.bet
    }

    return combinedPoints;
}

// Accepts Team object w/ points & bet properties, returns calculated points by rules
export const getPointsResults = ({points, bet}) => {
    // If points < bet, return 0
    // If points === bet, return bet x 10
    // If points > bet, bet x 10 + remainder of points
    if (points < bet) {
        return 0;
    } else if (points === bet) {
        return (10 * bet);
    } else {
        return ((10 * bet) + ((points - bet) * 5));
    }
}

// Accepts 2 opposing team combined points and returns the winner. 1st argument is team 1.
export const getWinner = (teamOnePoints, teamTwoPoints) => {
    if (teamOnePoints > teamTwoPoints) {
        return "Team One Wins!"
    } else if (teamTwoPoints > teamOnePoints) {
        return "Team Two Wins!"
    } else {
        return "Game was a Tie!"
    }
}

/* TESTS
const playerOne = {
    points: 3,
    bet: 6
}
const playerTwo = {
    points: 7,
    bet: 3
}

const playerThree = {
    points: 6,
    bet: 6
}

const playerFour = {
    points: 7,
    bet: 4
}


// Test sumTeamScores()
const teamOne = sumTeamScores(playerOne, playerTwo);
console.log(teamOne); // Exp { points: 10, bet: 9 }
const teamTwo = sumTeamScores(playerThree, playerFour);
console.log(teamTwo); // Exp. { points: 13, bet: 10 }

// Test getPointsResults()
const teamOnePoints = getPointsResults(teamOne);
console.log(teamOnePoints); // Exp. 95
const teamTwoPoints = getPointsResults(teamTwo);
console.log(teamTwoPoints); // Exp. 115

// Test getWinner()
const gameWinner = getWinner(teamOnePoints, teamTwoPoints);
console.log(gameWinner); // Exp "Team Two Wins!"
*/