import styles from './styles.module.css';

interface Props {
  phone: string;
  removePhone: () => void;
}

export function CardPhone({ phone, removePhone }: Props) {
  return (
    <div className={styles.container}>
      <span>{phone}</span>
      <button
        type="button"
        onClick={removePhone}
      >
        Excluir
      </button>
    </div>
  );
}