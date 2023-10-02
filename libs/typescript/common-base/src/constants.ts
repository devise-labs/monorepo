export const LABS_NAME = 'definelabs';
export const NPM_ORG = `@${LABS_NAME}`;
export enum PackageType {
  App = 'App',
  CommandLineInterface = 'CommandLineInterface',
  Library = 'Library',
  Service = 'Service',
  SmartContract = 'SmartContract'
}
export const PACKAGE_ABBRV: {[packageType in PackageType]: string} = {
  [PackageType.App]: 'app',
  [PackageType.CommandLineInterface]: 'cli',
  [PackageType.Library]: 'lib',
  [PackageType.Service]: 'svc',
  [PackageType.SmartContract]: 'sc'
}
export const PACKAGE_ABBRV_LOOKUP: Record<string, PackageType> 
  = Object.fromEntries(Object.entries(PACKAGE_ABBRV).map(([k, v]) => [v, k])) as Record<string, PackageType>;
export const VALID_INPUT_PACKAGE_TYPES = Object.values(PackageType).map(pt => PACKAGE_ABBRV[pt]);
export const CANNON_PACKAGE_NAME = "canonical";
export const PACKAGE_HIERARCHY = {
  [PackageType.App]: {
    web: true,
    xnft: true
  },
  [PackageType.CommandLineInterface]: true,
  [PackageType.Library]: {
    rust: "rs",
    typescript: "ts"
  },
  [PackageType.Service]: true,
  [PackageType.SmartContract]: {
    sol: true
  }
} as const;
