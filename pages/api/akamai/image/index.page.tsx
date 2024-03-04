import { NextApiHandler } from 'next';
import NetStorage from 'netstorageapi';
import { netStorageConfig } from '../config';
import { getNetStorageImagePath } from './utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { source } = req.query;
    const { imageDestination, netStoragePath, localPath } = getNetStorageImagePath(source as string);

    const ns = new NetStorage(netStorageConfig);
    await ns.download(netStoragePath, localPath, (error: { message: string }) => {
      if (error) {
        res.status(400).json(error);
        return;
      }
      res.status(200).json({ path: imageDestination });
    });
  }
};

export default handler;
