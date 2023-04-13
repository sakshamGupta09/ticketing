import { AlertTypes, IAlertAttributes } from '../models';

const ALERT_CONFIG: Record<AlertTypes, IAlertAttributes> = {
  success: {
    bgColor: '#4CAF50',
    icon: 'circle-check',
  },
  error: {
    bgColor: '#CF6679',
    icon: 'circle-xmark',
  },
  info: {
    bgColor: '#2196F3',
    icon: 'circle-info',
  },
};

export default ALERT_CONFIG;
