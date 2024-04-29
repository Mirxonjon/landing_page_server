import { v4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import { extname, join, resolve } from 'path';
const { google } = require('googleapis');

const keyFilenameSheet = resolve(process.cwd(), 'src', 'utils', 'key1.json');

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilenameSheet,  // Path to your service account key file.
  scopes: ['https://www.googleapis.com/auth/spreadsheets']  // Scope for Google Sheets API.
});

const projectId = 'telecom-398714';
const keyFilename = resolve(process.cwd(), 'src', 'utils', 'key.json');
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket('telecom-storege_pic');

export const googleCloud = async (file: any | any[]) => {
  const a: any[] = [];
  a.push(file);
  const imageLink = join(v4() + extname(a[0]?.originalname));
  
  const blob =  bucket.file(imageLink);
  const blobStream =  blob.createWriteStream();

  blobStream.on('error', (err) => {
  });

  blobStream.end(a[0]?.buffer);
  return imageLink;
};

export const googleCloudAsync = async (file: any | any[]) :Promise<string> => {
  const a: any[] = [];
  a.push(file);
  const imageLink = join(v4() + extname(a[0]?.originalname));
  const blob =  bucket.file(imageLink);
  const blobStream =  blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(err.message);
    });
    
    blobStream.on('finish', () => {
      resolve(imageLink);
    });
    
    blobStream.end(a[0]?.buffer);
  });
};

export const deleteFileCloud = async (imageLink: string) => {
  await new Promise((resolve, reject) => {
    const blob = bucket
      .file(imageLink)
      .delete()
      .then((image) => {
        resolve(imageLink);
      })
      .catch((e) => {
        reject(e);
      });
  });
  return imageLink;
};

export const  writeToSheet = async (values) =>  {
  const sheets = google.sheets({ version: 'v4', auth });  // Creates a Sheets API client instance.
  const spreadsheetId = '1u9i8GHKHqkj99AeDN79VQi53PA840VGN93WzeivEfsA';  // The ID of the spreadsheet.
  const range = 'info!B2';  // The range in the sheet where data will be written.
  const valueInputOption = 'USER_ENTERED';  // How input data should be interpreted.

  const resource = { values };  // The data to be written.

  try {
      const res = await sheets.spreadsheets.values.update({
          spreadsheetId, range, valueInputOption, resource
      })
      return res;  // Returns the response from the Sheets API.
  } catch (error) {
      console.error('error', error);  // Logs errors.
  }
}

