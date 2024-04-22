// NOTE: not logged in
const authRoute = ["/", "/sign-in", "/sign-up", "/forgot-password"];

// NOTE: log in with verified information
// TODO: update router
const verifedRoute = [
  "/newfeed",
  "/notification",
  "/statistic",
  "/tracking",
  "/tracking/create-document",
  "/tracking/create-study-record",
  "/newfeed/following",
  "/newfeed/all",
];

// NOTE: log in with unverified information

const unverifiedRoute = ["/basic-information"];

export { authRoute, verifedRoute, unverifiedRoute };
