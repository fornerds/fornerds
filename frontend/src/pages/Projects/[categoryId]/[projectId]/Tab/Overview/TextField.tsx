import React from 'react'
import styles from './TextField.module.css'

export function TextField() {
  return (
    <div className={styles.text_field}>
      <TextBox
        title={AboutProject.title}
        description={AboutProject.description}
      />
      <TextBox title={WhatYouWillLearn.title} list={WhatYouWillLearn.list} />
      <TextBox title={TaskDescription.title} list={TaskDescription.list} />
      <TextBox title={BasicRequirements.title} list={BasicRequirements.list} />
      <TextBox title={HowToApply.title} list={HowToApply.list} />
    </div>
  )
}

function TextBox({ title, description, list }: TextBoxProps) {
  return (
    <div className={styles.textBox}>
      <p className={`text-color-lighten font-roboto-header-3`}>{title}</p>
      {description ? (
        <p className={`text-color-lighten font-roboto-body-1`}>
          {description}
        </p>
      ) : null}
      {list
        ? list?.map((str, index) => (
            <li key={index} className={`text-color-lighten font-roboto-body-1`}>
              {str}
            </li>
          ))
        : null}
    </div>
  )
}

interface TextBoxProps {
  title: string
  description?: string
  list?: string[]
}

const AboutProject: TextBoxProps = {
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
const WhatYouWillLearn: TextBoxProps = {
  title: 'What you will learn',
  list: lipsum_sample_text_list
}
const TaskDescription: TextBoxProps = {
  title: 'Task Description',
  list: lipsum_sample_text_list
}
const BasicRequirements: TextBoxProps = {
  title: 'Basic Requirements',
  list: lipsum_sample_text_list
}
const HowToApply: TextBoxProps = {
  title: 'How to Apply',
  list: lipsum_sample_text_list
}
