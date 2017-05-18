import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      txt : 'this is the state text',
      cat : 0,
      currentEvent : '---',
      a : '',
      b : ''
    }
    this.updateEvent = this.updateEvent.bind(this)
  }
  update(e) {
    this.setState({txt : e.target.value});
  }
  updateEvent(e) {
    this.setState({currentEvent:e.type});
  }
  updateWithRef() {
    this.setState({
      a : this.a.refs.input.value,
      b : this.refs.b.value
    });
  }
  render() {
    let txt = this.state.txt
    let cat = this.state.cat
    return (
        <div>
          <Title text={txt}/>
          <b>Bold, {cat}</b><br/>
          <Widget update={this.update.bind(this)} /><br/><br/>
          <Button>I <Heart/> React</Button><br/><br/>
          <textarea 
            onKeyPress={this.updateEvent}
            onCopy={this.updateEvent}
            onCut={this.updateEvent}
            onPaste={this.updateEvent}
            onFocus={this.updateEvent}
            onBlur={this.updateEvent}
            onDoubleClick={this.updateEvent}
            onTouchStart={this.updateEvent}
            onTouchEnd={this.updateEvent}
            onTouchMove={this.updateEvent}
            cols="30" rows="10"></textarea><br/><br/>
          <h1>{this.state.currentEvent}</h1><br/><br/>
          <hr/>
          <Input
            ref={component => this.a = component}
            type="text"
            update={this.updateWithRef.bind(this)}
          /> {this.state.a}
          <hr/>
          <input
            ref="b"
            type="text"
            onChange={this.updateWithRef.bind(this)}
          /> {this.state.b}
        </div>
      )
  }
}

App.propTypes = {
  txt : PropTypes.string,
  cat : PropTypes.number.isRequired
}

App.defaultProps = {
  txt : "this is the default text"
}

const Widget = (props) => 
  <input type="text" onChange={props.update}/>

const Button = (props) => <button>{props.children}</button>

class Heart extends Component {
  render() {
    return <span>&hearts;</span>
  }
}

const Title = (props) => <h1>Title : {props.text}</h1>

Title.propTypes = {
  text(props, propName, component) {
    if (!(propName in props)) {
      return new Error(`missing ${propName}`)
    }
    if (props[propName].length < 6) {
      return new Error(`${propName} is too short`)
    }
  }
}

class Input extends Component {
  render() {
    return <div><input ref="input" type="text" onChange={this.props.update}/></div>
  }
}

// const App = () => <h1>Hello stateless</h1>

export default App