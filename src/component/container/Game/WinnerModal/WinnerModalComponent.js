import React from 'react';
import { StyledPlayAgainButton, StyledWinnerModalContainer, StyledWinnerModalHeader, StyledWinnerModalTableContainer, StyledWinnerModalWrapper } from './WinnerModalComponentStyles';
// Material-UI Table Imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getPointsResults, sumTeamScores } from '../../../GameEngine/CalculateWinner';

const WinnerModalComponent= ({gameOver, onPlayAgainHandler, winner}) => {

    return (
        <StyledWinnerModalWrapper display={gameOver}>
            <StyledWinnerModalContainer>
                <StyledWinnerModalHeader>
                    The winner is {winner}!!!
                </StyledWinnerModalHeader>
                <StyledWinnerModalTableContainer>
                    <WinnerTableData />
                </StyledWinnerModalTableContainer>
                <StyledPlayAgainButton onClick={() => onPlayAgainHandler()}>
                    Play again!
                </StyledPlayAgainButton>
            </StyledWinnerModalContainer>
        </StyledWinnerModalWrapper>
    );
}

/* **********Test Users*********** */
const player1 = {
    name: "You",
    points: 2,
    bet: 4,
    team: "A",
    isWinner: true,
}
const player2 = {
    name: "Bot 1",
    points: 3,
    bet: 1,
    team: "A",
    isWinner: true,
}
const teamOne = sumTeamScores(player1, player2, "teamOne");

const player3 = {
    name: "Bot 2",
    points: 4,
    bet: 5,
    team: "B",
    isWinner: true,
}
const player4 = {
    name: "Bot 3",
    points: 6,
    bet: 4,
    team: "B",
    isWinner: true,
}
const teamTwo = sumTeamScores(player3, player4, "teamTwo");
/* **********Test Users End*********** */


// Accepts Object w/ name, points, and bet props
const createTableData = ({name, points, bet}) => {
    let finalScore = getPointsResults({name, points, bet});
    return { name, points, bet, finalScore};
}

const rows = [
    createTableData(player1), // EXP. 2, 4, 0
    createTableData(player2), // EXP. 3, 1, 20
    createTableData(teamOne), // EXP. 5, 5, 50
    createTableData(player3), // EXP. 4, 5, 0
    createTableData(player4), // EXP. 6, 4, 50
    createTableData(teamTwo), // EXP. 10, 9, 95
]

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHeader: {
        background: 'turquoise',
    },
    playerRowHighlight: {
        background: 'lightgray',
        opacity: 1,
    }
})

const WinnerTableData = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Results Table">
                <TableHead>
                    <TableRow className={classes.tableHeader}>
                        <TableCell>Player Name</TableCell>
                        <TableCell align="center">Points</TableCell>
                        <TableCell align="center">Bet</TableCell>
                        <TableCell align="center">Final Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} className={(row.name === "You") || (row.name === "teamOne") ? classes.playerRowHighlight : ''}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.points}</TableCell>
                            <TableCell align="center">{row.bet}</TableCell>
                            <TableCell align="center">{row.finalScore}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default WinnerModalComponent;