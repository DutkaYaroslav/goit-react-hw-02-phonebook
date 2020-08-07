import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactsList from "./components/ContactList/ContactList";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    // name: "",
    // number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getVisibleTasks() {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  addTask = (nameResult, numberResult) => {
    const { contacts } = this.state;
    const name = {
      id: uuidv4(),
      name: nameResult,
      number: numberResult,
    };

    if (
      contacts.find((contact) =>
        contact.name.toLowerCase().includes(nameResult.toLowerCase())
      )
    ) {
      alert("this user name already in your numberlist");
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, name],
        };
      });
    }
  };

  removeTask = (taskId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => contact.id !== taskId),
      };
    });
  };

  render() {
    // const { contacts } = this.state;
    const visibleTasks = this.getVisibleTasks();

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onAddTask={this.addTask} />

        <h2>Contacts</h2>
        <ContactsList
          onChange={this.handleChange}
          onVisible={visibleTasks}
          onRemove={this.removeTask}
        />
      </div>
    );
  }
}