import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Form, Layout } from 'components';
import { addMessage } from 'providers/messages';

const { Main } = Layout;

export default function Register() {
  const history = useHistory();
  const [loading, setLoading] = useState();

  const { errors, register, handleSubmit } = useForm({
    mode: 'onChange',
    nativeValidation: true,
  });

  const onSubmit = useCallback(
    data => {
      setLoading(true);
      addMessage(data)
        .then(() => {
          history.push(`/admin`);
        })
        .catch(e => {
          setLoading(false);
          console.log('e', e);
        });
    },
    [history],
  );

  return (
    <>
      <Main>
        <div style={{ width: '30%', marginRight: '5%' }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>New message</h1>
            <label htmlFor="subject">
              Subject
              <br />
              <input
                id="subject"
                name="subject"
                type="text"
                className={errors.subject && 'error'}
                ref={register({ required: true })}
              />
              {errors.subject && <span className="error">This is required</span>}
            </label>

            <label htmlFor="detail">
              Detail
              <br />
              <input
                id="detail"
                name="detail"
                type="text"
                className={errors.detail && 'error'}
                ref={register({ required: true })}
              />
              {errors.detail && <span className="error">This is required</span>}
            </label>

            <Button type="primary" htmlType="submit" isLoading={loading}>
              Register
            </Button>
          </Form>
        </div>
      </Main>
    </>
  );
}
