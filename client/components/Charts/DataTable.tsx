import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { RunTestResponse } from '../../models/api';


const DataTable = (props: Props) => {

  const data = props.data; 


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
        <TableRow key='Test Result'>
          <TableCell component='th' scope='row'>Test Result</TableCell>
          <TableCell> {data.summaryStats.mean}</TableCell>
          <TableCell> {data.summaryStats.median}</TableCell>
          <TableCell>{data.summaryStats.stdDev}</TableCell>
          <TableCell>{data.summaryStats.q1}</TableCell>
          <TableCell>{data.summaryStats.q3}</TableCell>
          <TableCell>{data.summaryStats.min}</TableCell>
          <TableCell>{data.summaryStats.max}</TableCell>
        </TableRow>
        {/* <TableRow key='explain'>
          <TableCell component='th' scope='row'>Explain Analyze Result</TableCell>
          <TableCell>{mean goes here}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow key='test'>
          <TableCell component='th' scope='row'>Explain Analyze Result</TableCell>
          <TableCell>{mean goes here}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
          */}
        </TableBody>
      </Table>
    </TableContainer> 
  )
} 
interface Props {
  data: RunTestResponse
}

export default DataTable; 