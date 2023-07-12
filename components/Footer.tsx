import Image from 'next/image'
import React from 'react'
import "../app/Styles/Footer.css"
import { footerLinks } from '@/constants'


type ColumnProps = {
  title: string;
  Links: Array<string>;
}
const FooterColumn = ({title,Links} : ColumnProps) =>(
  <div className='footer_column'>
     <h4 className='font-semibold'>Title</h4>
     <ul className='flex flex-col gap-2 font-normal'>
      Links
     </ul>
  </div>
)

const Footer = () => {
  return (
    <footer className='flexStart padding-custom01 footer footer-main-class'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <Image src="/logo-purple.svg" width={115} height={38} alt="Cretiva logo" />
          <p className='text-start text-sm font-normal mt-5 max-w-xs'>
             Cretiva lets u upload your cretive work.
          </p>
        </div>

        <div className='flex flex-wrap gap-12'>
          <FooterColumn title={footerLinks[0].title} Links={footerLinks[0].links}/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
