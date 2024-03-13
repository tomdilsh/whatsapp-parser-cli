import { 
  ANDROID_DATE_REGEX, 
  ANDROID_FILE_INDICATOR, 
  CONTENT_TYPE, 
} from "./const.js";
import { getAttachmentType } from "./shared.js";

export const processMsgAndroid = (msg) => processMessage(msg);

function processMessage(msg) {
  const lines = [];
  let sender = null;
  let date = null;

  let split = msg.split(' - ');
  date = split[0].trim();

  if (ANDROID_DATE_REGEX.test(date)) {
    split.shift();
    const rest = split.join(' - ');

    split = rest.split(': ');

    if (split.length > 1) {
      sender = split[0].trim();
      split.shift();
      lines.push(processLineType(split.join(': ').trim()));
    } else {
      lines.push(processLineType(split[0].trim()));
    }
  } else {
    lines.push(processLineType(msg))
    date = null;
  }

  return {
    lines,
    sender,
    date,
  }
}

function processLineType(line) {
  const processed = {};

  if (line.includes(ANDROID_FILE_INDICATOR)) {
    const split = line.split(' ');
    const content = split[1].substring(0, split[1].length - 1);
    processed.content = content;
    processed.type = getAttachmentType(content);
  } else {
    processed.content = line;
    processed.type = CONTENT_TYPE.TEXT;
  }
  return processed;
}