import { createTransport } from 'nodemailer';

interface SendMailMessage {
  readonly html?: string
  readonly subject: string
  readonly text: string
  readonly to: string
}

const sendMail = async (message: SendMailMessage): Promise<boolean> => {
  const { to, subject, text, html } = message;

  try {
    const transporter = createTransport({
      auth: {
        pass: process.env.EMAIL_PASSWORD,
        user: process.env.EMAIL_FROM
      },
      service: process.env.EMAIL_SERVICE
      /*
       * Host: 'localhost',
       * port: 3025,
       * secure: false
       */
    });

    const info = await transporter.sendMail({
      html,
      subject,
      text,
      to,
      from: process.env.EMAIL_FROM
    });

    console.debug(info);

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
};

export { sendMail };
export type { SendMailMessage };
