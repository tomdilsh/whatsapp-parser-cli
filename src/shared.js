import { AUDIO_REGEX, 
  CONTACT_REGEX, 
  CONTENT_TYPE, 
  IMAGE_REGEX, 
  VIDEO_REGEX 
} from "./const.js";

export function getAttachmentType(content) {
  if (IMAGE_REGEX.test(content)) {
    return CONTENT_TYPE.IMAGE;
  } else if (VIDEO_REGEX.test(content)) {
    return CONTENT_TYPE.VIDEO;
  } else if (AUDIO_REGEX.test(content)) {
    return CONTENT_TYPE.AUDIO;
  } else if (CONTACT_REGEX.test(content)) {
    return CONTENT_TYPE.CONTACT;
  } else {
    return CONTENT_TYPE.ATTACHMENT;
  }
}