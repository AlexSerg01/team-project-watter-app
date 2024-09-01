import icons from '../../assets/images/background/Forfot_Update_Password/icons (1).svg'
import css from './Icon.module.css'

export const Icon = ({ id, ...props }) => (
  <svg className={css.icon} {...props}>
    <use href={`${icons}#${id}`}></use>
  </svg>
)
