import { CONTENT_TYPE, IOS_DATE_REGEX, IOS_FILE_REGEX } from "./const.js";
import { getAttachmentType } from "./shared.js";

export const processMsgIOS = (msg) => processMessage(msg);

function processMessage(msg) {
  const lines = [];
  let sender = null;
  let date = null;

  let split = msg.split('] ');
  date = split[0].trim() + ']';

  if (IOS_DATE_REGEX.test(date)) {
    date = date.substring(1, date.length - 1);
    split.shift();
    const rest = split.join('] ');

    split = rest.split(': ');
    sender = split[0].trim();
    split.shift();
    lines.push(processLineType(split.join(': ').trim()));
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

  if (IOS_FILE_REGEX.test(line)) {
    const split = line.split(' ');
    const content = split[0];
    processed.content = content;
    processed.type = getAttachmentType(content);
  } else {
    processed.content = line;
    processed.type = CONTENT_TYPE.TEXT;
  }
  return processed;
}