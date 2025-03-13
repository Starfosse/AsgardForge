const publicRoutes = [
  "/api/auth/google",
  "/api/auth/google/callback",
  "/api/collections/:id/products",
  "/api/products",
  "/api/products/:id",
  "/api/collections",
  "/api/collections/:id",
  "/api/collection",
  "/api/products/featured/all",
  "/api/reviews/:id",
] as const;

export function isPublicRoute(route: string): boolean {
  const routePattern = route.replace(/\/\d+(?=\/|$)/g, "/:id");
  return publicRoutes.some(
    (publicRoute) => publicRoute === route || publicRoute === routePattern
  );
}
