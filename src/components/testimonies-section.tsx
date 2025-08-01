import { formatDate } from "date-fns";
import Image from "next/image";

import { Carousel } from "@/ui/carousel";
import { ComponentProps } from "react";
import stringReplace from 'react-string-replace';
import { cx } from "@/ui/utils";

import { PatchCheckIcon } from "@/ui/icons";
import { Logo } from "@/components/logo";
import { Rating } from "@/components/rating";

import styles from './testimonies-section.module.scss';

interface Testimony {
  name: string;
  email: string;
  picture: string,
  verified: boolean;
  date: Date;
  rating: number;
  testimony: string;
}

const testimonials: Testimony[] = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    picture: "/avatars/f-01.png",
    verified: true,
    date: new Date("2025-07-28T10:30:00Z"),
    rating: 9,
    testimony: "@Todoku changed my daily routine! I feel so much more organized and less stressed. The cheerful design is a huge plus. Highly recommend it to anyone feeling overwhelmed.",
  },
  {
    name: "Budi Santoso",
    email: "budi.s@mail.com",
    picture: "/avatars/m-01.png",
    verified: true,
    date: new Date("2025-07-27T14:15:00Z"),
    rating: 8,
    testimony: "Aplikasi ini benar-benar membantu saya mengatur jadwal kerja. Antarmukanya intuitif dan sangat menyenangkan dipakai. Jempol!",
  },
  {
    name: "Emily White",
    email: "emily.w@example.org",
    picture: "/avatars/f-02.png",
    verified: false,
    date: new Date("2025-07-26T09:00:00Z"),
    rating: 6,
    testimony: "I'm usually terrible at keeping track of my tasks. The app is okay, but I wish the notifications were a bit more customizable. Still, it's better than sticky notes.",
  },
  {
    name: "Dewi Lestari",
    email: "dewi.l@email.com",
    picture: "/avatars/f-03.png",
    verified: true,
    date: new Date("2025-07-25T11:45:00Z"),
    rating: 10,
    testimony: "Sekarang semua daftar tugas saya rapi di satu tempat. @Todoku bikin saya merasa lebih pegang kendali. Aplikasi ini harusnya masuk ke dalam keajaiban dunia ke-8!",
  },
  {
    name: "Michael Brown",
    email: "michael.b@web.com",
    picture: "/avatars/m-02.png",
    verified: true,
    date: new Date("2025-07-24T16:00:00Z"),
    rating: 7,
    testimony: "Finally, a to-do app that doesn't feel like a chore. @Todoku is intuitive, colorful, and genuinely helpful. Just wish it had a dark mode already!",
  },
  {
    name: "Faisal Rahman",
    email: "faisal.r@id.net",
    picture: "/avatars/m-03.png",
    verified: false,
    date: new Date("2025-07-23T08:30:00Z"),
    rating: 2,
    testimony: "Masih sering lupa rapat penting, sekarang notifikasinya malah telat. Sepertinya aplikasi ini butuh diperbaiki.",
  },
  {
    name: "Jessica Lee",
    email: "jessica.l@mail.us",
    picture: "/avatars/f-03.png",
    verified: true,
    date: new Date("2025-07-22T13:00:00Z"),
    rating: 10,
    testimony: "The best task manager I've ever used. Simple, effective, and it just makes managing my day so much brighter. I feel like the main character of a productivity movie now.",
  },
  {
    name: "Rina Wijaya",
    email: "rina.w@indosat.net",
    picture: "/avatars/f-04.png",
    verified: true,
    date: new Date("2025-07-21T10:10:00Z"),
    rating: 9,
    testimony: "Saya suka bagaimana @Todoku membantu saya fokus. Desainnya juga bikin mood bagus! Tidak sia-sia unduh aplikasi ini.",
  },
  {
    name: "David Chen",
    email: "david.c@company.com",
    picture: "/avatars/m-04.png",
    verified: true,
    date: new Date("2025-07-20T17:00:00Z"),
    rating: 5,
    testimony: "It's a solid app for managing tasks, but it's nothing groundbreaking. It gets the job done, but it could use a few more advanced features.",
  },
  {
    name: "Putri Anggraini",
    email: "putri.a@domain.co",
    picture: "/avatars/f-05.png",
    verified: false,
    date: new Date("2025-07-19T09:40:00Z"),
    rating: 8,
    testimony: "Aplikasi yang sangat membantu untuk ibu rumah tangga seperti saya. Tugas harian jadi lebih terstruktur dan tidak ada yang terlewat.",
  },
  {
    name: "Chris Evans",
    email: "chris.e@provider.com",
    picture: "/avatars/m-05.png",
    verified: true,
    date: new Date("2025-07-18T11:20:00Z"),
    rating: 10,
    testimony: "My productivity has soared since I started using @Todoku. It’s super intuitive and just works. It's so good, I'm pretty sure my boss thinks I'm a superhero now.",
  },
  {
    name: "Agus Dharma",
    email: "agus.d@emailku.com",
    picture: "/avatars/m-06.png",
    verified: true,
    date: new Date("2025-07-17T15:30:00Z"),
    rating: 4,
    testimony: "@Todoku memudahkan saya memantau deadline, tapi seringkali sinkronisasinya agak lambat. Mohon diperbaiki, terima kasih.",
  },
  {
    name: "Olivia Grace",
    email: "olivia.g@service.net",
    picture: "/avatars/f-06.png",
    verified: false,
    date: new Date("2025-07-16T08:00:00Z"),
    rating: 7,
    testimony: "Simple, yet powerful. @Todoku has become my go-to for everything from shopping lists to work assignments. Would be perfect with more color themes.",
  },
  {
    name: "Yoga Pratama",
    email: "yoga.p@server.id",
    picture: "/avatars/m-07.png",
    verified: true,
    date: new Date("2025-07-15T12:00:00Z"),
    rating: 9,
    testimony: "Aplikasi yang ceria dan efektif! Membuat saya semangat menyelesaikan tugas-tugas setiap hari. Tidak ada lagi mager!",
  },
  {
    name: "Liam O'Connell",
    email: "liam.o@example.ie",
    picture: "/avatars/m-08.png",
    verified: true,
    date: new Date("2025-07-14T16:45:00Z"),
    rating: 1,
    testimony: "I've tried adding my tasks but the app keeps crashing. It's more of a distraction than a help. Uninstalled.",
  },
  {
    name: "Siti Nurjanah",
    email: "siti.n@provider.id",
    picture: "/avatars/f-07.png",
    verified: true,
    date: new Date("2025-07-13T09:15:00Z"),
    rating: 10,
    testimony: "Paling suka fitur pengingatnya. Sekarang tidak ada lagi alasan untuk lupa tugas penting. @Todoku juara!",
  },
  {
    name: "Daniel Kim",
    email: "daniel.k@tech.co",
    picture: "/avatars/m-09.png",
    verified: true,
    date: new Date("2025-07-12T14:00:00Z"),
    rating: 8,
    testimony: "Keeps me on track with my university assignments. It's a lifesaver for students! Now if only it could write my papers for me...",
  },
  {
    name: "Aditya Wijoyo",
    email: "aditya.w@mailme.com",
    picture: "/avatars/m-10.png",
    verified: false,
    date: new Date("2025-07-11T10:00:00Z"),
    rating: 6,
    testimony: "Desainnya modern dan warnanya cerah, tapi kadang tampilannya terasa agak ramai. Mungkin bisa lebih minimalis lagi.",
  },
  {
    name: "Chloe Adams",
    email: "chloe.a@cloud.com",
    picture: "/avatars/f-08.png",
    verified: true,
    date: new Date("2025-07-10T13:30:00Z"),
    rating: 9,
    testimony: "My entire team uses @Todoku now. Collaboration is seamless and everyone is more productive. It's a miracle worker!",
  },
  {
    name: "Rizky Ramadhan",
    email: "rizky.r@apps.id",
    picture: "/avatars/m-11.png",
    verified: true,
    date: new Date("2025-07-09T08:45:00Z"),
    rating: 10,
    testimony: "Dulu sering bingung mau mulai dari mana, sekarang @Todoku yang menuntun. Produktivitas meningkat drastis! Saya serasa punya asisten pribadi sekarang.",
  },
  {
    name: "Isabella Garcia",
    email: "isabella.g@global.org",
    picture: "/avatars/f-09.png",
    verified: true,
    date: new Date("2025-07-08T15:00:00Z"),
    rating: 5,
    testimony: "So easy to use, even for someone not tech-savvy. It's helped me organize my life, but I find the calendar integration a bit clunky.",
  },
  {
    name: "Bambang Susilo",
    email: "bambang.s@webmail.id",
    picture: "/avatars/m-12.png",
    verified: false,
    date: new Date("2025-07-07T11:00:00Z"),
    rating: 3,
    testimony: "Saya sering menggunakan @Todoku untuk pekerjaan lepas, tapi sering sekali keluar sendiri. Tolong perbaiki masalah stabilitasnya.",
  },
  {
    name: "Noah Thompson",
    email: "noah.t@solution.com",
    picture: "/avatars/m-13.png",
    verified: true,
    date: new Date("2025-07-06T10:30:00Z"),
    rating: 8,
    testimony: "I appreciate the clean interface and how quickly I can add new tasks. A real time-saver. It's like my brain, but organized.",
  },
  {
    name: "Kartika Sari",
    email: "kartika.s@example.co.id",
    picture: "/avatars/f-10.png",
    verified: true,
    date: new Date("2025-07-05T14:20:00Z"),
    rating: 9,
    testimony: "Tidak menyangka aplikasi to-do list bisa sekeren ini. Membuat pekerjaan rumah tangga jadi lebih terarah dan terasa menyenangkan.",
  },
  {
    name: "Oliver Smith",
    email: "oliver.s@enterprise.net",
    picture: "/avatars/f-11.png",
    verified: true,
    date: new Date("2025-07-04T09:50:00Z"),
    rating: 2,
    testimony: "@Todoku helps me prioritize effectively, but my tasks keep disappearing! This is a major issue and makes the app unusable for me.",
  },
  {
    name: "Joko Pranoto",
    email: "joko.p@server.id",
    picture: "/avatars/m-14.png",
    verified: true,
    date: new Date("2025-07-03T16:10:00Z"),
    rating: 7,
    testimony: "Saya sering menggunakan @Todoku untuk melacak jadwal pertemuan. Sangat efisien, tapi butuh fitur kolaborasi yang lebih baik.",
  },
  {
    name: "Sophia Miller",
    email: "sophia.m@domain.biz",
    picture: "/avatars/f-12.png",
    verified: false,
    date: new Date("2025-07-02T11:30:00Z"),
    rating: 9,
    testimony: "A fun way to stay on top of things! @Todoku really does make productivity feel less like a chore. It's like a game for my brain!",
  },
  {
    name: "Dini Oktaviani",
    email: "dini.o@mailnesia.com",
    picture: "/avatars/f-13.png",
    verified: true,
    date: new Date("2025-07-01T13:45:00Z"),
    rating: 6,
    testimony: "Fitur pengingatnya sangat berguna, tidak pernah ketinggalan janji lagi. Tapi kadang suka ter-reset sendiri, jadi harus dicek ulang.",
  },
  {
    name: "William Jones",
    email: "william.j@data.com",
    picture: "/avatars/m-15.png",
    verified: true,
    date: new Date("2025-06-30T10:00:00Z"),
    rating: 10,
    testimony: "My workload feels much more manageable thanks to @Todoku. It's straightforward and incredibly effective. I've never been this productive in my life.",
  },
  {
    name: "Ari Setiawan",
    email: "ari.s@appuser.id",
    picture: "/avatars/m-16.png",
    verified: true,
    date: new Date("2025-06-29T15:00:00Z"),
    rating: 9,
    testimony: "Sangat direkomendasikan untuk siapa saja yang ingin lebih terorganisir. @Todoku membuat hidup lebih mudah dan ceria. Bahkan saya sudah mengajak teman-teman saya untuk memakainya!",
  },
];

type TestimonyCardProps = ComponentProps<'div'> & {
  readonly data: Testimony
};

const TestimonyCard = ({ className, children, data, ...props }: TestimonyCardProps) => {
  return (
    <div {...props} className={cx("shadow-xs testimony-card", className)}>
      <div className="testimony-header">
        <Image alt={data.name} className="testimony-image" src={data.picture} width={64} height={64} />
        <div className="testimony-user">
          <div className="flex items-center gap-2">
            <span className="font-bold">{data.name}</span>{ data.verified ? <PatchCheckIcon className="text-accent" /> : null }
          </div>
          <div className="text-muted-foreground">{data.email}</div>
        </div>
      </div>
      <div className="testimony-rating"><Rating value={data.rating} /></div>
      <div className="testimony-content">{stringReplace(data.testimony, /(@Todoku)/ug, (m, i) => (<Logo key={i} title={m} />)) }</div>
      <div className="testimony-date text-muted-foreground">{formatDate(data.date, "HH:mmaa / dd MMM yyyy" )}</div>
    </div>
  )
}

const TestimoniesSection = () => {
  return (
    <section className={cx(styles.section)}>
      <div className="section-container relative">
        <div>
          <h1 className="gradient-text text-center">Yang mereka katakan tentang <Logo /></h1>
          <p className="text-muted-foreground text-center!">Review seadanya dari para pengguna setia kami yang selalu apa adanya</p>
        </div>

        <Carousel className="w-full" opts={{ align: 'center' }}>
          <Carousel.Previous />
          <Carousel.Content>
            { testimonials.map((testimony, i) => (
              <Carousel.Item key={i} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                <TestimonyCard data={testimony} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Next />
        </Carousel>

      </div>
    </section>
  )
}

export { TestimoniesSection }
