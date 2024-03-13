import { renderFile } from "ejs";
import { writeFileSync, existsSync, mkdirSync, createReadStream } from "fs";
import readline from 'readline';

import { 
  IOS_DATE_REGEX, 
  ANDROID_DATE_REGEX,
  OUTPUT_DIR
} from "./const.js";
import { processMsgAndroid } from "./android.js";
import { processMsgIOS } from "./ios.js";

async function processFile(input_path, output_path) {
  let processFn = null;
  const messages = [];

  try {
    const rl = readline.createInterface({
      input: createReadStream(input_path),
      crlfDelay: Infinity
    });
    
    for await (const line of rl) {
      if (!processFn) {
        if (IOS_DATE_REGEX.test(line)) {
          processFn = processMsgIOS;
        } else if (ANDROID_DATE_REGEX.test(line)) {
          processFn = processMsgAndroid;
        } else {
          throw Error('Incorrect file format.')
        }
      }

      const message = processFn(line);
      if (message?.date) {
        messages.push(message); 
      } else {
        const last = messages.at(-1);
        last.lines.push(...message.lines);
      }
    }

    if (!existsSync(OUTPUT_DIR)){
      mkdirSync(OUTPUT_DIR);
    }
  
    renderFile("template/template.ejs", { messages }, { rmWhitespace: true }, (err, str) => {
      writeFileSync(`${OUTPUT_DIR}/test.html`, str);
    });
  } catch (err) {
    console.error(err);
  }
}

processFile('test2.txt', '')