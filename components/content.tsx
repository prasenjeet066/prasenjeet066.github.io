import TextType from '@/components/text-anim';
import Image from 'next/image';


export default function Content() {
  return (
    <div className="w-full p-6 flex flex-col md:flex-row items-center gap-8">
      
      {/* Text Section with gradient background */}
      
      <div className="text-xl">
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
            "Database Design"
          ]}
          typingSpeed={70}
          pauseDuration={1600}
          deletingSpeed={40}
          showCursor={true}
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
          textColors={["#111111", "#1a1a1a", "#0f172a"]}
          className="text-lg sm:text-xl font-medium tracking-tight"
        />
      </div>

      {/* Image Section */}
      <div className="flex-1 relative w-full h-[400px] md:h-[500px]">
        <Image
          src={'/img/pf.png'}
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