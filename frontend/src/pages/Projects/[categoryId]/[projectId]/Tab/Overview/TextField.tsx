import React from 'react'
import styles from './TextField.module.css'
import { TextContent } from '../../../../../../components/ModuleComponent'
import { TextContentProps } from '../../../../../../components/ModuleComponent/Details/Overview/TextContent/TextContentProps'

export function TextField() {
  return (
    <div className={styles.text_field}>
      <TextContent
        title={AboutProject.title}
        description={AboutProject.description}
      />
      <TextContent
        title={WhatYouWillLearn.title}
        list={WhatYouWillLearn.list}
      />
      <TextContent title={TaskDescription.title} list={TaskDescription.list} />
      <TextContent
        title={BasicRequirements.title}
        list={BasicRequirements.list}
      />
      <TextContent title={HowToApply.title} list={HowToApply.list} />
    </div>
  )
}

const AboutProject: TextContentProps = {
  title: 'What you will learn',
  description: `Lorem ipsum dolor sit amet consectetur. 
  Volutpat sit purus posuere laoreet dolor gravida curabitur. 
  Sapien tristique curabitur risus neque vulputate. 
  Id pellentesque nunc leo proin tortor. 
  Maecenas proin est nisi auctor vel eget tortor sagittis. 
  Tortor at ullamcorper purus ut nulla posuere eget tincidunt ipsum. 
  Semper egestas ullamcorper convallis mi quis suspendisse mauris. 
  Et arcu nunc ante nunc ut gravida dolor faucibus. 
  Curabitur id id eros donec morbi. 
  Lacus rutrum lorem magna tellus.
  `
}
const lipsum_sample_text_list = [
  'Lorem ipsum dolor sit amet consectetur',
  'Volutpat sit purus posuere laoreet dolor gravida curabitur',
  'Sapien tristique curabitur risus neque vulputate',
  'Maecenas proin est nisi auctor vel eget tortor sagittis'
]
const WhatYouWillLearn: TextContentProps = {
  title: 'What you will learn',
  list: lipsum_sample_text_list
}
const TaskDescription: TextContentProps = {
  title: 'Task Description',
  list: lipsum_sample_text_list
}
const BasicRequirements: TextContentProps = {
  title: 'Basic Requirements',
  list: lipsum_sample_text_list
}
const HowToApply: TextContentProps = {
  title: 'How to Apply',
  list: lipsum_sample_text_list
}
