import React from 'react';

export default function Header(
  {
    title, /* ← This props import the component Header informations */
  }
  ){
  return(
    <header>
      <h1>{ title }</h1>
    </header>
  );
}