import profilePicsDA from '@/assets/danh.jpg'
import profilePicsHWAN from '@/assets/Hwan.png'
import profilePicsTD from '@/assets/trongdung.jpg'
import profilePicsBN from '@/assets/catava.jpg'
import profilePicsHH from '@/assets/hhoang.png'

interface TeamMemberProps {
    image: string;
    name: string;
    jobTitle: string;
}

const backendMembers = [
  { name: 'Do Duc Anh', jobTitle: 'Backend Dev', image: profilePicsDA},
  { name: 'La Huy Hoang', jobTitle: 'Backend Developer', image: profilePicsHH },
  { name: 'Luu Trong Dung', jobTitle: 'AI Developer', image: profilePicsTD },
]

const frontendMembers = [
  { name: 'Lam Quoc Hung', jobTitle: 'Frontend Developer', image: profilePicsHWAN },
  { name: 'Thai Bao Nhan', jobTitle: 'Frontend Developer', image: profilePicsBN },
]

function TeamMember({ name, jobTitle, image}: TeamMemberProps) {
  return (
    <div className="flex flex-col">
      <img src={image} alt={name} className="w-[300px] rounded-lg shadow-xl" />
      <div className="text-start">
        <h1 className="text-[2rem] font-semibold mt-2">{name}</h1>
        <p className="text-[1.5rem] font-normal">{jobTitle}</p>
      </div>
    </div>
  )
}

export default function TeamImage() {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {backendMembers.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
      <div className="col-span-3 flex justify-center gap-10">
            {frontendMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
            ))}
      </div>
    </div>
  )
}