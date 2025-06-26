import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { formatCurrency } from '../utils/format';

type Props = {
  data: any[];
};

const CustomerDataTable = ({ data }: Props) => {
  if (!data || data.length === 0) return <Typography>No data available.</Typography>;

  const totalRow = data.reduce(
    (acc, item) => {
      acc.existing.opps += item.existing.opps;
      acc.existing.acv += item.existing.acv;
      acc.new.opps += item.new.opps;
      acc.new.acv += item.new.acv;
      acc.total.opps += item.total.opps;
      acc.total.acv += item.total.acv;
      return acc;
    },
    {
      existing: { opps: 0, acv: 0 },
      new: { opps: 0, acv: 0 },
      total: { opps: 0, acv: 0 },
    }
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>Quarter</strong></TableCell>
            <TableCell align="right" sx={{ color: '#1976d2' }}>Existing Opps</TableCell>
            <TableCell align="right" sx={{ color: '#ef6c00' }}>New Opps</TableCell>
            <TableCell align="right">Total Opps</TableCell>
            <TableCell align="right" sx={{ color: '#1976d2' }}>Existing ACV</TableCell>
            <TableCell align="right" sx={{ color: '#ef6c00' }}>New ACV</TableCell>
            <TableCell align="right">Total ACV</TableCell>
            <TableCell align="right" sx={{ color: '#1976d2' }}>Existing %</TableCell>
            <TableCell align="right" sx={{ color: '#ef6c00' }}>New %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.quarter}>
              <TableCell><strong>{row.quarter}</strong></TableCell>
              <TableCell align="right" sx={{ color: '#1976d2' }}>{row.existing.opps}</TableCell>
              <TableCell align="right" sx={{ color: '#ef6c00' }}>{row.new.opps}</TableCell>
              <TableCell align="right">{row.total.opps}</TableCell>
              <TableCell align="right" sx={{ color: '#1976d2' }}>
                {formatCurrency(row.existing.acv)}
              </TableCell>
              <TableCell align="right" sx={{ color: '#ef6c00' }}>
                {formatCurrency(row.new.acv)}
              </TableCell>
              <TableCell align="right">{formatCurrency(row.total.acv)}</TableCell>
              <TableCell align="right" sx={{ color: '#1976d2' }}>
                {row.existing.percent}%
              </TableCell>
              <TableCell align="right" sx={{ color: '#ef6c00' }}>
                {row.new.percent}%
              </TableCell>
            </TableRow>
          ))}

          {/* Total Row */}
          <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell align="right" sx={{ color: '#1976d2' }}>{totalRow.existing.opps}</TableCell>
            <TableCell align="right" sx={{ color: '#ef6c00' }}>{totalRow.new.opps}</TableCell>
            <TableCell align="right">{totalRow.total.opps}</TableCell>
            <TableCell align="right" sx={{ color: '#1976d2' }}>
              {formatCurrency(totalRow.existing.acv)}
            </TableCell>
            <TableCell align="right" sx={{ color: '#ef6c00' }}>
              {formatCurrency(totalRow.new.acv)}
            </TableCell>
            <TableCell align="right">{formatCurrency(totalRow.total.acv)}</TableCell>
            <TableCell align="right" sx={{ color: '#1976d2' }}>
              {Math.round((totalRow.existing.acv / totalRow.total.acv) * 100)}%
            </TableCell>
            <TableCell align="right" sx={{ color: '#ef6c00' }}>
              {Math.round((totalRow.new.acv / totalRow.total.acv) * 100)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerDataTable;