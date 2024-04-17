// NOTE: not logged in
const authRoute = ["/", "/sign-in", "/sign-up", "/forgot-password"];

// NOTE: log in with verified information
// TODO: update router
const verifedRoute = [
  "/newfeed",
  "/notification",
  "/statistic",
  "/tracking",
  "/create-document",
  "/search-document",
];

// NOTE: log in with unverified information

const unverifiedRoute = ["/basic-information"];

export { authRoute, verifedRoute, unverifiedRoute };
