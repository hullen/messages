import React from 'react';
import { Layout } from '../components';

const menuOptions = [
  { to: '/', name: 'Home' },
  { to: '/admin', name: 'Admin' },
];

export default function Header() {
  return (
    <Layout.Header>
      <Layout.Nav items={menuOptions} />
    </Layout.Header>
  );
}
