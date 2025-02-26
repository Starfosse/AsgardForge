const publicRoutes = [
  "/api/auth/google",
  "/api/auth/google/callback",
  "/api/products",
  "/api/products/:id",
  "/api/collections",
  "/api/collections/:id",
  "/api/collection",
  "/api/collection/:id/products",
] as const;

export function isPublicRoute(route: string): boolean {
  const routePattern = route.replace(/\/\d+(?=\/|$)/g, "/:id");
  return publicRoutes.some(
    (publicRoute) => publicRoute === route || publicRoute === routePattern
  );
}
