export enum NavItemCondition {
  MUST_BE_OWNER = 'MUST_BE_OWNER'
}

export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  condition?: NavItemCondition
}
