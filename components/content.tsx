import TextType from '@/components/text-anim';
export default function Content() {
  return (
    <div className='w-full p-4'>
      <div className ='rounded-md bg-white p-4'>
        

<TextType 
  text={["First, Thanks for coming!", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
      </div>
    </div>
  )
}