import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NetStorage from 'netstorageapi';

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const netStorageConfig = {
    hostname: process.env.NEXT_PUBLIC_AKAMAI_HOSTNAME,
    keyName: process.env.NEXT_PUBLIC_AKAMAI_KEYNAME,
    key: process.env.NEXT_PUBLIC_AKAMAI_KEY,
    cpCode: process.env.NEXT_PUBLIC_AKAMAI_CPCODE,
    ssl: true,
  };
  const ns = new NetStorage(netStorageConfig);
  const pathToFile = req.body.replace(process.env.NEXT_PUBLIC_AKAMAI_LINK, '');
  ns.delete(`/${netStorageConfig.cpCode}/${pathToFile}`, (error: { message: any }, response: { statusCode: number }, body: any) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(`Got error: ${error.message}`);
      res.json({ done: 'false' });
    }
    if (response.statusCode === 200) {
      res.json({ done: 'ok' });
      return;
    }
    // eslint-disable-next-line no-console
    console.log('From Delete API', body);
    res.json({ done: 'false' });
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    await deleteHandler(req, res);
  }
};

export default handler;
