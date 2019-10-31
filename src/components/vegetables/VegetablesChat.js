import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class VegetableChat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      isOpen: false
    }
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleDeleteMessage(e) {
    e.preventDefault()
    axios.delete(`/api/appointments/${this.props.appointmentId}/comments/${this.props.messageId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((res) => {
        const messages = [...res.data.messages]
        this.setState({ messages })
      })
      .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  isOwner() {
    return Auth.getPayload().sub === this.props.userId
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    console.log('hiiiii')
    if (!this.state.isOpen) return (
      <button onClick={this.handleClick}>Open Chat</button>
    )
    return (
      <>
        <div className='messages'>
          {
            this.props.messages.map((msg, i) => (
              <p key={i}>{msg.text}</p>
            ))
          }
        </div>
        < form className='chatBox' onSubmit={(e) => {
          e.preventDefault()
          this.setState({ text: '' }, this.props.handleSubmitMessage(this.props.appointmentId, this.state.text))
        }}>
          <textarea
            rows='4'
            cols='5'
            type='textarea'
            placeholder="Message"
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button type='submit'>Add message</button>
          <button onClick={this.handleClick}>Hide Chat</button>
        </form>

      </>
    )
  }
}

export default VegetableChat

// {this.state.messages && this.state.messages.map(message => (
//           <div className='panelWrapper' key={message._id}>
//             <div>{message.text}</div>
//             {this.isOwner() && <button onClick={(e) => this.handleDeleteComment(e, message._id)}>delete</button>}
//           </div>
//         ))}
//         {this.isOwner() && 
//           <form className='panelWrapper' onSubmit={this.handleSubmitComment}>
//             <textarea
//               rows='4'
//               cols='5'
//               type='textarea'
//               placeholder="Comment"
//               name="text"
//               onChange={this.handleChange}
//               value={this.state.text}
//             />
//             <button type='submit'>Add comment</button>
//           </form>
//         }