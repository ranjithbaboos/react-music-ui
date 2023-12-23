import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Songs extends Component{
    constructor(props){
        super (props);

        this.state ={
            songs:[],
            modalTitle:"",
            Name:"",
            Id:0,
            Artist:"",
            Album :""
            
        }
    }
  
    refreshList(){
        fetch(variables.API_URL+'SongAPI/GetSongs')        
        .then(response=> {console.log(response.json);return response.json()})        
        .then(data=>{
            this.setState({songs:data,songsWithoutFilter:data});
        });
    }

/* Tried this approach and failed as this cant be done in a class component
https://kinsta.com/knowledgebase/react-hooks-must-be-called-in-a-react-function-component-or-a-custom-react-hook-function/
refreshList(){
    const [songs,setData] = useState([])
    useEffect(() => {
    fetch("http://localhost:44367/api/SongAPI/GetSongs")
    .then(response=>response.json())
    .then(json=>{
        setData(json)
    });
},[])
}
*/
    
    componentDidMount(){
        this.refreshList();
    }    
   
    addClick(){
        this.setState({
            modalTitle:"Add Song",
            Id:0,
            Name:"",
            Artist:"",
            Album:""
        });
    }
    editClick(song){
        this.setState({
            modalTitle:"Edit Song",
            Id:song.id,
            Name:song.name,
            Artist:song.artist,
            Album:song.album,
        });
    }

    createClick(){
        fetch(variables.API_URL+'SongAPI/Create',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.Name,
                artist: this.state.Artist,
                album: this.state.Album
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(this.state.Name +' has been added successfully' );
            document.getElementById("btnModalClose").click();
            this.refreshList();
        },(error)=>{ console.log(error);
            alert('Failed');
        })
    }

    updateClick(id){
        fetch(variables.API_URL+'SongAPI/UpdateSong/'+id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.Id,
                name:this.state.Name,
                artist: this.state.Artist,
                album: this.state.Album
            })
        })
        /*.then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
            console.log("Update Method :" + error)
        })
        */
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if (response.ok){
                alert('THe song  has been Updated successfully' );
                document.getElementById("btnModalClose").click();
                this.refreshList();
               console.log ("REsponse Object  received " )
            }

           
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        }
    

    deleteClick(id){
        if(window.confirm('Are you sure?')){
            console.log(id);
        /*fetch(variables.API_URL+'SongAPI/Delete/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())     
        
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            console.log("Delete Method res :" + res );
            alert('Failed');
            console.log("Delete Method :" + error)
        })
        */
        fetch(variables.API_URL+'SongAPI/Delete/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if (response.ok){
                console.log(response)
                alert('The song has been deleted successfully' );                
                this.refreshList();
               console.log ("REsponse Object  received " )
            }
           
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        }
    }
    render(){
        const {
            songs,
            modalTitle,
            Id,
            Name,
            Artist,
            Album
        }=this.state;

        return(
            <div>
                  <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                        Add Song
                    </button>
                    <table className="table table-striped">
    <thead>
    <tr>
        <th>       
            Id
        </th>
        <th>        
            Name      
        </th>
        <th>   
            Artist      
        </th>
        <th>        
            Album      
        </th>
        <th>
            Options
        </th>
    </tr>
        </thead>
        <tbody>
        {songs.map(song=>
            <tr key={song.id}>
                <td>{song.id}</td>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(song)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(song.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
        </table>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" id ="btnModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">Name</span>
        <input type="text" className="form-control"
        value={Name}
        onChange={this.changeName}/>
         <span className="input-group-text">Artist</span>
        <input type="text" className="form-control"
        value={Artist}
        onChange={this.changeArtist}/>
         <span className="input-group-text">Album</span>
        <input type="text" className="form-control"
        value={Album}
        onChange={this.changeAlbum}/>
       </div>

        {Id===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {Id!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick(Id)}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}

