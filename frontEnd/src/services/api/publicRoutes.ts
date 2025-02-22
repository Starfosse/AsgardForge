const publicRoutes = [
  "/auth/google",
  "/auth/google/callback",
  "/products",
  "/products/:id",
  "/collections",
  "/collections/:id",
  "/collection",
  "/collection/:id/products",
] as const;

export function isPublicRoute(route: string): boolean {
  const routePattern = route.replace(/\/\d+(?=\/|$)/g, "/:id");
  return publicRoutes.some(
    (publicRoute) => publicRoute === route || publicRoute === routePattern
  );
}
