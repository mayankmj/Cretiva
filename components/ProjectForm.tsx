"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import {ChangeEvent,useState} from "react"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import Button from "./Button"

type Props ={
    type: string,
    session: SessionInterface,
}

const ProjectForm = ({type, session}: Props) => {
    const handleFormSubmit = (e: React.FormEvent) =>{};
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();

        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')){
            return alert('Please upload the image file');
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () =>{
            const result = reader.result as string;

            handleStateChange('image',result);
        }
    };
    const handleStateChange = (fieldName: string, value:string) =>{
        setform((prevState) => ({...prevState,[fieldName]:value}))
    }
    
    const [isSubmitting, setisSubmitting] = useState(false)
    const [form, setform] = useState({
        title:'',
        description:'',
        image:'',
        liveSiteUrl:'',
        githubUrl:'',
        category:'',
    })

   
  return (
    <form
    onSubmit={handleFormSubmit}
    className="flexStart form"
    >
        <div className="flexStart form_image-container">
            <label htmlFor="poster" className="flexCenter form_image-label">
                {!form.image && 'Choose a poster for your project'}
            </label>
            <input 
              id="image"
              type="file"
              accept="image/*" // * means all images
              required = {type === 'create'}
              className="form_image-input"
              onChange={handleChangeImage} 
              />
              {form.image && (
                <Image 
                  src={form?.image}
                  className="sm:p-10 object-contain z-20"
                  alt="project psoter"
                  fill
                  />
              )}
        </div>

        <FormField 
          title="Title"
          state={form.title}
          placeholder="Flexible"
          setState ={(value) => handleStateChange('title',value)}
          />

           <FormField 
          title="Description"
          state={form.description}
          placeholder="Showcase your work"
          setState ={(value) => handleStateChange('description',value)}
          />

           <FormField 
           type="url"
          title="Deployed Link"
          state={form.liveSiteUrl}
          placeholder="Enter Deployed Link"
          setState ={(value) => handleStateChange('liveSiteUrl',value)}
          />

           <FormField 
           type="url"
          title="GitHub Url"
          state={form.githubUrl}
          placeholder="Lets Connect with Github"
          setState ={(value) => handleStateChange('githubUrl',value)}
          />

        {/* customer category */}
        <CustomMenu 
          title="Category"
          state={form.category}
          filters = {categoryFilters}
          setState={(value) => handleStateChange('category',value)}
        />

        <div className="flexStart w-full">
            <Button
             title ='create'
             type="submit"
             leftIcon = {isSubmitting?"" :'/plus.svg'}
             isSubmitting = {isSubmitting}
             />
        </div>
    </form>
  )
}

export default ProjectForm