
import Image from 'next/image';
import { SquareArrowOutUpRight } from 'lucide-react';
import { ExternalLink } from "lucide-react";

interface Props {
  text: string;
}

export  function HashtagHighlighter({ text }: Props) {
  // Regex: #hashtag | @mention | URL
  const regex = /(#\w+)|(@\w+)|(https?:\/\/[^\s]+)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // আগের normal text যোগ করা
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, match.index),
      });
    }

    // কোনটা match হয়েছে সেটা check করা
    if (match[1]) {
      parts.push({ type: "hashtag", value: match[1] });
    } else if (match[2]) {
      parts.push({ type: "mention", value: match[2] });
    } else if (match[3]) {
      parts.push({ type: "url", value: match[3] });
    }

    lastIndex = regex.lastIndex;
  }

  // বাকিটা add করা (যদি শেষে normal text থাকে)
  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return (
    <span className="leading-relaxed font-['Lora'] first-line:tracking-widest first-letter:text-[20px] lta">
      {parts.map((part, i) => {
        switch (part.type) {
          case "hashtag":
            return (
              <a
                key={i}
                href={`/tags/${part.value.substring(1)}`}
                className="text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                {part.value}
              </a>
            );
          case "mention":
            return (
              <a
                key={i}
                href={`/user/${part.value.substring(1)}`}
                className="text-purple-600 font-semibold hover:text-purple-800 transition"
              >
                {part.value}
              </a>
            );
          case "url":
            return (
              <a
                key={i}
                href={part.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-600 underline hover:text-green-800 transition"
              >
                {part.value} <ExternalLink className="w-3 h-3" />
              </a>
            );
          default:
            return <span key={i}>{part.value}</span>;
        }
      })}
    </span>
  );
}
export default function Content() {
  let details = "Hello! I’m a passionate web developer and AI enthusiast with a love for creating innovative digital experiences. Over the years, I’ve honed my skills in #Python, #JavaScript, #Node.js , #React, #PHP, and #Laravel, building projects that are both efficient and user-friendly. But my curiosity doesn’t stop at web development—I’m deeply interested in Machine Learning and Deep Learning, using frameworks like PyTorch and #TensorFlow to develop intelligent solutions that can learn, adapt, and make a real impact. I enjoy taking complex problems and breaking them down into simple, elegant solutions, whether it’s designing a seamless user interface or implementing a powerful backend system. What excites me the most is exploring new technologies, experimenting with ideas, and continuously improving my craft. Every project I work on is an opportunity to combine creativity, logic, and technical skill, delivering products that are not only functional but meaningful. I believe in writing clean, scalable code, collaborating effectively, and building applications that people enjoy using. For me, development is not just a profession—it’s a way to solve problems, bring ideas to life, and contribute to the world of technology in a meaningful way."
  details = details.slice(0,550) + "..."
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8 px-4 md:px-12 py-6">
      
      {/* Text Section with gradient background */}
      <div className="flex-1 w-full flex flex-col items-start gap-4 p-6 rounded-xl">
        
<figure class="max-w-screen-md mx-auto text-center">
    <svg class="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
    <blockquote>
        <p class="text-2xl italic font-medium text-gray-900 dark:text-white font-['Lora']">{details.slice(0,250)+" ....."}</p>
    </blockquote>
    <figcaption class="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
        <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture"/>
        <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <cite class="pe-3 font-medium text-gray-900 dark:text-white">Michael Gough</cite>
            <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">CEO at Ry+</cite>
        </div>
    </figcaption>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-2 text-md hover:bg-gray-800 transition">
          Hire me
          <SquareArrowOutUpRight className="w-4 h-4" />
        </button>
</figure>

      </div>

      {/* Image Section */}
      <div className="flex-1 relative w-full h-[400px] shadow-[6px_6px_0px_-3px_rgba(0,_0,_0,_1)]">
        <Image
          src="/img/pf.png"
          alt="Profile picture of Prasenjeet Howlader"
          placeholder="blur"
          fill
          className="object-cover"
        />
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        span[style*="animation: blink"] {
          animation: blink 0.6s infinite;
        }
      `}</style>
    </div>
  );
}