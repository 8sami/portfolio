import ThemeLogo from "@/components/ThemeLogo";

const person = {
  firstName: "Sami",
  middleName: "ullah",
  lastName: "Javed",
  get name() {
    return `${this.firstName}${this.middleName} ${this.lastName}`;
  },
  role: "Software Developer",
  avatar: "/images/avatar.jpg",
  email: "samikhan15262822@gmail.com",
  current_location: "Sukkur, Pakistan",
  location: "Asia/Karachi",
  languages: ["English", "Urdu"],
};

const newsletter = {
  display: true,
  title: <>Stay in the Loop with {person.firstName}'s Insights</>,
  description: (
    <>
      Get the latest on software, automation, and creative coding. I share hands-on tips, project stories, and the occasional deep dive into tech and productivity.
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
    link: "https://www.linkedin.com/in/sam1-khan",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Showcasing my journey as a ${person.role}`,
  headline: <>Making lives easier by solving problems</>,
  featured: {
    display: true,
    title: <>Let's connect!</>,
    href: "https://www.linkedin.com/in/sam1-khan", // Update with actual project link if available
  },
  subline: (
    <>
      Assalamualaikum👋, I'm Sami, a software developer at <ThemeLogo/>. I love making products that solve actual problems.
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
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Young, ambitious, and always curious. I'm a computer science student and software developer with a knack for both front-end and back-end. I love building products that make life easier, whether it's automating workflows or crafting seamless user experiences. I believe in learning by doing.
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
          <>Maintaining and implementing new features in existing projects.</>,
          <>Developing full-stack web applications for clients with the help of AI.</>,
        ],
        images: [],
      },
      {
        company: "Devkind",
        timeframe: "Mar. 2025 - Jun. 2025",
        role: "Developer Intern",
        achievements: [
          <>Contributed to projects from requirements gathering to deployment.</>,
          <>Developed and maintained full-stack applications using Next.js, React, Refine, Supabase, and Strapi CMS.</>,
          <>Built n8n automation workflows for data extraction, processing, and business operations.</>,
          <>Implemented e-commerce features including Stripe integration, authentication, and checkout flows.</>,
          <>Successfully delivered multiple projects independently under supervision.</>,
        ],
        images: [],
      },
      {
        company: "Samiullah Arif Enterprises (SAE)",
        timeframe: "Nov. 2024 - Present",
        role: "Freelance Developer",
        achievements: [
          <>Developing a full-stack invoice generator web app for a procurement service provider, streamlining their billing process.</>,
          <>Built the backend using Django and Django Ninja for REST API endpoints, ensuring scalability and maintainability.</>,
          <>Designing the frontend with Next.js, TypeScript, and Shadcn UI for a responsive, user-friendly interface.</>,
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
        description: <>Intermediate in Computer Science (Aug. 2024 - Present)</>,
      },
      {
        name: "APWA Excellent World School Sukkur",
        description: <>
          Primary & High School (Apr. 2014 - Aug. 2024)
          <br/>1st position in Annual Examination 2022
          <br/>2nd position in Annual Examination 2020-21
        </>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills & Certifications",
    skills: [
      {
        title: "Next.js & React",
        description: <>Building modern web apps with Next.js, React, Supabase, and Strapi CMS.</>,
        images: [],
      },
      {
        title: "Automation & n8n",
        description: <>Workflow automation, data extraction, and business process automation using n8n.</>,
        images: [],
      },
      {
        title: "Python 3 Programming",
        description: <>Specialization in Python programming (University of Michigan, Aug. 2024)</>,
        images: [],
      },
      {
        title: "Django for Everybody",
        description: <>Web application development with Django (University of Michigan, Oct. 2024)</>,
        images: [],
      },
      {
        title: "SQL for Data Science",
        description: <>SQL fundamentals and data science applications (UC Davis, Mar. 2025)</>,
        images: [],
      },
      {
        title: "Version Control with Git",
        description: <>Git fundamentals and best practices (Atlassian, Aug. 2024)</>,
        images: [],
      },
      {
        title: "CS50x",
        description: <>CS fundamentals and programming (Harvard University, Jun. 2024)</>,
        images: [],
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
