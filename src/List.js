import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Form from './Form';
import './App.css';



class List extends Component {
    state = { 
        list:this.returnList(),
        editingItem: null
     }

     returnList () {
         if(localStorage.getItem('data') == null)
         localStorage.setItem('data', JSON.stringify([]))
         return JSON.parse(localStorage.getItem('data'))
     }

     onAddOrEdit = (data) => {
        const tagsArr = Array.isArray(data.tags) ? data.tags : data.tags.split(',')

         if(this.state.editingItem !== null) {

             this.setState({
                 editingItem: null,
                 list: this.state.list.map((item) => {
                     if(item.id === data.id) {
                         return {
                             ...data,
                             tags: tagsArr
                         };
                     }
                     return item;
                 })
             }, () => localStorage.setItem('data', JSON.stringify(this.state.list)))
             return;
         }

         

         this.setState({
             ...this.state,
             list: [...this.state.list, { ...data, tags: tagsArr }]
         }, () => {
            localStorage.setItem('data', JSON.stringify(this.state.list))
         })
     }

     handleDelete = (id) => {
         this.setState({
             list: this.state.list.filter((item) => item.id !== id)
         }, () => {
            localStorage.setItem('data', JSON.stringify(this.state.list))
         })
     }


     handleDeleteAlert = () => {
         alert('You are not allowed to delete this item')

     }

     handleEditing = (item) => {
        this.setState({
            ...this.state,
            editingItem: {...item}
        })
     }

    render() {
        
        return ( 
            <div className="main-container">
                <Form editingItem={this.state.editingItem} onAddOrEdit={this.onAddOrEdit}/>
                <hr/>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.list.map((item)=> {
                                return <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.team}</TableCell>
                                    <TableCell>
                                        <ul>
                                            {item.tags.map((tag, i) => {
                                                return <li key={i}>{tag}</li>
                                            })}
                                        </ul>
                                    </TableCell>
                                    <TableCell>{item.author}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => this.handleEditing(item)}>Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            item.removable ? <Button variant="contained" color="secondary" onClick={() => this.handleDelete(item.id)}>Delete</Button> 
                                            : <Button variant="contained" color="secondary" onClick={this.handleDeleteAlert}>Delete</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
         );
    }
}
 
export default List;