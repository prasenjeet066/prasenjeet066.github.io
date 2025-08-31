import TextType from '@/components/text-anim';
export default function Content() {
  return (
    <div className='w-full p-4'>
      <div className ='rounded-md bg-white m-4 p-4 w-full flex items-center'>
        

<TextType 
  text={["First, Thanks for coming!", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
  textColors='#11111'
  className='text-lg'
/>
      </div>
    </div>
  )
}