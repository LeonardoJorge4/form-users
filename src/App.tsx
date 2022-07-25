import { useState } from 'react';

import { Input } from './components/Input';
import { Button } from './components/Button';
import { CardUser } from './components/CardUser';
import { CardPhone } from './components/CardPhone';
import { CardAddress } from './components/CardAddress';

import './global.css';
import styles from './App.module.css';

export interface User {
  id: string;
  name: string;
  email: string;
  genre: string;
  addresses: Address[];
  phones: string[];
}

interface Address {
  id: string;
  street: string;
  number: string;
}

function App() {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [inputAddress, setInputAddress] = useState("");
  const [inputNumber, setInputNumber] = useState("");

  const [phones, setPhones] = useState<string[]>([]);
  const [inputPhone, setInputPhone] = useState("");

  function handleRegisterAddress() {
    const data = {
      id: String(new Date().getTime()),
      street: inputAddress,
      number: inputNumber
    };

    let addressRegistered = false

    addresses.find((address) => {
      if (
        address.street === inputAddress
        &&
        address.number === inputNumber
      ) {
        addressRegistered = true;
      }
    })

    if (addressRegistered) {
      alert("Endereço já adicionado!");
    } else {
      setAddresses(prevAddress => [data, ...prevAddress]);
      setInputAddress("");
      setInputNumber("");
    }

  }

  function handleRemoveAddress(id: string) {
    setAddresses(prevAddress => prevAddress.filter(address => {
      return address.id !== id
    }));
  }

  function handleRegisterPhone() {
    if (phones.includes(inputPhone)) {
      alert("Telefone já cadastrado!");
    } else {
      if (inputPhone !== "") {
        setPhones(prevPhones => [...prevPhones, inputPhone]);
        setInputPhone("");
      } else {
        alert("Informe um telefone!")
      }
    }
  }

  function handleRemovePhone(phoneNumber: string) {
    setPhones(prevPhones => prevPhones.filter(phone => {
      return phone !== phoneNumber
    }));
  }

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if(genre === "") {
      alert("Para cadastrar um usuário, informe um gênero!");
      return;
    }

    if(addresses.length <= 0) {
      alert("Para cadastrar um usuário, adicione um endereço!");
      return;
    }

    if(phones.length <= 0) {
      alert("Para cadastrar um usuário, adicione um telefone!");
      return;
    }

    let isEmailRegistered = false;

    registeredUsers.find(user => {
      if(user.email === email) {
        isEmailRegistered = true;
      }
    })

    if(isEmailRegistered) {
      alert("Este email já está cadastrado!");
      return;
    }

    const user = {
      id: String(new Date().getTime()),
      name,
      email,
      genre,
      addresses,
      phones
    }

    setRegisteredUsers(prevUsers => [...prevUsers, user]);

    setName("");
    setEmail("");
    setGenre("");
    setInputAddress("");
    setInputPhone("");
    setInputNumber("");
    setAddresses([]);
    setPhones([]);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Formulário de clientes</h1>

      <form onSubmit={(event) => handleSubmitForm(event)}>
        <Input
          required
          type="text"
          value={name}
          label="Nome"
          placeholder="Digite seu nome"
          onChange={event => setName(event.target.value)}
        />

        <Input
          required
          type="email"
          value={email}
          label="Email"
          placeholder="Digite seu email"
          onChange={event => setEmail(event.target.value)}
        />

        <div className={styles.wrapperRadios}>
          <input
            required
            type="radio"
            value="male"
            checked={genre === "male"}
            onClick={() => setGenre("male")}
          />
          <label htmlFor="radio">
            Masculino
          </label>

          <input
            required
            type="radio"
            value="female"
            checked={genre === "female"}
            onClick={() => setGenre("female")}
          />
          <label htmlFor="radio">
            Feminino
          </label>
        </div>

        <div className={styles.wrapperAddress}>
          <Input
            type="text"
            label="Rua"
            value={inputAddress}
            placeholder="Digite o nome da rua"
            onChange={event => setInputAddress(event.target.value)}
          />
          <Input
            type="number"
            label="Número"
            value={inputNumber}
            placeholder="Digite o número da residência"
            onChange={event => setInputNumber(event.target.value)}
          />
          <Button
            type="button"
            title="Adicionar endereço"
            onClick={handleRegisterAddress}
          />
        </div>

        {
          addresses.length > 0 &&
          <div className={styles.wrapperAllAddresses}>
            <h3>Endereços</h3>

            {
              addresses.map((address) => (
                <CardAddress
                  key={address.id}
                  address={address.street}
                  number={address.number}
                  removeAddress={() => handleRemoveAddress(address.id)}
                />
              ))
            }
          </div>
        }

        <div className={styles.wrapperAddPhone}>
          <Input
            type="number"
            label="Telefone"
            value={inputPhone}
            placeholder="Digite o telefone"
            onChange={event => setInputPhone(event.target.value)}
          />

          <Button
            type="button"
            title="Adicionar telefone"
            onClick={handleRegisterPhone}
          />
        </div>

        {
          phones.length > 0 &&
          <div>
            <h3>Telefones</h3>

            {
              phones.map((phone, index) => (
                <CardPhone
                  key={index.toString()}
                  phone={phone}
                  removePhone={() => handleRemovePhone(phone)}
                />
              ))
            }
          </div>
        }

        <div className={styles.wrapperButtonSubmit}>
          <Button
            type="submit"
            title="Cadastrar"
          />
        </div>
      </form>
      
      {
        registeredUsers.length > 0 &&
        <div className={styles.wrapperUsers}>
          <h1>Usuários cadastrados</h1>
          
          {
            registeredUsers.map(user => (
              <CardUser
                key={user.id}
                user={user}
              />
            ))
          }
        </div>
      }
    </div>
  );
}

export default App;
