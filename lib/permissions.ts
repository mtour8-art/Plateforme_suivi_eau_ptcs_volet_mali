export const ROLE_PUBLIC = "Public";
export const ROLE_OBSERVATEUR = "Observateur";
export const ROLE_DNH = "DNH/DRHK";
export const ROLE_ADMIN = "Administrateur PTCS";

export function canReport(role?: string) {
  return [ROLE_OBSERVATEUR, ROLE_DNH, ROLE_ADMIN].includes(role || ROLE_PUBLIC);
}
export function canExport(role?: string) {
  return [ROLE_DNH, ROLE_ADMIN].includes(role || ROLE_PUBLIC);
}
export function canSync(role?: string) {
  return [ROLE_DNH, ROLE_ADMIN].includes(role || ROLE_PUBLIC);
}
export function canManageUsers(role?: string) {
  return role === ROLE_ADMIN;
}
