import TextType from '@/components/text-anim';
import Image from 'next/image';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function Content() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8 px-4 md:px-12 py-6">
      
      {/* Text Section with gradient background */}
      <div className="flex-1 w-full flex flex-col items-start gap-4 p-6 rounded-xl bg-gradient-to-b from-transparent to-white">
        <TextType
          text={[
            "Python",
            "JavaScript",
            "Node.js",
            "React.js",
            "Next.js",
            "PHP",
            "Laravel",
            "Machine Learning",
            "Deep Learning",
            "PyTorch",
            "TensorFlow",
            "Data Analysis",
            "Web Development",
            "API Development",
            "Database Design",
          ]}
          typingSpeed={70}
          deletingSpeed={40}
          pauseDuration={1600}
          showCursor
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
          textColors={["#111111", "#1a1a1a", "#0f172a"]}
          className="text-lg sm:text-xl font-medium tracking-tight"
        />
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-2 text-md hover:bg-gray-800 transition">
          Hire
          <SquareArrowOutUpRight className="w-5 h-5" />
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1 relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
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