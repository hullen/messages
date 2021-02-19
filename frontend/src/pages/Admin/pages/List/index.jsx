import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Layout, Table } from 'components';
import { fetchAllMessages, setMessageRead, setMessageUnread } from 'providers/messages';
import { dateHumanFormat } from 'utils/date';

const { Main } = Layout;

export default function List() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const goEdit = useCallback(
    id => {
      history.push(`/admin/messages/${id}`);
    },
    [history],
  );

  const toggleRead = useCallback((id, read) => {
    const provider = read ? setMessageUnread : setMessageRead;
    provider(id).then(resp => {
      setData(prev =>
        prev.map(p => {
          if (p.id === id) return resp.data;
          return p;
        }),
      );
    });
  }, []);

  const loadMessages = useCallback(() => {
    setLoading(true);
    fetchAllMessages()
      .then(resp => {
        const result = resp.data || [];
        setData(result);
      })
      // catch errors
      // eslint-disable-next-line no-console
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  if (loading)
    return (
      <Main>
        <div style={{ width: '80%' }}>
          <p>
            <strong>Loading...</strong>
          </p>
        </div>
      </Main>
    );

  return (
    <Main>
      <div style={{ width: '80%' }}>
        <p>
          <strong>Total:</strong> {data.length}
        </p>
        <Button onClick={() => loadMessages()}>Check for new messages</Button>
        <Table type="striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Subject</th>
              <th scope="col">Date/Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, subject, datetime, read }) => (
              <tr key={id} className={read ? 'row-line-through' : undefined}>
                <td>
                  <span>{id}</span>
                </td>
                <td>
                  <span>{subject}</span>
                </td>
                <td>
                  <span>{dateHumanFormat(datetime)}</span>
                </td>
                <td>
                  <Button onClick={() => toggleRead(id, read)} style={{ marginRight: 10 }}>
                    mark as {read ? 'unread' : 'read'}
                  </Button>
                  <Button type="primary" onClick={() => goEdit(id)}>
                    edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Main>
  );
}
