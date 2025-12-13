import ThemeLogo from "@/components/ThemeLogo";

const person = {
  firstName: "Sami",
  middleName: "ullah",
  lastName: "Javed",
  get name() {
    return `${this.firstName}${this.middleName} ${this.lastName}`;
  },
  role: "Software Developer & Future Founder",
  avatar: "/images/avatar.jpg",
  email: "samiullahjavedd@gmail.com",
  current_location: "Sukkur, Pakistan",
  location: "Asia/Karachi",
  languages: ["English", "Urdu"],
};

const newsletter = {
  display: false,
  title: <>Subscribe for random emails</>,
  description: (
    <>
      I might email you someday (if it's important)
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/sam1-khan",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/samiullahjaved",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/image.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website of ${person.name}, showcasing their work, skills, education and professional work experience as a ${person.role}`,
  headline: <>Making lives easier by solving problems</>,
  featured: {
    display: true,
    title: <>Let's connect!</>,
    href: "https://www.linkedin.com/in/samiullahjaved", // Update with actual project link if available
  },
  subline: (
    <>
      Assalamualaikum👋, I'm Sami, a software developer at <ThemeLogo />. I love making products that solve actual problems.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.current_location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        After messing around and learning different stuff, I have acquired hands‑on experience with both Python and JavaScript, particularly, NextJS,
        ReactJS, Typescript, Django, Django Ninja, Flask and many more things that I won’t be able to fit here. I have a good understanding and experience
        of version control and deployments and, not to forget, I have created many N8N automation flows and used AI for different use cases, worked with
        Supabase, Strapi CMS, different UI libraries(Shadcn, Chakra, AntDesign etc.), also tried app development with Expo and didn’t like it
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Devkind",
        timeframe: "Jul. 2025 - Present",
        role: "Software Developer",
        achievements: [
          <>Built a plug-and-play checkout for Swell stores using Cloudflare KV, Easyblocks, and NextJS, featuring a no-code editor for UI customisation.</>,
          <>Optimised the core checkout logic from 3 steps to 1, reducing friction and increasing completion rates by approximately 35%.</>,
          <>Delivered 6+ client projects end-to-end, managing design, backend, frontend implementation, and deployment.</>,
          <>Mentored an intern through code reviews and task delegation to ensure timely and effective task completion.</>,
        ],
        images: [],
      },
      {
        company: "Devkind",
        timeframe: "Mar. 2025 - Jun. 2025",
        role: "Developer Intern",
        achievements: [
          <>Reworked a legacy website with a modern, sleek design, improving SEO and UX, which directly increased organic traffic, sales leads and decreased paint time from 172 ms to 30 ms.</>,
          <>Standardised AI usage by creating a database of specialised prompts, reducing API token costs by 30%, and ensuring code consistency.</>,
          <>Automated marketing workflows using N8N and Slack, saving the team 10+ hours of manual work weekly.</>,
        ],
        images: [],
      },
      {
        company: "Samiullah Arif Enterprises (SAE)",
        timeframe: "Nov. 2024 - Apr. 2025",
        role: "Full-stack Freelance Developer",
        achievements: [
          <>Built a custom invoicing system using Django Ninja and NextJS that had processed over 20,000,000 PKR in transactions.</>,
          <>Iterated on the product based on real-time client feedback to handle different scenarios and 4+ new feature requests.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Islamia Government Science College Sukkur",
        description: <>Intermediate in Computer Science (Aug. 2024 - Expected 2026)</>,
      },
      {
        name: "APWA Excellent World School Sukkur",
        description: <>
          Primary & High School (Apr. 2014 - Aug. 2024)
          <br />1st position in Annual Examination 2022
          <br />2nd position in Annual Examination 2020-21
        </>,
      },
    ],
  },
  skills: {
    display: true,
    title: "Skills",
    categories: [
      {
        name: "Languages",
        items: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "PHP", "Elixir"],
      },
      {
        name: "Databases",
        items: ["PostgreSQL", "MySQL", "SQLite"],
      },
      {
        name: "Frameworks",
        items: ["NextJS", "ReactJS", "NodeJS", "Django", "Django Ninja", "Flask", "React Native", "Expo", "Laravel"],
      },
      {
        name: "UI",
        items: ["ShadcnUI", "ChakraUI", "MaterialUI", "OnceUI", "Ant Design", "Shopify Polaris"],
      },
      {
        name: "Tools",
        items: ["N8N", "Docker", "Supabase", "Redis", "Strapi", "Stripe", "Clerk", "Agno"],
      },
    ]
  },
  technical: {
    display: true,
    title: "Certifications",
    skills: [
      {
        title: "Python 3 Programming",
        description: <>Specialization in Python programming (University of Michigan, Aug. 2024)</>,
        images: [],
        link: "https://www.coursera.org/account/accomplishments/specialization/QD9YGUEAT2P7",
      },
      {
        title: "Django for Everybody",
        description: <>Web application development with Django (University of Michigan, Oct. 2024)</>,
        images: [],
        link: "https://www.coursera.org/account/accomplishments/specialization/RKJ9K8JLME9M",
      },
      {
        title: "SQL for Data Science",
        description: <>SQL fundamentals and data science applications (UC Davis, Mar. 2025)</>,
        images: [],
        link: "https://www.coursera.org/account/accomplishments/verify/L2PNKKAY8YZH",
      },
      {
        title: "Version Control with Git",
        description: <>Git fundamentals and best practices (Atlassian, Aug. 2024)</>,
        images: [],
        link: "https://www.coursera.org/account/accomplishments/verify/DQ6FW6GSKSJO",
      },
      {
        title: "CS50x",
        description: <>CS fundamentals and programming (Harvard University, Jun. 2024)</>,
        images: [],
        link: "https://certificates.cs50.io/96c90c9d-1fb7-4699-85a0-ed932f005519.pdf?size=letter",
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about life, learnings, and lessons ✍️",
  description: `Read what ${person.name} has been up to recently`,
};

const guestbook = {
  path: "/guestbook",
  label: "Guestbook",
  title: `Say hi👋 to fellow passersby`,
  description: `How was you stay here? Leave a comment👇`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `A showcase of software, automation, and web projects by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, guestbook, work, gallery };
