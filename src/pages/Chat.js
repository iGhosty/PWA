import React, { Component } from "react";
import Header from "../components/Header";
import { interval } from 'rxjs';
import { sample } from 'rxjs/operators';
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

//emit value every 1s
const source = interval(1000);
const example = source.pipe(sample(interval(1000)));

function waitForElementToDisplay(selector, time) {
  if(document.querySelector("#wait")!=null) {
    console.log("asd");
      const subscribe = example.subscribe(val =>  {
        //console.log(val);
        document.getElementById("wait").innerHTML = " " + val;
      });
      return;
  }
  else {
      setTimeout(function() {
          waitForElementToDisplay("#wait", time);
      }, time);
  }
}


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;

    if(document.querySelector("#wait")!=null) {
      waitForElementToDisplay("#wait",5000);
    }
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }


  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    var perc = d.getMinutes();
    if(perc < 10){
      perc = '0' + perc;
    }
   // console.log(perc);
    const time = `${d.getFullYear()}/${(d.getMonth()+1)}/${d.getDate()} ${d.getHours()}:${perc}`;
    return time;
  }



  render() {
    
    return (
      
      <div>
        <Header />

        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Töltés...</span>
          </div> : ""}
          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea id="textarea" autoFocus = "autofocus" placeholder="Üzenet írása..." className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <button type="submit" className="btn btn-submit px-5 mt-4">Küldés</button>
        </form>
        <div className="py-5 mx-3">
          Belépve mint: <strong>{this.state.user.email}</strong>  
          <strong id="wait" className="text-info"> 0 </strong> másodperce
        </div>
        <p className="text-info">
        
        </p>
      </div>
    );
  }
}
