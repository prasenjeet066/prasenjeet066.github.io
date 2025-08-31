import TextType from '@/components/text-anim';

export default function Content() {
  return (
    <div className="w-full p-6">
      <div className="rounded-xl bg-white  m-4 p-6 w-full flex items-center justify-center">
        <TextType
          text={[
            "Welcome to my portfolio website.",
            "I specialize in AI, Machine Learning, and Deep Learning.",
            "Experienced in Python, Node.js, and PHP.",
            "Skilled with React, Next.js, and modern web development.",
            "Building efficient and scalable applications."
          ]}
          typingSpeed={70}
          pauseDuration={1600}
          deletingSpeed={40}
          showCursor={true}
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
          textColors={["#111111", "#1a1a1a", "#0f172a"]} // professional dark tones
          className="text-lg sm:text-xl font-medium tracking-tight"
        />
      </div>

      {/* Self-contained cursor blink animation */}
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