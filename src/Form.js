import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: new Date().valueOf(),
      title:'',
      editing: false,
      team:'',
      tags:'',
      author:'',
      date:new Date().getDate()+ '/' + (new Date().getMonth() + 1) +'/'+ new Date().getFullYear(),
      removable: false,
      description:''
    }
  }


  handleInputChange = (e) => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
    })
  }

  handleSelectChange = (e) => {
      this.setState({
        ...this.state,
        team: e.target.value
      });
  }

  handleSubmit = e =>{
    e.preventDefault()
    this.setState({
        id: new Date().valueOf(),
        title:'',
        editing: false,
        team:'',
        tags:'',
        author:'',
        date:new Date().getDate()+ '/' + (new Date().getMonth() + 1) +'/'+ new Date().getFullYear(),
        removable: false,
        description:''
    });
    this.props.onAddOrEdit(this.state)
  }

  handleSelectCheckbox = (e) => {
      this.setState({
          ...this.state,
          removable: !this.state.removable
      })
  }
  componentDidUpdate = (prevProps) => {
    if(prevProps.editingItem !== this.props.editingItem 
      && this.props.editingItem !== null) {
        this.setState({
            ...this.props.editingItem,
            tags: this.props.editingItem.tags.toString()
        })
    }
    }

  render(){

    //Team Array
    const team = [
        { id: 1, name: 'Select Team' },
        { id: 2, name: 'CNN' },
        { id: 3, name: 'BBC' }
    ];

    const isEditing = this.props.editingItem !== null;

  return (
      <form onSubmit={this.handleSubmit} autoComplete='off'>

          {/* Title in Form */}
          <div className='form-rows'>
            <TextField type='text' variant="outlined" name='title' label="Title" value={this.state.title} placeholder='Title' onChange={this.handleInputChange} />
          </div>
          
          {/* Select Team in Form */}
          <div className='form-rows'>
            <TextField
                id="outlined-select-currency-native"
                select
                onChange={this.handleSelectChange} 
                value={this.state.team} 
                disabled={isEditing}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select team"
                variant="outlined"
                style={{ width: 196 }}
            >
                {team.map((item) => {
                    return <option key={item.id}>{item.name}</option>
                })}
            </TextField>
          </div>

        {/* Tags in Form */}
        <div className='form-rows'>
            <TextField type='text' variant="outlined" label='Tags' name='tags' value={this.state.tags} placeholder='Ex: Sport,News,Politics' onChange={this.handleInputChange}></TextField>
        </div>

        {/* Author in Form */}
        <div className='form-rows'>
            <TextField type='text' variant="outlined" label="Author" name='author' value={this.state.author} placeholder='Author' disabled={isEditing} onChange={this.handleInputChange}></TextField>
        </div>
        
        {/* Publication Date in Form */}
        <div className='form-rows'>
            <p> Publication Date: {this.state.date}</p>     
        </div>

        {/* Description in Form */}
        <div className='form-rows'>
            <TextField multiline type='text' variant="outlined" label="Description" name='description' value={this.state.description} placeholder='Description' onChange={this.handleInputChange}></TextField>
        </div>

        {/* Checkbox in Form */}
        <div className='form-rows'>
            <input 
                type='checkbox'
                checked={this.state.removable} 
                onChange={this.handleSelectCheckbox} 
            />
            <label>Removable</label>
        </div>

        {/* Submit Button in Form */}
        <div className='form-rows'>
            <Button variant='contained' color="primary" disableElevation type='submit'>Submit</Button>
        </div>
      </form>
  );
}
}

export default App;
