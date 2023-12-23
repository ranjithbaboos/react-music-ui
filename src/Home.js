import React,{Component} from 'react';

export class Home extends Component{
    constructor ( props)
    {
        super(props);
        this.state={songs:[]};
    }

    componentDidMount (){

      //fetch ( 'https://jsonplaceholder.typicode.com/posts').then(resp=>resp.json())
      fetch ( 'http://localhost:40135/api/SongAPI/GetSongs').then(resp=>resp.json())
       
       //fetch ( '/api/SongAPI/GetSongs').then(resp=>resp.json())        
        .then(resp=>this.setState({songs:resp}))
        .catch ( error=> {console.log (error)});
    }
    render(){
        return(
            <div>
                <h3>This is Home page</h3>
                {this.state.songs.map (song => <div key ={song.id}>{song.id}.{song.name}
                    </div>)}
            </div>
        )
    }
}