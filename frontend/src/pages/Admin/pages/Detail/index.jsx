import { Button, Layout } from 'components';
import { getMessage, setMessageRead, setMessageUnread } from 'providers/messages';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { dateHumanFormat } from 'utils/date';

const { Main } = Layout;

export default function Detail() {
  const { idMessage } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState({});

  const toggleRead = useCallback(() => {
    const provider = message.read ? setMessageUnread : setMessageRead;
    provider(idMessage).then(resp => {
      setMessage(resp.data);
    });
  }, [idMessage, message.read]);

  useEffect(() => {
    getMessage(idMessage)
      .then(resp => {
        setMessage(resp.data);
      })
      .catch(() => {
        alert('error on load message');
        history.push(`/admin`);
      });
  }, [history, idMessage]);

  if (!message.id) return null;

  return (
    <Main>
      <div style={{ width: '30%', marginRight: '5%' }}>
        <Link to="..">
          <span>Go back</span>
        </Link>
        <h1>Message: {message.subject}</h1>
        <span>{dateHumanFormat(message.datetime)}</span>
        <p>{message.detail}</p>
        <Button type="primary" onClick={() => toggleRead()}>
          mark as {message.read ? 'unread' : 'read'}
        </Button>
      </div>
    </Main>
  );
}
