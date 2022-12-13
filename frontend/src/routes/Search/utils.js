// Matches filter values to the appropriate comparison of the space value
// in order to properly filter the numerical values based on categories

export function noisiness(num_val) {
  if (!num_val) return null;
  switch (num_val) {
    case 0:
    case 1:
      return "Silent";
    case 2:
      return "Soft Whisper";
    case 3:
    case 4:
      return "Normal Conversation";
    case 5:
    default:
      return "Shouting in Ear";
  }
}

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
}

export function privacy(num_val) {
  if (!num_val) return null;
  switch (num_val) {
    case 0:
    case 1:
      return "Public";
    case 2:
      return "Semi-public";
    case 3:
    case 4:
      return "Semi-private";
    case 5:
    default:
      return "Private";
  }
}

export function matchPrivacy(filter_val, space_val) {
  switch (filter_val) {
    case "Public":
      return space_val > 0 && space_val <= 1;
    case "Semi-public":
      return space_val > 1 && space_val <= 2;
    case "Semi-private":
      return space_val > 2 && space_val < 4;
    case "Private":
      return space_val >= 4;
    default:
      return true;
  }
}

export function lighting(num_val) {
  if (!num_val) return null;
  switch (num_val) {
    case 0:
    case 1:
      return "Dim";
    case 2:
    case 3:
      return "Normal";
    case 4:
    case 5:
    default:
      return "Bright";
  }
}

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
}

export function cleanliness(num_val) {
  if (!num_val) return null;
  switch (num_val) {
    case 0:
    case 1:
      return "Unkempt Neglect";
    case 2:
      return "Moderate Dinginess";
    case 3:
      return "Casual Inattention";
    case 4:
      return "Ordinary Tidiness";
    case 5:
    default:
      return "Orderly Spotlessness";
  }
}

export function matchCleanliness(filter_val, space_val) {
  switch (filter_val) {
    case "Unkempt Neglect":
      return space_val > 0 && space_val <= 1;
    case "Moderate Dinginess":
      return space_val > 1 && space_val <= 2;
    case "Casual Inattention":
      return space_val > 2 && space_val <= 3;
    case "Ordinary Tidiness":
      return space_val > 3 && space_val < 4;
    case "Orderly Spotlessness":
      return space_val >= 4;
    default:
      return true;
  }
}

export function sortResults(data, sort_val) {
  switch (sort_val) {
    case "Name A-Z":
      return data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    case "Name Z-A":
      return data.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    case "Avg. Rating":
      return data.sort((a, b) => b.rating - a.rating);
    default:
      return data;
  }
}
