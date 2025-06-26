import { Router } from 'express';
import {
  getCustomerType,
  getAccountIndustry,
  getTeam,
  getACVRange
} from '../controllers/dataController';

const router = Router();

router.get('/customer-type', getCustomerType);
router.get('/account-industry', getAccountIndustry);
router.get('/team', getTeam);
router.get('/acv-range', getACVRange);

export default router;
