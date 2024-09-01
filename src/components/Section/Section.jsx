import css from './Section.module.css'

export const Section = ({ children, className }) => {
  return (
    <section className={`${css.section} ${className ?? ''}`}>
      {children}
    </section>
  )
}
