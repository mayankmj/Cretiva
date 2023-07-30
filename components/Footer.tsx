import Image from 'next/image'
import React from 'react'
import "../app/Styles/Footer.css"
import { footerLinks } from '@/constants'
import Link from 'next/link'

// defination of type
type ColumnProps = {
  title: string;
  Links: Array<string>;
}
// title.Links are of type of ColumnProps
const FooterColumn = ({title,Links} : ColumnProps) =>(
  <div className='footer_column'>
     <h4 className='font-semibold'>{title}</h4>
     <ul className='flex flex-col gap-2 font-normal'>
      {Links.map((link) =><Link key={link} href="/">
        {link}
      </Link>)}
     </ul>
  </div>
)

const Footer = () => {
  const footerLogoStyle = {
    margin:'10px',
  }
  return (
    <footer className='flexStart padding-custom01 footer footer-main-class'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <Image style={footerLogoStyle} src="/logo-purple.svg" width={115} height={38} alt="Cretiva logo" />
          <p style={{margin: '10px'}} className='text-start text-sm font-normal mt-5 max-w-xs'>
             Cretiva lets u upload your cretive work.
          </p>
        </div>

        <div className='flex flex-wrap gap-12'>
          <FooterColumn title={footerLinks[0].title} Links={footerLinks[0].links}/>

           <div className='flex-1 flex flex-col gap-4'>
             <FooterColumn title={footerLinks[1].title} Links={footerLinks[1].links}/>
             <FooterColumn title={footerLinks[2].title} Links={footerLinks[2].links}/>
           </div>
            <div className='flex-1 flex flex-col gap-4'>
             <FooterColumn title={footerLinks[3].title} Links={footerLinks[3].links}/>
              <FooterColumn title={footerLinks[4].title} Links={footerLinks[4].links}/>
           </div>

           <div className='flex-1 flex flex-col gap-4'>
             <FooterColumn title={footerLinks[5].title} Links={footerLinks[5].links}/>
              <FooterColumn title={footerLinks[6].title} Links={footerLinks[6].links}/>
           </div>

        </div>
       
      </div>
      {/* last div of copyright and no of projects being uploaded till date */}
      <div className='flexBetween footer_copyright'>
         <p>@ 2023 Cretiva. Made by Mayank Johari :) </p>
         <p className='text-gray'>
          <span className='text-black font-semibold'>10,000 </span>
          Projects Submitted
         </p>
      </div>
    </footer>
  )
}
export default Footer
