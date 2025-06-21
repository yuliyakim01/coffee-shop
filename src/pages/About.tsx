import React from 'react';
import yuliyaImg from '@/assets/yuliya.jpg';
import asemImg from '@/assets/asem.jpg';
import giorgi from '@/assets/giorgi.png';
const teamMembers = [
  {
    name: 'Asem',
    role: 'Frontend Developer',
    bio: 'I am a developer who enjoys building web applications and turning ideas into working products. I find energy in collaboration and take pride in writing clean, maintainable code.',
    github: 'https://github.com/assem12345assem',
    image: asemImg,
    contributions: [
      'Integrated Commercetools API',
      'Wrote unit tests',
      'Implemented product listing features including search, sorting, filtering, and pagination',
      'Implemented cart functionality, including adding and removing items',
      'Developed password reset flow',
      'Implemented user registration and login functionality (excluding UI design)',
    ],
  },
  {
    name: 'Giorgi Khoshtaria',
    role: 'Frontend Developer',
    bio: 'I am a frontend developer with a strong focus on building beautiful, responsive, and performant web applications using React and TypeScript.',
    github: 'https://github.com/Giorgi-Khoshtaria',
    image: giorgi,
    contributions: [
      'Designed and developed all responsive UI components, ensuring a consistent and polished user experience across devices',
      'Led the overall visual design and UX direction of the application',
      'Built key application pages from the ground up, including the main page, catalog, cart, and core layout elements like header and footer',
      'Implemented interactive elements such as image, product, and review sliders to enhance user engagement',
      'Integrated essential app functionality including logout and client-side routing',
      'Contributed significantly to the app’s look, feel, and usability — shaping the product experience as it is today',
    ],
  },
  {
    name: 'Yuliya Kim',
    role: 'Frontend Developer',
    bio: '"I am a frontend developer with a background in CS and Psychology. I enjoy building user-friendly interfaces with a focus on accessibility and inclusive design."',
    github: 'https://github.com/yuliyakim01',
    image: yuliyaImg,
    contributions: [
      'Wrote documentation and deployment checklist',
      'Designed login and registration pages with validation',
      'Implemented detailed product page using the commercetools API',
      'Built category breadcrumb and filtering navigation',
      'Styled and structured the About page',
      'Implemented increasing/decreasing product quantity in cart and clearing shopping cart',
    ],
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-lightCream min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-Temptress mb-8 text-center">Meet the React Coffee Team</h1>

      <p className="max-w-3xl mx-auto text-center text-brown mb-12">
        Welcome to the team behind React Coffee - an entirely student built eCommerce coffee shop dedicated to
        showcasing our Frontend Development skills in design, coding and collaboration. Over several months of intensive
        training, coding and learning, we have stayed commited to finishing the RS School JavaScript/Front End Course
        strong. React Coffee came about as the final project of the course, where we had the chance to apply everything
        we learned in a real-world scenario.
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {teamMembers.map((member) => (
          <div key={member.name} className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-Temptress">{member.name}</h3>
            <p className="text-sm text-brown mb-2 italic">{member.role}</p>
            <p className="text-sm text-gray-600 mb-4">{member.bio}</p>

            <ul className="text-sm text-left mb-4 list-disc list-inside text-brown">
              {member.contributions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-LightTaupe underline hover:text-rustBrown"
            >
              GitHub Profile ↗
            </a>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold text-Temptress mb-4">Our Collaboration</h2>
        <p className="text-brown text-base">
          Despite being few in number, our team collaborated consistently and thoughtfully to deliver a polished
          eCommerce platform. From API integration to UI/UX design, we tackled every challenge with persistence and
          creativity.
        </p>
      </div>
    </div>
  );
};

export default About;
