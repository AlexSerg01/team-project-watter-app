import css from './Container.module.css'

export const Container = ({ children, className }) => {
  return <div className={`${css.container} ${className ?? ''}`}>{children}</div>
}
