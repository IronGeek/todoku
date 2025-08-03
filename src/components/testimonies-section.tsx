import { formatDate } from 'date-fns';
import Image from 'next/image';
import stringReplace from 'react-string-replace';

import { Logo } from '@/components/logo.tsx';
import { Rating } from '@/components/rating.tsx';
import { Carousel } from '@/ui/carousel.tsx';
import { PatchCheckIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './testimonies-section.module.scss';

import type { ComponentProps, JSX } from 'react';

interface Testimony {
  date: Date
  email: string
  name: string
  picture: string
  rating: number
  testimony: string
  verified: boolean
}

const testimonials: Testimony[] = [
  {
    date     : new Date('2025-07-28T10:30:00Z'),
    email    : 'sarah.j@example.com',
    name     : 'Sarah Johnson',
    picture  : '/avatars/f-01.png',
    rating   : 9,
    testimony: '@Todoku changed my daily routine! I feel so much more organized and less stressed. The cheerful design is a huge plus. Highly recommend it to anyone feeling overwhelmed.',
    verified : true
  },
  {
    date     : new Date('2025-07-27T14:15:00Z'),
    email    : 'budi.s@mail.com',
    name     : 'Budi Santoso',
    picture  : '/avatars/m-01.png',
    rating   : 8,
    testimony: 'Aplikasi ini benar-benar membantu saya mengatur jadwal kerja. Antarmukanya intuitif dan sangat menyenangkan dipakai. Jempol!',
    verified : true
  },
  {
    date     : new Date('2025-07-26T09:00:00Z'),
    email    : 'emily.w@example.org',
    name     : 'Emily White',
    picture  : '/avatars/f-02.png',
    rating   : 6,
    testimony: "I'm usually terrible at keeping track of my tasks. The app is okay, but I wish the notifications were a bit more customizable. Still, it's better than sticky notes.",
    verified : false
  },
  {
    date     : new Date('2025-07-25T11:45:00Z'),
    email    : 'dewi.l@email.com',
    name     : 'Dewi Lestari',
    picture  : '/avatars/f-03.png',
    rating   : 10,
    testimony: 'Sekarang semua daftar tugas saya rapi di satu tempat. @Todoku bikin saya merasa lebih pegang kendali. Aplikasi ini harusnya masuk ke dalam keajaiban dunia ke-8!',
    verified : true
  },
  {
    date     : new Date('2025-07-24T16:00:00Z'),
    email    : 'michael.b@web.com',
    name     : 'Michael Brown',
    picture  : '/avatars/m-02.png',
    rating   : 7,
    testimony: "Finally, a to-do app that doesn't feel like a chore. @Todoku is intuitive, colorful, and genuinely helpful. Just wish it had a dark mode already!",
    verified : true
  },
  {
    date     : new Date('2025-07-23T08:30:00Z'),
    email    : 'faisal.r@id.net',
    name     : 'Faisal Rahman',
    picture  : '/avatars/m-03.png',
    rating   : 2,
    testimony: 'Masih sering lupa rapat penting, sekarang notifikasinya malah telat. Sepertinya aplikasi ini butuh diperbaiki.',
    verified : false
  },
  {
    date     : new Date('2025-07-22T13:00:00Z'),
    email    : 'jessica.l@mail.us',
    name     : 'Jessica Lee',
    picture  : '/avatars/f-03.png',
    rating   : 10,
    testimony: "The best task manager I've ever used. Simple, effective, and it just makes managing my day so much brighter. I feel like the main character of a productivity movie now.",
    verified : true
  },
  {
    date     : new Date('2025-07-21T10:10:00Z'),
    email    : 'rina.w@indosat.net',
    name     : 'Rina Wijaya',
    picture  : '/avatars/f-04.png',
    rating   : 9,
    testimony: 'Saya suka bagaimana @Todoku membantu saya fokus. Desainnya juga bikin mood bagus! Tidak sia-sia unduh aplikasi ini.',
    verified : true
  },
  {
    date     : new Date('2025-07-20T17:00:00Z'),
    email    : 'david.c@company.com',
    name     : 'David Chen',
    picture  : '/avatars/m-04.png',
    rating   : 5,
    testimony: "It's a solid app for managing tasks, but it's nothing groundbreaking. It gets the job done, but it could use a few more advanced features.",
    verified : true
  },
  {
    date     : new Date('2025-07-19T09:40:00Z'),
    email    : 'putri.a@domain.co',
    name     : 'Putri Anggraini',
    picture  : '/avatars/f-05.png',
    rating   : 8,
    testimony: 'Aplikasi yang sangat membantu untuk ibu rumah tangga seperti saya. Tugas harian jadi lebih terstruktur dan tidak ada yang terlewat.',
    verified : false
  },
  {
    date     : new Date('2025-07-18T11:20:00Z'),
    email    : 'chris.e@provider.com',
    name     : 'Chris Evans',
    picture  : '/avatars/m-05.png',
    rating   : 10,
    testimony: "My productivity has soared since I started using @Todoku. It’s super intuitive and just works. It's so good, I'm pretty sure my boss thinks I'm a superhero now.",
    verified : true
  },
  {
    date     : new Date('2025-07-17T15:30:00Z'),
    email    : 'agus.d@emailku.com',
    name     : 'Agus Dharma',
    picture  : '/avatars/m-06.png',
    rating   : 4,
    testimony: '@Todoku memudahkan saya memantau deadline, tapi seringkali sinkronisasinya agak lambat. Mohon diperbaiki, terima kasih.',
    verified : true
  },
  {
    date     : new Date('2025-07-16T08:00:00Z'),
    email    : 'olivia.g@service.net',
    name     : 'Olivia Grace',
    picture  : '/avatars/f-06.png',
    rating   : 7,
    testimony: 'Simple, yet powerful. @Todoku has become my go-to for everything from shopping lists to work assignments. Would be perfect with more color themes.',
    verified : false
  },
  {
    date     : new Date('2025-07-15T12:00:00Z'),
    email    : 'yoga.p@server.id',
    name     : 'Yoga Pratama',
    picture  : '/avatars/m-07.png',
    rating   : 9,
    testimony: 'Aplikasi yang ceria dan efektif! Membuat saya semangat menyelesaikan tugas-tugas setiap hari. Tidak ada lagi mager!',
    verified : true
  },
  {
    date     : new Date('2025-07-14T16:45:00Z'),
    email    : 'liam.o@example.ie',
    name     : "Liam O'Connell",
    picture  : '/avatars/m-08.png',
    rating   : 1,
    testimony: "I've tried adding my tasks but the app keeps crashing. It's more of a distraction than a help. Uninstalled.",
    verified : true
  },
  {
    date     : new Date('2025-07-13T09:15:00Z'),
    email    : 'siti.n@provider.id',
    name     : 'Siti Nurjanah',
    picture  : '/avatars/f-07.png',
    rating   : 10,
    testimony: 'Paling suka fitur pengingatnya. Sekarang tidak ada lagi alasan untuk lupa tugas penting. @Todoku juara!',
    verified : true
  },
  {
    date     : new Date('2025-07-12T14:00:00Z'),
    email    : 'daniel.k@tech.co',
    name     : 'Daniel Kim',
    picture  : '/avatars/m-09.png',
    rating   : 8,
    testimony: "Keeps me on track with my university assignments. It's a lifesaver for students! Now if only it could write my papers for me...",
    verified : true
  },
  {
    date     : new Date('2025-07-11T10:00:00Z'),
    email    : 'aditya.w@mailme.com',
    name     : 'Aditya Wijoyo',
    picture  : '/avatars/m-10.png',
    rating   : 6,
    testimony: 'Desainnya modern dan warnanya cerah, tapi kadang tampilannya terasa agak ramai. Mungkin bisa lebih minimalis lagi.',
    verified : false
  },
  {
    date     : new Date('2025-07-10T13:30:00Z'),
    email    : 'chloe.a@cloud.com',
    name     : 'Chloe Adams',
    picture  : '/avatars/f-08.png',
    rating   : 9,
    testimony: "My entire team uses @Todoku now. Collaboration is seamless and everyone is more productive. It's a miracle worker!",
    verified : true
  },
  {
    date     : new Date('2025-07-09T08:45:00Z'),
    email    : 'rizky.r@apps.id',
    name     : 'Rizky Ramadhan',
    picture  : '/avatars/m-11.png',
    rating   : 10,
    testimony: 'Dulu sering bingung mau mulai dari mana, sekarang @Todoku yang menuntun. Produktivitas meningkat drastis! Saya serasa punya asisten pribadi sekarang.',
    verified : true
  },
  {
    date     : new Date('2025-07-08T15:00:00Z'),
    email    : 'isabella.g@global.org',
    name     : 'Isabella Garcia',
    picture  : '/avatars/f-09.png',
    rating   : 5,
    testimony: "So easy to use, even for someone not tech-savvy. It's helped me organize my life, but I find the calendar integration a bit clunky.",
    verified : true
  },
  {
    date     : new Date('2025-07-07T11:00:00Z'),
    email    : 'bambang.s@webmail.id',
    name     : 'Bambang Susilo',
    picture  : '/avatars/m-12.png',
    rating   : 3,
    testimony: 'Saya sering menggunakan @Todoku untuk pekerjaan lepas, tapi sering sekali keluar sendiri. Tolong perbaiki masalah stabilitasnya.',
    verified : false
  },
  {
    date     : new Date('2025-07-06T10:30:00Z'),
    email    : 'noah.t@solution.com',
    name     : 'Noah Thompson',
    picture  : '/avatars/m-13.png',
    rating   : 8,
    testimony: "I appreciate the clean interface and how quickly I can add new tasks. A real time-saver. It's like my brain, but organized.",
    verified : true
  },
  {
    date     : new Date('2025-07-05T14:20:00Z'),
    email    : 'kartika.s@example.co.id',
    name     : 'Kartika Sari',
    picture  : '/avatars/f-10.png',
    rating   : 9,
    testimony: 'Tidak menyangka aplikasi to-do list bisa sekeren ini. Membuat pekerjaan rumah tangga jadi lebih terarah dan terasa menyenangkan.',
    verified : true
  },
  {
    date     : new Date('2025-07-04T09:50:00Z'),
    email    : 'oliver.s@enterprise.net',
    name     : 'Oliver Smith',
    picture  : '/avatars/f-11.png',
    rating   : 2,
    testimony: '@Todoku helps me prioritize effectively, but my tasks keep disappearing! This is a major issue and makes the app unusable for me.',
    verified : true
  },
  {
    date     : new Date('2025-07-03T16:10:00Z'),
    email    : 'joko.p@server.id',
    name     : 'Joko Pranoto',
    picture  : '/avatars/m-14.png',
    rating   : 7,
    testimony: 'Saya sering menggunakan @Todoku untuk melacak jadwal pertemuan. Sangat efisien, tapi butuh fitur kolaborasi yang lebih baik.',
    verified : true
  },
  {
    date     : new Date('2025-07-02T11:30:00Z'),
    email    : 'sophia.m@domain.biz',
    name     : 'Sophia Miller',
    picture  : '/avatars/f-12.png',
    rating   : 9,
    testimony: "A fun way to stay on top of things! @Todoku really does make productivity feel less like a chore. It's like a game for my brain!",
    verified : false
  },
  {
    date     : new Date('2025-07-01T13:45:00Z'),
    email    : 'dini.o@mailnesia.com',
    name     : 'Dini Oktaviani',
    picture  : '/avatars/f-13.png',
    rating   : 6,
    testimony: 'Fitur pengingatnya sangat berguna, tidak pernah ketinggalan janji lagi. Tapi kadang suka ter-reset sendiri, jadi harus dicek ulang.',
    verified : true
  },
  {
    date     : new Date('2025-06-30T10:00:00Z'),
    email    : 'william.j@data.com',
    name     : 'William Jones',
    picture  : '/avatars/m-15.png',
    rating   : 10,
    testimony: "My workload feels much more manageable thanks to @Todoku. It's straightforward and incredibly effective. I've never been this productive in my life.",
    verified : true
  },
  {
    date     : new Date('2025-06-29T15:00:00Z'),
    email    : 'ari.s@appuser.id',
    name     : 'Ari Setiawan',
    picture  : '/avatars/m-16.png',
    rating   : 9,
    testimony: 'Sangat direkomendasikan untuk siapa saja yang ingin lebih terorganisir. @Todoku membuat hidup lebih mudah dan ceria. Bahkan saya sudah mengajak teman-teman saya untuk memakainya!',
    verified : true
  }
];

type TestimonyCardProps = ComponentProps<'div'> & {
  readonly data: Testimony
};

const TestimonyCard = ({ className, children, data, ...props }: TestimonyCardProps): JSX.Element => (
  <div {...props} className={cx('shadow-xs testimony-card', className)}>
    <div className="testimony-header">
      <Image alt={data.name} className="testimony-image" height={64} src={data.picture} width={64} />

      <div className="testimony-user">
        <div className="flex items-center gap-2">
          <span className="font-bold">{data.name}</span>{ data.verified ? <PatchCheckIcon className="text-accent" /> : null }
        </div>

        <div className="text-muted-foreground">{data.email}</div>
      </div>
    </div>

    <div className="testimony-rating"><Rating value={data.rating} /></div>
    <div className="testimony-content">{stringReplace(data.testimony, /(?<match>@Todoku)/ug, (m, i) => <Logo key={i} title={m} />) }</div>
    <div className="testimony-date text-muted-foreground">{formatDate(data.date, 'HH:mmaa / dd MMM yyyy')}</div>
  </div>
);

TestimonyCard.displayName = 'TestimonyCard';

const TestimoniesSection = (): JSX.Element => (
  <section className={cx(styles.section)}>
    <div className="section-container relative">
      <div>
        <h1 className="gradient-text text-center">Yang mereka katakan tentang <Logo /></h1>
        <p className="text-muted-foreground text-center!">Review seadanya dari para pengguna setia kami yang selalu apa adanya</p>
      </div>

      <Carousel className="w-full" opts={{ align: 'center' }}>
        <Carousel.Previous />

        <Carousel.Content>
          { testimonials.map((testimony) => (
            <Carousel.Item key={testimony.name} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
              <TestimonyCard data={testimony} />
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <Carousel.Next />
      </Carousel>

    </div>
  </section>
);

TestimoniesSection.displayName = 'TestimoniesSection';

export { TestimoniesSection };
