const fs = require('fs');
const { convertToHtml } = require('./utils.js');

function convert() {
  if(process.env.INPUT_FILE_PATH && process.env.OUTPUT_FILE_PATH) {
    console.log(`💥 conversion started using ${process.env.INPUT_FILE_PATH}`);

    fs.readFile(process.env.INPUT_FILE_PATH, 'utf-8', (err, data) => {
      if (err) throw err;

      fs.writeFile(process.env.OUTPUT_FILE_PATH, convertToHtml(data), err => {
        if (err) throw err;
        console.log(`✨✨ success file saved to ${process.env.OUTPUT_FILE_PATH}`);
      });
    });
  } else {
    throw new Error(`Required env vars not set: INPUT_FILE_PATH - ${process.env.INPUT_FILE_PATH} | OUTPUT_FILE_PATH- ${process.env.OUTPUT_FILE_PATH}`)
  }
}

convert();