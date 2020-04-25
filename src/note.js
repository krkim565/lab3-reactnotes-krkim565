/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */

import Draggable from 'react-draggable';
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.tnote.text,
      isEditing: false,

    };
  }

  edit = () => {
    this.setState({ isEditing: true });
  }

  updateText = (event) => {
    this.setState({ editText: event.target.value });
  }

  handleSubmit = () => {
    this.props.onEdit(this.state.editText, this.props.iid);
    this.setState({ isEditing: false });
  }

  handleDrag = (e, data) => {
    const Xpos = this.props.tnote.x + data.deltaX;
    const Ypos = this.props.tnote.y + data.deltaY;
    this.props.onPosition(Xpos, Ypos, this.props.iid);
  }

  renderSomeSection() {
    if (this.state.isEditing) {
      return (
        <div className="whole_note">
          <div className="options">
            <i className="far fa-save fa-lg" onClick={this.handleSubmit} />
            <i onClick={() => this.props.onDelete(this.props.iid)} className="fas fa-trash fa-lg" />
          </div>
          <div className="title">
            {this.props.tnote.title}
          </div>
          <form className="noteBody">
            <TextareaAutosize value={this.state.editText} onChange={this.updateText} />
          </form>
        </div>
      );
    } else {
      return (
        <div className="whole_note">
          <div className="options">
            <i onClick={this.edit} className="far fa-edit fa-lg" />
            <i onClick={() => this.props.onDelete(this.props.iid)} className="fas fa-trash fa-lg" />
          </div>
          <div className="title">
            {this.props.tnote.title}
          </div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.tnote.text || '') }} />
        </div>
      );
    }
  }


  render() {
    return (
      <Draggable
        handle=".draggable"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{
          x: this.props.tnote.x, y: this.props.tnote.y,
        }}
        onDrag={this.handleDrag}
      >

        <div className="draggable" style={{ position: 'relative', zIndex: this.props.tnote.zIndex }}>
          {this.renderSomeSection()}
        </div>

      </Draggable>

    );
  }
}


export default Note;
