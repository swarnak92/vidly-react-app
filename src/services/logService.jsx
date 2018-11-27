import Raven from "raven-js";

function init() {
  Raven.config("https://7d476f5081f7496497a0415a07158514@sentry.io/1330050", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
