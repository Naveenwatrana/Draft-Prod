import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'; // TODO: replace with fetch
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authCode = req.query.code;
  axios
    .post(process.env.authTokenURL as string, {
      client_id: process.env.NEXT_PUBLIC_clientID,
      client_secret: process.env.NEXT_PUBLIC_clientSecret,
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: process.env.NEXT_PUBLIC_redirectCallback,
    })
    .then((response: any) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
}
