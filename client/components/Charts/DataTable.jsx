import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const props = {
    data : {
      queryResults: {
        explainAnalyzeResults: {
          resultsArray: [0.1, 0.15, 0.3, 0.3, 0.4],
          latency: [0.1, 0.15, 0.3, 0.3, 0.4],
          stats: {
            min: .1,
            max: .5, 
            mean: .35, 
            median: .3,
            stdDev: .05, 
            q1: .15,
            q3: .4
          }
        }
      }, 
      testResults: {
        resultsArray: [0.2, 0.25, 0.4, 0.5, 0.7],
        latency: [0.2, 0.25, 0.4, 0.5, 0.7],
        stats: {
          min: .3,
          max: .5, 
          mean: .45, 
          median: .3,
          stdDev: .05, 
          q1: .2,
          q3: .5
        }
      }
    }
  }




const DataTable = () => {
    function createData(test, mean, median, stdDev, q1,q3,min,max) {
        return {test,mean, median, stdDev, q1,q3,min,max}

    }

    const rows = [
        createData(1,props.data.testResults.stats.mean, props.data.testResults.stats.median, props.data.testResults.stats.stdDev, props.data.testResults.stats.q1, props.data.testResults.stats.q3, props.data.testResults.stats.min, props.data.testResults.stats.max)
    ]

    return (
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Test</TableCell>
                <TableCell >Mean</TableCell>
                <TableCell >Median</TableCell>
                <TableCell >Standard Deviation</TableCell>
                <TableCell >Q1</TableCell>
                <TableCell >Q3</TableCell>
                <TableCell >Min</TableCell>
                <TableCell >Max</TableCell>
                </TableRow>   
            </TableHead>
            <TableBody>
              { rows.map((row) => {
                return (
                  <TableRow key={row.test}>
                    <TableCell component='th' scope='row'>{row.test}</TableCell>
                    <TableCell> {row.mean}</TableCell>
                    <TableCell> {row.median}</TableCell>
                    <TableCell>{row.stdDev}</TableCell>
                    <TableCell>{row.q1}</TableCell>
                    <TableCell>{row.q3}</TableCell>
                    <TableCell>{row.min}</TableCell>
                    <TableCell>{row.max}</TableCell>
                  </TableRow>
                )
              })}
              {/* {rows.map((row) => (
                <TableRow key={row.test}>
                <TableCell component={”th”} scope={”row”}> {row.test} </TableCell>
                <TableCell> {row.mean}</TableCell>
                <TableCell> {row.median}</TableCell>
                <TableCell>{row.stdDev}</TableCell>
                <TableCell>{row.q1}</TableCell>
                <TableCell>{row.q3}</TableCell>
                <TableCell>{row.min}</TableCell>
                <TableCell>{row.max}</TableCell>
                </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer> 
    )
}

export default DataTable; 