'use strict';

function randStart(size,rand){ //Function which set random starting state
var matrix = new Array(size).fill(0).map(() => new Array(size).fill(0)); 
return matrix.map(x => x.map(() => { return Math.random() < rand ? 1 : 0}))   
}

function stateUpdate(mat){ //**TODO pseudo infinite field */
    const currentState = mat.map(x => { return x.slice() });
    var nextState = mat.map(x => { return x.slice() });
    for(let i = 0 ; i < currentState.length ; i++){
        for(let j = 0 ; j < currentState[i].length ; j++){
            if(i == 0 & j == 0){ //top left corner
                let summ1 = currentState[i+1][j] + currentState[i][j+1] + currentState[i+1][j+1];
                (summ1 == 3 & currentState[i][j] == 0) ? nextState[i][j] = 1 : 0;
                ((summ1 > 3 | summ1 < 2) & currentState[i][j] == 1) ? nextState[i][j] = 0 : 1;
                } 
            if(i == 0 & (j != 0 | j != (currentState[i].length - 1))){ //top border
                var summ = 0;
                for(let k = 0 ; k < 2 ; k++){
                    for(let k1 = -1 ; k1 < 2 ; k1 = k1 + (2 - k * 1)){
                        summ += currentState[i+k][j+k1];
                    }
                }
                (summ > 3 | summ < 2 ) ? nextState[i][j] = 0 : 1;
                (currentState[i][j] == 0 & summ == 3) ? nextState[i][j] = 1 : 0;
            }
            if(i == (currentState[i].length - 1) & (j != 0 | j != (currentState[i].length - 1))){ //bottom border
                var summ = 0;
                for(let k = 0 ; k < 2 ; k ++){
                    for(let k1 =- 1 ; k1 < 2 ; k1 = k1 + (2 - k * 1)){
                        summ += currentState[i-k][j+k1];
                    }
                }
                (summ > 3 | summ < 2) ? nextState[i][j] = 0 : 1;
                (currentState[i][j] == 0 & summ == 3) ? nextState[i][j] = 1 : 0;
            }
            if(j == 0 & (i != 0 & i != (currentState[i].length - 1))){ // left border
                var summ = 0;
                for(let k = 0 ; k < 2 ; k ++){
                    for(let k1 =- 1 ; k1 < 2 ; k1 = k1 + (2 - k * 1)){
                        summ += currentState[i+k1][j+k];
                    }
                }
                (summ > 3 | summ < 2) ? nextState[i][j] = 0 : 1;
                (currentState[i][j] == 0 & summ == 3) ? nextState[i][j] = 1 : 0;
            }
            if(j == (currentState[i].length - 1) & (i != 0 & i != (currentState[i].length - 1))){ // right border
                var summ = 0;
                for(let k = 0 ; k < 2 ; k ++){
                    for(let k1 =- 1 ; k1 < 2 ; k1 = k1 + (2 - k * 1)){
                        summ += currentState[i+k1][j-k];
                    }
                }
                (summ > 3 | summ < 2) ? nextState[i][j] = 0 : 1;
                (currentState[i][j] == 0 & summ == 3) ? nextState[i][j] = 1 : 0;
            }
            if(j == 0 & i == (currentState[i].length - 1)){ //top right coner
                let summ1 = currentState[i-1][j] + currentState[i][j+1] + currentState[i-1][j+1];
                (summ1 == 3 & currentState[i][j] == 0) ? nextState[i][j] = 1 : 0;
                ((summ1 > 3 | summ1 < 2) & currentState[i][j] == 1 ) ? nextState[i][j] = 0 : 1;
            }
            if(i == 0 & j == (currentState[i].length - 1)){ //bottom right coner
                var summ1 = currentState[i+1][j] + currentState[i][j-1] + currentState[i+1][j-1];
                (summ1 == 3 & currentState[i][j] == 0) ? nextState[i][j] = 1 : 0;
                ((summ1 > 3 | summ1 < 2) & currentState[i][j] == 1) ? nextState[i][j] = 0 : 1;
            }
            if(i == (currentState[i].length - 1) & j == (currentState[i].length - 1)){ //bottom left corner
                let summ1 = currentState[i-1][j] + currentState[i][j-1] + currentState[i-1][j-1];
                (summ1 == 3 & currentState[i][j] == 0) ? nextState[i][j] = 1 : 0;
                ((summ1 > 3 | summ1 < 2) & currentState[i][j] == 1) ? nextState[i][j] = 0 : 1;
            }  
            if((i != 0 & i != (currentState[i].length - 1)) & (j != 0 & j != (currentState[i].length - 1))){ //everything else
                var summ1 = 0;
                for(var k =- 1 ; k < 2 ; k ++){
                    for(var k1 =- 1 ; k1 < 2 ; k1 = k1 + (2 - (k ** 2) * 1)){
                        summ1 += currentState[i+k][j+k1];
                    }
                }
                (summ1 == 3 & currentState[i][j] == 0) ? nextState[i][j] = 1 : 0;
                ((summ1 > 3 | summ1 < 2) & currentState[i][j] == 1) ? nextState[i][j] = 0 : 1;
            }
        }
    }
    return nextState;
}


class Field extends React.Component{
    constructor(props){
        super(props);
        this.state={
            field: randStart(this.props.size,this.props.rand),
            history: [],
            cellsAlive: 0,
            active: false, 
            period: 0,
            rand: 0.1,
            gen:0
            
        }}
        historyWrite(){
            let tmp=this.state.field.slice().map(x=>x.join()).join();
            this.setState({cellsAlive: tmp.split(',').filter(x=>x!='0').join().length});
            if(this.state.history.length < 10){
                
                this.setState({history : [...this.state.history , tmp]});
            }
            if(this.state.history.length == 10){
                
                this.setState(prevState => ({history:[...prevState.history.filter((_,i) => i !== 0) , tmp]}));
            }
        }

        renderCell(props){
            if(props.value == 1){
                return <td className = 'cell' id = 'alive' key = {props.skey} ></td>
            }
            else{
                return <td className = 'cell' id = 'dead' key = {props.skey} ></td>
            }
            }
        randomize(){
            
            this.setState({gen: 0,history: [], field: randStart(this.props.size , this.state.rand)});
        }
        finish(){
            if(this.state.period != 0){
            return this.state.period == 1 ? <div id = 'finish'>There is stable configuration</div> : <div id = 'finish'>There is periodic configuration with period = {this.state.period}</div>
        }}
        nextGen(){
            this.setState({field : stateUpdate(this.state.field) , gen : this.state.gen + 1})
            this.isFinished();
            this.historyWrite();
        }
        stop(){
            this.setState({life : false});
            clearInterval(this.timerID);
        }
        life(){
            this.setState({life: true , period: 0});
            this.timerID = setInterval(
                () => this.nextGen(),
                1000
              );
            
        }
        lifeHandler(){
            if(this.state.life){
                return <button className = 'control' onClick = {this.stop.bind(this)} >Stop</button>
            }
            if(!this.state.life){
                return <button className = 'control' id = 'start' onClick = {this.life.bind(this)}>Start</button>
            }
        }
        isFinished(){
            let currentValue = this.state.field.slice().map(x=>x.join()).join(); 
            for(let i = 0 ; i < this.state.history.length ; i ++){
                let prevValue=this.state.history[i];
                if(currentValue == prevValue){
                    
                    this.setState({period: this.state.history.length - i});
                    
                }
            }
        }
        render() {
            var rows = [];
            let squares = [];
            var k = 0;
            for (var r = 0 ; r < this.state.field.length; r ++) {
                for (var i = 0 ; i < this.state.field[r].length ; i ++)  {
                    squares.push(<this.renderCell value = {this.state.field[r][i]} key = {k ++}/>);
                }
            rows.push(<tr key = {k ++} className="row">{squares}</tr>);
            squares = [];
            }
            return <div><table><tbody>{rows}</tbody></table>
            <div id = 'controlpanel'>
            <div>{ this.lifeHandler()}</div>
            <button className = 'control' onClick = {this.randomize.bind(this)} >Randomize</button>
            
            
            <input className = 'control' id = 'rand' type = 'number' min = '0' max = '100' name = 'randomness' defaultValue = '10' onChange={() => this.setState({rand: document.getElementById('rand').value / 100})} ></input>
            </div>
            <div id = 'info'>
            <div className = 'info'>Current generation: {this.state.gen}</div>
            <div className = 'info'>Cells alive: {this.state.cellsAlive}</div>
            <div className = 'info'>{this.finish()}</div>
            </div>
            </div>
            } 
    }


let domContainer = document.getElementById('1')
ReactDOM.render(<Field size = {50} />, domContainer);