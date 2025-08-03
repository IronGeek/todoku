import { Andika, MuseoModerno } from 'next/font/google';

const andika = Andika({
  subsets : ['latin'],
  variable: '--font-andika',
  weight  : '400'
});

const musoeModerno = MuseoModerno({
  subsets : ['latin'],
  variable: '--font-museo-moderno',
  weight  : ['400', '700']
});

const fonts = Object.freeze({
  className: [andika.className, musoeModerno.className].join(' '),
  style    : [andika.style, musoeModerno.style].join(' '),
  variable : [andika.variable, musoeModerno.variable].join(' ')
});

export { andika, fonts };
