const availablePlatforms = require("./availablePlatforms");

const validateStreamerData = (streamer) => {
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const DESC_REGEX = /^(?! )(?!\s)(.{20,300})(?<!\s)(?! )$/;

  const validName = NAME_REGEX.test(streamer?.name);
  const validDescription = DESC_REGEX.test(streamer?.description);
  const validPlatform = availablePlatforms.includes(streamer?.platform);

  if (validName && validDescription && validPlatform) {
    return true;
  } else {
    return false;
  }
};

module.exports = validateStreamerData;
