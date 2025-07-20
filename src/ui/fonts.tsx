import { Andika } from 'next/font/google'

const andika = Andika({
  subsets: ['latin'],
  variable: '--font-andika',
  weight: '400'
});

const fonts = Object.freeze({
  className: [andika.className].join(' '),
  style: [andika.style].join(' '),
  variable: [andika.variable].join(' ')
});

export { andika, fonts }