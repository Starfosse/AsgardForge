const publicRoutes = [
  "/auth/google",
  "/auth/google/callback",
  "/auth/refresh",
] as const;

type PublicRoute = (typeof publicRoutes)[number];

export function isPublicRoute(route: string): route is PublicRoute {
  return publicRoutes.includes(route as PublicRoute);
}
