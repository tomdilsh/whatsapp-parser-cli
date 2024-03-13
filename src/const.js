export const OUTPUT_DIR = 'output';

export const ANDROID_DATE_REGEX = /(\d{4}-\d{2}-\d{2}),\s(\d{1,2}:\d{2})\s(a.m|p.m)/;
export const IOS_DATE_REGEX = /\[(\d{4}-\d{2}-\d{2}),\s(\d{1,2}:\d{2}:\d{2})\s(AM|PM)\]/

export const ANDROID_FILE_INDICATOR = ' (file attached)';
export const IOS_FILE_REGEX = /\u200E(\<attached:)\s/;
export const LRM_REGEX = /\u200E/;

export const IMAGE_REGEX = /\.(jpg|jpeg|png|bmp|gif|tiff|svg)/;
export const AUDIO_REGEX = /\.(opus|mp3|wav|flac)/;
export const VIDEO_REGEX = /\.(mp4|mov|avi|wmv|webm|flv)/;
export const CONTACT_REGEX = /\.(vcf)/;

export const CONTENT_TYPE = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  CONTACT: 'CONTACT',
  ATTACHMENT: 'ATTACHMENT',
};