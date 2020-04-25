import React, { Component } from 'react';


class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
    };
  }

  addNote = () => {
    const xPos = 50;
    const yPos = 50;
    this.props.onAddNoteChange(this.state.newTitle, xPos, yPos);
  }

  updateTitle(event) {
    this.setState({ newTitle: event.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <input id="compose" placeholder="Enter new note title here" onChange={(event) => this.updateTitle(event)} />
          <input id="input_button" type="button" value="Add Note" onClick={this.addNote} />
        </form>
      </div>
    );
  }
}

export default AddNote;
