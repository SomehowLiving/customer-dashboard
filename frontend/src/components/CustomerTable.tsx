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
  if (!data || data.length === 0)
    return <Typography variant="body1">No data available.</Typography>;

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
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f9fafb' }}>
            <TableCell><strong>Quarter</strong></TableCell>
            <TableCell align="right" sx={{ color: 'primary.main' }}>Existing Opps</TableCell>
            <TableCell align="right" sx={{ color: 'warning.main' }}>New Opps</TableCell>
            <TableCell align="right"><strong>Total Opps</strong></TableCell>
            <TableCell align="right" sx={{ color: 'primary.main' }}>Existing ACV</TableCell>
            <TableCell align="right" sx={{ color: 'warning.main' }}>New ACV</TableCell>
            <TableCell align="right"><strong>Total ACV</strong></TableCell>
            <TableCell align="right" sx={{ color: 'primary.main' }}>Existing %</TableCell>
            <TableCell align="right" sx={{ color: 'warning.main' }}>New %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.quarter}
              hover
              sx={{ transition: 'background-color 0.2s ease-in-out' }}
            >
              <TableCell><strong>{row.quarter}</strong></TableCell>
              <TableCell align="right" sx={{ color: 'primary.main' }}>{row.existing.opps}</TableCell>
              <TableCell align="right" sx={{ color: 'warning.main' }}>{row.new.opps}</TableCell>
              <TableCell align="right">{row.total.opps}</TableCell>
              <TableCell align="right" sx={{ color: 'primary.main' }}>
                {formatCurrency(row.existing.acv)}
              </TableCell>
              <TableCell align="right" sx={{ color: 'warning.main' }}>
                {formatCurrency(row.new.acv)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(row.total.acv)}
              </TableCell>
              <TableCell align="right" sx={{ color: 'primary.main' }}>
                {row.existing.percent}%
              </TableCell>
              <TableCell align="right" sx={{ color: 'warning.main' }}>
                {row.new.percent}%
              </TableCell>
            </TableRow>
          ))}

          <TableRow
            sx={{
              backgroundColor: '#f3f4f6',
              fontWeight: 'bold',
              borderTop: '2px solid #e0e0e0',
            }}
          >
            <TableCell><strong>Total</strong></TableCell>
            <TableCell align="right" sx={{ color: 'primary.main' }}>{totalRow.existing.opps}</TableCell>
            <TableCell align="right" sx={{ color: 'warning.main' }}>{totalRow.new.opps}</TableCell>
            <TableCell align="right">{totalRow.total.opps}</TableCell>
            <TableCell align="right" sx={{ color: 'primary.main' }}>
              {formatCurrency(totalRow.existing.acv)}
            </TableCell>
            <TableCell align="right" sx={{ color: 'warning.main' }}>
              {formatCurrency(totalRow.new.acv)}
            </TableCell>
            <TableCell align="right">{formatCurrency(totalRow.total.acv)}</TableCell>
            <TableCell align="right" sx={{ color: 'primary.main' }}>
              {Math.round((totalRow.existing.acv / totalRow.total.acv) * 100)}%
            </TableCell>
            <TableCell align="right" sx={{ color: 'warning.main' }}>
              {Math.round((totalRow.new.acv / totalRow.total.acv) * 100)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerDataTable;
