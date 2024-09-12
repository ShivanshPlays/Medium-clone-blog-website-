// seed.js
import {PrismaClient} from "@prisma/client"
// const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Example: Creating some users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'alice@example.com',
        name: 'Alice Johnson',
        password: 'hashedpassword1',
        punchline: "Dream big, work hard.",
      },
      {
        email: 'bob@example.com',
        name: 'Bob Smith',
        password: 'hashedpassword2',
        punchline: "Make the impossible possible.",
      },
      {
        email: 'carol@example.com',
        name: 'Carol White',
        password: 'hashedpassword3',
        punchline: "Embrace the journey.",
      },
      {
        email: 'dave@example.com',
        name: 'Dave Black',
        password: 'hashedpassword4',
        punchline: "Innovate and elevate.",
      },
      {
        email: 'eve@example.com',
        name: 'Eve Green',
        password: 'hashedpassword5',
        punchline: "Code to inspire.",
      },
    ],
  });

  console.log('Users created:', users);

  // Seed Posts

  const userData = await prisma.user.findMany();

  const blogs= [
    {
      title: 'From Banker to Coder: A Career Switch Story',
      content: `Switching from banking to coding was one of the scariest yet most rewarding decisions of my life. I spent years crunching numbers, but I always felt a pull towards technology. After much deliberation, I decided to take the leap and enrolled in a coding bootcamp. The initial weeks were tough—imposter syndrome hit hard! But as I persisted, things started clicking. Now, as a software developer, I feel a sense of accomplishment that I never felt before. The journey was challenging, but it taught me that it's never too late to pursue your passion.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'Building My First Startup: The Highs and Lows',
      content: `Starting my own tech startup was a rollercoaster ride filled with both exhilarating highs and challenging lows. I began with a simple idea—to make data analytics more accessible to small businesses. With a shoestring budget and a small team, we dove headfirst into development. There were sleepless nights, failed pitches, and moments of doubt. But there were also breakthroughs, moments of sheer joy, and the incredible feeling of seeing our product come to life. It’s been a tough but fulfilling journey, and I’ve learned that resilience is the key to navigating the unpredictable world of startups.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'My First Open Source Contribution: A Lesson in Community',
      content: `Contributing to an open-source project was something I had always wanted to do, but the fear of rejection held me back. One day, I decided to go for it and found a project I was passionate about. After weeks of tinkering, I submitted my first pull request. To my surprise, the community was incredibly welcoming and supportive. I learned so much, not just about coding, but about collaboration and the spirit of open source. It felt amazing to give back, and it sparked a desire to continue contributing to projects that make a difference.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'Overcoming Burnout: My Personal Journey',
      content: `I hit a wall last year. Juggling multiple projects, endless deadlines, and high expectations, I found myself mentally and physically exhausted. I realized I was burnt out—a term I had heard but never fully understood until I experienced it myself. I took a step back, sought help, and made significant lifestyle changes. I started practicing mindfulness, set strict work boundaries, and prioritized self-care. It wasn’t an overnight recovery, but I’m now healthier, happier, and more productive than ever. Remember, it's okay to step back and take care of yourself—you can’t pour from an empty cup.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'Remote Work: A Blessing in Disguise',
      content: `When the world shifted to remote work, I was skeptical. How could we maintain productivity without the office environment? But soon, I found that working remotely gave me a sense of freedom and flexibility I never knew I needed. I could manage my time better, spend more moments with my family, and even explore new hobbies. It wasn't without its challenges—like feeling isolated at times—but overall, it taught me how to create a balance that worked for me. Remote work isn’t just a trend; it’s a transformation in how we approach life and work.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'From Failure to Success: My Coding Bootcamp Experience',
      content: `I failed. Not once, but multiple times, during my coding bootcamp. I felt like I didn’t belong, surrounded by people who seemed to pick things up so quickly. But I decided to stick with it, knowing that failure was just a part of the learning process. I asked for help, participated in study groups, and put in extra hours. Slowly but surely, things started to make sense, and I began to thrive. By the end of the bootcamp, I had built an app that won our class hackathon. Failure is not the opposite of success; it's part of it.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'Learning to Code in My 40s: My Experience',
      content: `Deciding to learn how to code in my 40s was intimidating. I felt like I had missed the boat, like coding was a young person's game. But my curiosity and desire to solve problems pushed me to start. I signed up for online courses, joined local coding communities, and sought out mentors. It wasn’t easy, and I had to balance this new passion with my day job and family commitments. But each small win—each "Aha!" moment—reminded me that age is just a number. It’s never too late to learn something new.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'Why I Left My High-Paying Job for a Non-Profit',
      content: `Leaving a high-paying tech job to join a non-profit seemed like a crazy decision to many. But I felt unfulfilled, craving a sense of purpose beyond just making money. At the non-profit, I began working on projects that had a real impact on people’s lives, from building educational platforms to creating tools for underserved communities. The work was challenging, and the resources were limited, but the joy and fulfillment I found in making a difference was priceless. Sometimes, the best career move isn’t about moving up the ladder but moving toward what truly matters.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'The Day I Got Hacked: A Wake-Up Call',
      content: `I'll never forget the day I got hacked. I was a few months into my first job as a junior developer when I accidentally pushed sensitive credentials to a public repository. Within hours, our system was compromised. I felt devastated and responsible. It was a harsh but invaluable lesson in security. With the support of my team, I quickly learned about best practices like using environment variables, rotating credentials, and setting up proper monitoring. It was a painful experience, but it shaped me into a more cautious and security-conscious developer.`,
      published: true,
      date: new Date().toDateString(),
    },
    {
      title: 'The Power of Mentorship in Tech',
      content: `When I started in tech, I was fortunate enough to have a mentor who guided me through my early days. From reviewing my code to providing career advice, my mentor was a lighthouse in the fog of my confusion. This experience taught me the power of mentorship—not just in learning new skills, but in building confidence and navigating the complex landscape of a tech career. Now, I try to pay it forward by mentoring others. Tech is constantly evolving, but the support and guidance of a good mentor remain invaluable.`,
      published: true,
      date: new Date().toDateString(),
    }
  ]
  
  for (let i = 0; i < userData.length; i++) {
    const user = userData[i];

    // Assign 2 blogs per user
    const userBlogs = blogs.slice(i * 2, i * 2 + 2).map(blog => ({
      ...blog,
      authorId: user.id
    }));

    // Create posts for each user
    for (const blog of userBlogs) {
      await prisma.post.create({
        data: blog,
      });
    }
  }

  console.log('Posts created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
