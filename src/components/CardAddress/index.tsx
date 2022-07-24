import styles from './styles.module.css';

interface Props {
  address: string;
  number: string;
  removeAddress: () => void;
}

export function CardAddress({ address, number, removeAddress }: Props) {
  return (
    <div className={styles.container}>
      <span>{address}, {number}</span>
      <button type="button" onClick={removeAddress}>
        Excluir
      </button>
    </div>
  );
}