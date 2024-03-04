import { NextApiHandler, NextApiRequest } from 'next';
import NetStorage from 'netstorageapi';
import formidable from 'formidable';
import path from 'path';
import fsPromise from 'fs/promises';
import fs from 'fs';
import { netStorageConfig } from './config';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  options.uploadDir = path.join(process.cwd(), '/public/images');
  options.filename = (name, ext, path2: formidable.Part) => {
    return `${Date.now().toString()}_${path2.originalFilename}`;
  };
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
const getFileName = (fileName: string): string => {
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
  const newFileName = fileName.replace(/[^A-Z0-9]/ig, '_');
  return `${newFileName}${fileExtension}`;
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fsPromise.readdir(path.join(`${process.cwd()}/public`, '/images'));
  } catch (error) {
    await fsPromise.mkdir(path.join(`${process.cwd()}/public`, '/images'));
  }
  const { files: file, fields: { userName } } = await readFile(req);
  const fileName = getFileName((file.file as formidable.File).newFilename);
  const localPath = path.join(`${process.cwd()}/public`, '/images', `/${(file.file as formidable.File).newFilename}`);

  const ns = new NetStorage(netStorageConfig);
  const filePath = `${userName}/${fileName}`;
  const netStorageDestination = `/${netStorageConfig.cpCode}/${filePath}`;
  ns.upload(localPath, netStorageDestination, (error: { message: any }, response: { statusCode: number }, body: any) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(`Got error: ${error.message}`);
      res.json({ done: 'ok' });
    }
    if (response?.statusCode === 200) {
      // eslint-disable-next-line no-console
      console.log(body);
      fs.unlinkSync(localPath);
      res.json({ path: `${process.env.NEXT_PUBLIC_AKAMAI_LINK}${filePath}` });
      return;
    }
    res.json({ done: 'false' });
  });
};

export default handler;
