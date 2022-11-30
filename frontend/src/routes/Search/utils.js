// Matches filter values to the appropriate comparison of the space value
// in order to properly filter the numerical values based on categories

export function matchNoisiness(filter_val, space_val) {
  switch (filter_val) {
    case "Silent":
      return space_val > 0 && space_val <= 1;
    case "Soft Whisper":
      return space_val > 1 && space_val <= 2;
    case "Normal Conversation":
      return space_val > 2 && space_val <= 4;
    case "Shouting in Ear":
      return space_val > 4;
    default:
      return true;
  }
};

export function matchPrivacy(filter_val, space_val) {
  switch (filter_val) {
    case "Private":
      return space_val > 0 && space_val <= 1;
    case "Semi-private":
      return space_val > 1 && space_val <= 2;
    case "Semi-public":
      return space_val > 2 && space_val < 4;
    case "Public":
      return space_val >= 4;
    default:
      return true;
  }
};

export function matchLighting(filter_val, space_val) {
  switch (filter_val) {
    case "Dim":
      return space_val > 0 && space_val <= 2;
    case "Normal":
      return space_val > 2 && space_val < 4;
    case "Bright":
      return space_val >= 4;
    default:
      return true;
  }
};

export function matchCleanliness(filter_val, space_val) {
  switch (filter_val) {
    case "Orderly Spotlessness":
      return space_val > 0 && space_val <= 1;
    case "Ordinary Tidiness":
      return space_val > 1 && space_val <= 2;
    case "Casual Inattention":
      return space_val > 2 && space_val <= 3;
    case "Moderate Dinginess":
      return space_val > 3 && space_val < 4;
    case "Unkempt Neglect":
      return space_val >= 4;
    default:
      return true;
  }
};