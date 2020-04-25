/* eslint-disable new-cap */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import * as db from './services/datastore';
import AddNote from './add_note';
import Note from './note';
import './style.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Map(),
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  newNote = (newTitle, xPos, yPos) => {
    const object = {
      title: newTitle,
      text: ' ',
      x: xPos,
      y: yPos,
    };

    db.createNote(object);
  }


  deleteNote = (idr) => {
    db.deleteNote(idr);
  }

  editNote = (editedText, id) => {
    const fields = { text: editedText };

    db.updateNote(fields, id);
  }

  updatePos = (xPos, yPos, id) => {
    const fields = { x: xPos, y: yPos };

    db.updateNote(fields, id);
  }


  render() {
    return (
      <div className="start">
        <div id="add_note">
          <AddNote onAddNoteChange={this.newNote} />
        </div>
        <div>
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note className="note"
                key={id}
                tnote={note}
                iid={id}
                onDelete={this.deleteNote}
                onEdit={this.editNote}
                onPosition={this.updatePos}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
