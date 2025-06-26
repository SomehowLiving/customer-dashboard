import { Request, Response } from 'express';
import { readJSON } from '../utils/readJson';

/**
 * Controller: GET /api/customer-type
 * Description:
 * - Reads "customer-type.json"
 * - Groups ACV and opportunity counts by fiscal quarter
 * - Separates into Existing vs New Customers
 * - Calculates percentage share of ACV
 */
export const getCustomerType = (_: Request, res: Response) => {
  const data = readJSON('customer-type.json');
  const grouped: Record<string, any> = {};

  data.forEach((item: any) => {
    const quarter = item.closed_fiscal_quarter;
    const custType = item.Cust_Type;

    // Initialize quarter entry if missing
    if (!grouped[quarter]) {
      grouped[quarter] = {
        quarter,
        existing: { opps: 0, acv: 0, percent: 0 },
        new: { opps: 0, acv: 0, percent: 0 },
        total: { opps: 0, acv: 0 }
      };
    }

    // Accumulate based on customer type
    if (custType === 'Existing Customer') {
      grouped[quarter].existing.opps += item.count;
      grouped[quarter].existing.acv += item.acv;
    } else if (custType === 'New Customer') {
      grouped[quarter].new.opps += item.count;
      grouped[quarter].new.acv += item.acv;
    }

    // Always update totals
    grouped[quarter].total.opps += item.count;
    grouped[quarter].total.acv += item.acv;
  });

  // Calculate ACV percentage per customer type
  for (const q of Object.keys(grouped)) {
    const totalACV = grouped[q].total.acv || 1; // Avoid divide by 0
    grouped[q].existing.percent = Math.round((grouped[q].existing.acv / totalACV) * 100);
    grouped[q].new.percent = 100 - grouped[q].existing.percent;
  }

  const result = Object.values(grouped).sort((a: any, b: any) =>
    a.quarter.localeCompare(b.quarter)
  );

  res.json(result);
};

/**
 * Controller: GET /api/account-industry
 * Description:
 * - Reads "account-industry.json"
 * - Groups data by industry and quarter
 * - Includes total ACV and opps per quarter
 */
export const getAccountIndustry = (_: Request, res: Response) => {
  const data = readJSON('account-industry.json');
  const grouped: Record<string, any> = {};

  data.forEach((item: any) => {
    const quarter = item.closed_fiscal_quarter;
    const industry = item.Acct_Industry;

    // Initialize quarter and industry entry
    if (!grouped[quarter]) {
      grouped[quarter] = { quarter, industries: {}, total: { opps: 0, acv: 0 } };
    }
    if (!grouped[quarter].industries[industry]) {
      grouped[quarter].industries[industry] = { opps: 0, acv: 0 };
    }

    // Add counts
    grouped[quarter].industries[industry].opps += item.count;
    grouped[quarter].industries[industry].acv += item.acv;

    grouped[quarter].total.opps += item.count;
    grouped[quarter].total.acv += item.acv;
  });

  const result = Object.values(grouped).sort((a: any, b: any) =>
    a.quarter.localeCompare(b.quarter)
  );

  res.json(result);
};

/**
 * Controller: GET /api/team
 * Description:
 * - Reads "team.json"
 * - Groups data by team and quarter
 * - Accumulates ACV and opps per team
 */
export const getTeam = (_: Request, res: Response) => {
  const data = readJSON('team.json');
  const grouped: Record<string, any> = {};

  data.forEach((item: any) => {
    const quarter = item.closed_fiscal_quarter;
    const team = item.Team;

    // Initialize quarter and team entry
    if (!grouped[quarter]) {
      grouped[quarter] = { quarter, teams: {}, total: { opps: 0, acv: 0 } };
    }
    if (!grouped[quarter].teams[team]) {
      grouped[quarter].teams[team] = { opps: 0, acv: 0 };
    }

    // Add counts
    grouped[quarter].teams[team].opps += item.count;
    grouped[quarter].teams[team].acv += item.acv;

    grouped[quarter].total.opps += item.count;
    grouped[quarter].total.acv += item.acv;
  });

  const result = Object.values(grouped).sort((a: any, b: any) =>
    a.quarter.localeCompare(b.quarter)
  );

  res.json(result);
};

/**
 * Controller: GET /api/acv-range
 * Description:
 * - Reads "acv-range.json"
 * - Groups data by ACV range and quarter
 * - Tracks total ACV and opportunity counts
 */
export const getACVRange = (_: Request, res: Response) => {
  const data = readJSON('acv-range.json');
  const grouped: Record<string, any> = {};

  data.forEach((item: any) => {
    const quarter = item.closed_fiscal_quarter;
    const range = item.ACV_Range;

    // Initialize quarter and range entry
    if (!grouped[quarter]) {
      grouped[quarter] = { quarter, ranges: {}, total: { opps: 0, acv: 0 } };
    }
    if (!grouped[quarter].ranges[range]) {
      grouped[quarter].ranges[range] = { opps: 0, acv: 0 };
    }

    // Add counts
    grouped[quarter].ranges[range].opps += item.count;
    grouped[quarter].ranges[range].acv += item.acv;

    grouped[quarter].total.opps += item.count;
    grouped[quarter].total.acv += item.acv;
  });

  const result = Object.values(grouped).sort((a: any, b: any) =>
    a.quarter.localeCompare(b.quarter)
  );

  res.json(result);
};
