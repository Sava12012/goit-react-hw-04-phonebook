import React from 'react';
import Filter from './ContactFilter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Title, Subtitle, Container } from './App.style';

const KEY = 'contacts';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsNumber = localStorage.getItem(KEY);

    if (contactsNumber) {
      this.setState({ contacts: JSON.parse(contactsNumber) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(KEY, JSON.stringify(this.state.contacts));
  }

  handlerSubmit = data => {
    this.setState(({ contacts }) =>
      contacts.find(contact => contact.name === data.name)
        ? alert(`${data.name} is already in contacts`)
        : { contacts: [data, ...contacts] }
    );
  };

  onFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.handlerSubmit} />

        <Subtitle>Contacts</Subtitle>
        <Filter value={filter} onFilter={this.onFilter} />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={filteredContacts}
        />
      </Container>
    );
  }
}
