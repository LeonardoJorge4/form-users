import styles from './styles.module.css';
import { User } from '../../App';

interface Props {
  user: User;
}

export function CardUser({ user }: Props) {
  return (
    <div className={styles.wrapper}>
      <span>
        <b>Nome:</b> {user.name}
      </span>
      <span>
        <b>Email:</b> {user.email}
      </span>
      <span>
        <b>Gênero:</b> {user.genre === "male" ? "Masculino" : "Feminino"}
      </span>

      <div className={styles.wrapperAddresses}>
        <span>
          <b>Endereços</b>
        </span>

        {
          user.addresses.map(address => (
            <span>
              {address.street}, {address.number}
            </span>
          ))
        }
      </div>

      <div className={styles.wrapperPhones}>
        <span>
          <b>Telefones</b>
        </span>

        {
          user.phones.map(phone => (
            <span>
              {phone}
            </span>
          ))
        }
      </div>
    </div>
  );
}