import React from 'react'
import styles from './Contact.module.css'
import { Footer, Header } from '../../components/ModuleComponent'
import backgroundTop from '../../assets/images/background/background03.webp'
import { Button, Input } from '../../components/AtomComponent'

export function Contact() {
  return (
    <>
      <div className={styles.background}>
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${backgroundTop})` }}
        ></div>
        <div className={styles.content}>
          <Header />
          <main className={styles.main}>
            <h2 className="font-pixellari-header-3 text-color-lighten">
              Always welcome to chat
            </h2>
            <form className={styles.form}>
              <section className={styles.inputs}>
                <div className={styles.inputWrap}>
                  <label
                    htmlFor="name"
                    className="font-roboto-cta-small text-color-lighten"
                  >
                    Name
                  </label>
                  <Input
                    className={styles.input}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Add to the name"
                  ></Input>
                </div>
                <div className={styles.inputWrap}>
                  <label
                    htmlFor="email"
                    className="font-roboto-cta-small text-color-lighten"
                  >
                    Email
                  </label>
                  <Input
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Add to the email"
                  ></Input>
                </div>
                <div className={styles.inputWrap}>
                  <label
                    htmlFor="subject"
                    className="font-roboto-cta-small text-color-lighten"
                  >
                    Subject
                  </label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    name="subject"
                    id="subject"
                    placeholder="Add to the discussion"
                  ></textarea>
                </div>
              </section>
              <Button
                className={`${styles.button} font-roboto-cta-small text-color-lighten`}
                type="submit"
                variant="active"
              >
                Submit
              </Button>
            </form>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
