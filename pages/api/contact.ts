import { NextApiHandler } from 'next';
import { createTransport } from 'nodemailer';

const contactFunction: NextApiHandler = async (req, res) => {
  const transporter = createTransport({
    port: 465,
    host: 'mail.infomaniak.com',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  try {
    const mailSendResp = await transporter.sendMail(req.body);
    res.status(200).json(mailSendResp);
  } catch (error) {
    console.log('err', error);
    res.status(500).json(error);
  }
};

export default contactFunction;
