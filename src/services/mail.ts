import nodemailer from 'nodemailer';

interface SendMailMessage {
  readonly to: string
  readonly subject: string
  readonly text: string
  readonly html?: string
}

const sendMail = async (message: SendMailMessage): Promise<boolean> => {
  const { to, subject, text, html } = message;

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html
    });

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
}

export { sendMail };
export type { SendMailMessage };
