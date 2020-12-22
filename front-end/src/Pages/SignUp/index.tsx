import React, { useCallback } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';

import { Container, Background,  AnimationContainer} from './styles';
import logoImg from '../../Assets/logo.svg';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { toast } from 'react-toastify';

import api from '../../Services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      toast.success("Cadastro realizado com sucesso!")

      history.push('/');


    } catch (err) {
      toast.error("Erro ao cadastrar, verifique se todas as informações estão corretas!")

    }
}, []);

  return (
    <Container>
      <Background />
        <AnimationContainer>
          <img src={logoImg} alt="gobarber"/>

          <Form onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot">Esqueci minha senha</Link>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Criar conta
          </Link>
        </AnimationContainer>
    </Container>
  );
};

export default SignUp;
