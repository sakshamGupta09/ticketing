import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type AlertTypes = 'success' | 'error' | 'info';

export interface IAlertAttributes {
  bgColor: string;
  icon: IconProp;
}
