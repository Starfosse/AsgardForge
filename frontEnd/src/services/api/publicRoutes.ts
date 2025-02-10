const publicRoutes = [
  "/auth/google",
  "/auth/google/callback",
  "/auth/refresh",
  "/products",
  "/products/:id",
  "/collections",
  "/collections/:id",
  "/category",
  "/category/:id/products",
] as const;

export function isPublicRoute(route: string): boolean {
  const routePattern = route.replace(/\/\d+(?=\/|$)/g, "/:id");
  return publicRoutes.some(
    (publicRoute) => publicRoute === route || publicRoute === routePattern
  );
}
