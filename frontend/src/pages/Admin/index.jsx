import React, { useMemo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Container, Sider, Nav } from 'components/Layout';
import { Register, List } from './pages';
import Detail from './pages/Detail';

export default function Admin() {
  const { path } = useRouteMatch();

  const adminMenu = useMemo(
    () => [
      { to: path, name: 'List' },
      { to: `${path}/messages/new`, name: 'Register' },
    ],
    [path],
  );

  return (
    <Container>
      <Sider>
        <Nav items={adminMenu} />
      </Sider>
      <Switch>
        <Route exact path={path}>
          <List />
        </Route>
        <Route path={`${path}/messages/new`}>
          <Register />
        </Route>
        <Route path={`${path}/messages/:idMessage`}>
          <Detail />
        </Route>
      </Switch>
    </Container>
  );
}
